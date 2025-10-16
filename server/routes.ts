import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { insertUserSchema, type User } from "@shared/schema";
import { storage } from "./storage";

const loginSchema = insertUserSchema.pick({
  username: true,
  password: true,
});

function respondWithUser(res: Response, user: User, status = 200) {
  res.status(status).json({
    user: {
      id: user.id,
      username: user.username,
    },
  });
}

async function handleRegister(req: Request, res: Response, next: NextFunction) {
  try {
    const parseResult = insertUserSchema.safeParse(req.body);

    if (!parseResult.success) {
      res.status(400).json({ message: "Invalid payload" });
      return;
    }

    const { username, password } = parseResult.data;
    const existing = await storage.getUserByUsername(username);

    if (existing) {
      res.status(409).json({ message: "Username already exists" });
      return;
    }

    const user = await storage.createUser({ username, password });
    req.session.userId = user.id;
    respondWithUser(res, user, 201);
  } catch (error) {
    next(error);
  }
}

async function handleLogin(req: Request, res: Response, next: NextFunction) {
  try {
    const parseResult = loginSchema.safeParse(req.body);

    if (!parseResult.success) {
      res.status(400).json({ message: "Invalid payload" });
      return;
    }

    const { username, password } = parseResult.data;
    const user = await storage.getUserByUsername(username);

    if (!user || user.password !== password) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    req.session.userId = user.id;
    respondWithUser(res, user);
  } catch (error) {
    next(error);
  }
}

async function handleMe(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.session.userId) {
      res.status(401).json({ message: "Not authenticated" });
      return;
    }

    const user = await storage.getUser(req.session.userId);

    if (!user) {
      req.session.userId = undefined;
      res.status(401).json({ message: "Not authenticated" });
      return;
    }

    respondWithUser(res, user);
  } catch (error) {
    next(error);
  }
}

function handleLogout(req: Request, res: Response, next: NextFunction) {
  req.session.userId = undefined;

  req.session.destroy((err) => {
    if (err) {
      next(err);
      return;
    }

    res.clearCookie("connect.sid");
    res.status(204).end();
  });
}

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/auth/register", handleRegister);
  app.post("/api/auth/login", handleLogin);
  app.get("/api/auth/me", handleMe);
  app.post("/api/auth/logout", handleLogout);

  const httpServer = createServer(app);

  return httpServer;
}
