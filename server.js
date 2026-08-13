import express, { urlencoded } from "express";
import cors from "cors";
import session from "express-session";
import { AppError } from "./utils/customAppError/customError.js";
import { corsOptions } from "./config/corsOptions.js";
import { connectDB } from "./config/DB.js";
import globalError from "./error_middleware/error.js";
import main_router from "./all-router/main-router.js";
import mongoDBconnect from "connect-mongo";

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
app.use(express.urlencoded({extended: true}));

app.use(session({
  secret: process.env.SESSION_SECRET || "my_super_safe_development_secret_key_123",
  resave: true,
  saveUninitialized: true,
  store: mongoDBconnect.create({
    mongoUrl: process.env.DBURI || "mongodb://localhost:27017/db_1",
    collectionName: "user_sessions",
    ttl: 60, //30 * 24 * 60 * 60,
    autoRemove: 'native' // এটি দিলে মঙ্গোডিবি নিজ দায়িত্বে ১ মিনিট পর ডাটা ডিলিট করবে
  }),
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 60 * 1000,  //testing purpose                 //30 * 24 * 60 * 60 * 1000,
    sameSite: "lax"
  }
}));

//all router
app.use("/", main_router);

//404 route
app.all("*any", (req, res, next) => {
  throw new AppError(`Not found route ${req.originalUrl}`, 404);
});
//global errorHandler
app.use(globalError);

const PORT = process.env.PORT || 5000;
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
