import express from 'express';
import session from 'express-session';
import passport from 'passport';
import MemoryStore from 'memorystore';

const app = express();

app.use(session({
    secret: process.env.SESSION_SECRET || 'default_secret',
    resave: false,
    saveUninitialized: false,
    store: new MemoryStore(), // Ensure session store is configured
}));
app.use(passport.initialize());
app.use(passport.session());

export default app;