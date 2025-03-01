const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models");
const routes = require("./routes/index");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl requests)
      if (!origin) return callback(null, true);

      // Allow localhost for development
      if (origin.includes("localhost")) return callback(null, true);

      // Allow any Vercel deployment
      if (origin.includes("vercel.app")) return callback(null, true);

      // Allow your specific client URL if set
      if (process.env.CLIENT_URL && origin === process.env.CLIENT_URL) {
        return callback(null, true);
      }

      // Otherwise, deny the request
      callback(new Error("Not allowed by CORS"));
    },
    
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// Logging middleware - only in development
if (process.env.NODE_ENV !== "production") {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`, {
      body: req.body,
      headers: req.headers["content-type"],
    });
    next();
  });
}

// Routes
app.use("/api", routes);

// Serve static files in production
if (process.env.NODE_ENV === "production") {
  // Security headers
  app.use((req, res, next) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "DENY");
    res.setHeader("X-XSS-Protection", "1; mode=block");
    next();
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err);

  // Handle JSON parsing errors
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({
      error: "Invalid JSON format",
      details: err.message,
    });
  }

  // Handle authentication errors
  if (err.name === "UnauthorizedError") {
    return res.status(401).json({
      error: "Authentication failed",
      details: err.message,
    });
  }

  // Handle other errors
  res.status(err.status || 500).json({
    error: err.message || "Internal server error",
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});

// Database connection and server start
const startServer = async () => {
  try {
    // Add retry logic for database connection
    let retries = 5;
    while (retries) {
      try {
        await sequelize.authenticate();
        console.log("Database connection established.");
        break;
      } catch (err) {
        console.log(
          `Database connection attempt failed. Retries left: ${retries}`
        );
        retries -= 1;
        // Wait for 5 seconds before retrying
        await new Promise((resolve) => setTimeout(resolve, 5000));
      }
    }

    if (retries === 0) {
      console.error("Could not connect to database after multiple attempts");
      process.exit(1);
    }

    await sequelize.sync();
    console.log("Database synced.");

    app.listen(PORT, () => {
      console.log(
        `Server running on port ${PORT} in ${
          process.env.NODE_ENV || "development"
        } mode`
      );
    });
  } catch (error) {
    console.error("Unable to start server:", error);
    process.exit(1);
  }
};

// Handle graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM received, shutting down gracefully");
  // Close database connection and server
  sequelize.close().then(() => {
    console.log("Database connection closed");
    process.exit(0);
  });
});

startServer();
