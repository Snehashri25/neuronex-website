import express, { type Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config();
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import * as storage from "./storage"; // Adjusted to import all exports from the storage module

if (!process.env.OPENAI_API_KEY) {
  throw new Error(
    "The OPENAI_API_KEY environment variable is missing or empty."
  );
}

// Initialize OpenAI client
import OpenAI from "openai";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

// Authentication middleware
function authenticate(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  // Example token validation logic (replace with actual implementation)
  if (token !== "valid-token") {
    return res.status(401).json({ message: "Invalid token" });
  }

  next();
}

// Example /api/user route
app.get("/api/user", authenticate, (req, res) => {
  try {
    // Example user data (replace with actual implementation)
    const user = { id: 1, name: "John Doe" };
    res.status(200).json(user);
  } catch (error: any) {
    console.error("Error in /api/user:", {
      message: error.message,
      stack: error.stack,
      details: error,
    });

    res.status(500).json({
      message: "Internal Server Error",
      error: error.message || "An unexpected error occurred",
    });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Log incoming request data for debugging
    console.log("Login request received:", { username });

    // Validate input
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required." });
    }

    // Example login logic (replace with actual implementation)
    const isAuthenticated = username === "admin" && password === "password"; // Mock authentication
    if (!isAuthenticated) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // Respond with success
    res.status(200).json({ message: "Login successful." });
  } catch (error: any) {
    console.error("Login error:", {
      message: error.message,
      stack: error.stack,
      details: error, // Log the full error object for debugging
    });

    // Return a more descriptive error response
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message || "An unexpected error occurred",
    });
  }
});

app.post("/api/register", async (req, res) => {
  console.log("Request body:", req.body); // Log request data
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }
    const user = await storage.createUser({ username, password }); // Corrected method name
    res.status(201).json(user);
  } catch (error) {
    console.error("Error during registration:", (error as any).message); // Cast error to any
    res.status(500).json({
      message: "Internal Server Error",
      error: (error as any).message,
    });
  }
});

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    console.error("Unhandled error:", err);
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // Example usage (adjust based on actual `storage` API)
  try {
    await storage.someMethod(); // Replace `someMethod` with the actual method name
  } catch (error) {
    console.error("Error during storage operation:", error);
  }

  // ALWAYS serve the app on port 5000
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = 5000;
  server.listen(
    {
      port, // Removed the `host` property
    },
    () => {
      log(`serving on port ${port}`);
    }
  );
})();
