import express from "express";
import cors from "cors";
import { AppError } from "./utils/customAppError/customError.js";
import { corsOptions } from "./config/corsOptions.js";
import { connectDB } from "./config/DB.js";
import globalError from "./error_middleware/error.js";
import main_router from "./all-router/main-router.js";

const app = express();
app.use(cors(corsOptions));
//transformation middleware
app.use(
  express.json({
    limit: "10kb",
    strict: true,
    inflate: true,
    type: ["application/json", "text/plain"],
    verify: (req, res, buf, encoding) => {},
  }),
);
const PORT = process.env.PORT || 5000;

//all router
app.use("/", main_router);
app.get("/api/status", (req, res) => {
  const currentMode = process.env.NODE_ENV || "development";
  res.status(200).json({
    statue: "success",
    message: "Server runing ok",
    mode: currentMode,
    timeStamp: new Date(),
  });
});
//404 route
app.all("*any", (req, res, next) => {
  throw new AppError(`Not found route ${req.originalUrl}`, 404);
});
//global errorHandler
app.use(globalError);
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(
        `🚀  Database ready & Server runing: http://localhost:${PORT}`,
      );
    });
  } catch (error) {
    console.error(
      "❌ Database connection fail & Server can't runing:",
      error.message,
    );
    process.exit(1);
  }
};
//server start
startServer();
