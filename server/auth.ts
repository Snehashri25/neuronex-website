import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Express } from "express";
import session from "express-session";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";
import { storage } from "./storage";
import { User as SelectUser } from "@shared/schema";
import MemoryStore from "memorystore"; // Example session store

const sessionStore = new MemoryStore({ checkPeriod: 86400000 }); // 24 hours

declare global {
  namespace Express {
    interface User extends SelectUser {}
  }
}

const scryptAsync = promisify(scrypt);

async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

async function comparePasswords(supplied: string, stored: string) {
  const [hashed, salt] = stored.split(".");
  const hashedBuf = Buffer.from(hashed, "hex");
  const suppliedBuf = (await scryptAsync(supplied, salt, 64)) as Buffer;
  return timingSafeEqual(hashedBuf, suppliedBuf);
}

export function setupAuth(app: Express) {
  const sessionSecret = process.env.SESSION_SECRET || "neuronex-session-secret";

  const sessionSettings: session.SessionOptions = {
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    store: sessionStore, // Corrected session store
    cookie: {
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    },
  };

  app.set("trust proxy", 1);
  app.use(session(sessionSettings));
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await storage.getUserByUsername(username);
        if (!user || !(await comparePasswords(password, user.password))) {
          return done(null, false, { message: "Invalid username or password" });
        }
        return done(null, user);
      } catch (error) {
        console.error("Error in authentication:", error);
        return done(error);
      }
    })
  );

  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(
    async (id: number, done: (err: any, user?: SelectUser | false) => void) => {
      try {
        const user = await storage.getUserById(id); // Corrected method name
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  );

  app.post("/api/register", async (req, res, next) => {
    try {
      console.log("Register request received:", req.body); // Log request data

      const { username, password } = req.body;
      if (!username || !password) {
        return res
          .status(400)
          .json({ message: "Username and password are required" });
      }

      const existingUser = await storage.getUserByUsername(username);
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }

      const hashedPassword = await hashPassword(password);
      const user = await storage.createUser({
        username,
        password: hashedPassword,
      }); // Corrected method name

      req.login(user, (err: any) => {
        if (err) {
          console.error("Error during login after registration:", err);
          return next(err);
        }

        const { password, ...userWithoutPassword } = user; // Exclude password
        res.status(201).json(userWithoutPassword);
      });
    } catch (error) {
      console.error("Error during registration:", (error as any).message); // Cast error to any
      res.status(500).json({
        message: "Internal Server Error",
        error: (error as any).message,
      });
    }
  });

  app.post("/api/login", (req, res, next) => {
    passport.authenticate(
      "local",
      async (err: any, user: SelectUser | false, info: any) => {
        if (err) return next(err);
        if (!user)
          return res
            .status(401)
            .json({ message: info?.message || "Authentication failed" });

        req.login(user, (err: any) => {
          if (err) return next(err);

          // Don't expose the password in the response
          const { password, ...userWithoutPassword } = user;
          res.status(200).json(userWithoutPassword);
        });
      }
    )(req, res, next);
  });

  app.post("/api/logout", (req, res, next) => {
    req.logout((err) => {
      if (err) return next(err);
      res.status(200).json({ message: "Logged out successfully" });
    });
  });

  app.get("/api/user", (req, res) => {
    if (!req.isAuthenticated())
      return res.status(401).json({ message: "Unauthorized" });

    // Don't expose the password in the response
    const { password, ...userWithoutPassword } = req.user!;
    res.json(userWithoutPassword);
  });
}
