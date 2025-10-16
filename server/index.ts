import express, { type Request, Response, NextFunction } from "express";
import session from "express-session";
import type { ListenOptions } from "net";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const DEFAULT_PORT = 5000;

function readPortFromCli(): number | undefined {
  const args = process.argv.slice(2);

  for (let index = 0; index < args.length; index++) {
    const token = args[index];

    if (token === "--") {
      // npm forwards "--" to scripts; skip it.
      continue;
    }

    if (token === "-p" || token === "--port") {
      const next = args[index + 1];
      if (next) {
        const parsed = Number.parseInt(next, 10);
        if (!Number.isNaN(parsed) && parsed > 0) {
          return parsed;
        }
      }
    }

    const match = token.match(/^--port=(\d+)$/);
    if (match) {
      const parsed = Number.parseInt(match[1] ?? "", 10);
      if (!Number.isNaN(parsed) && parsed > 0) {
        return parsed;
      }
    }

    if (!token.startsWith("-")) {
      const parsed = Number.parseInt(token, 10);
      if (!Number.isNaN(parsed) && parsed > 0) {
        return parsed;
      }
    }
  }

  return undefined;
}

function readPortFromEnv(): number | undefined {
  const candidate = process.env.PORT ? Number.parseInt(process.env.PORT, 10) : NaN;
  return !Number.isNaN(candidate) && candidate > 0 ? candidate : undefined;
}

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: process.env.SESSION_SECRET ?? "socioteam-dev-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  }),
);

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

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Default to 5000 if not specified.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = readPortFromCli() ?? readPortFromEnv() ?? DEFAULT_PORT;
  const listenOptions: ListenOptions & { reusePort?: boolean } = {
    port,
    host: "0.0.0.0",
  };

  if (process.platform !== "win32") {
    listenOptions.reusePort = true;
  }

  server.listen(listenOptions, () => {
    log(`serving on port ${port}`);
  });
})();
