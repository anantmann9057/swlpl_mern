import express from "express";
import "express-async-errors";
import { errorHandler } from "./middlewares/error.js";
import cors from "cors";
import session from "express-session";
import MongoStore from "connect-mongo";
import * as dotenv from "dotenv";
import authRouter from "./routes/AuthRouter.js";
import { dbConnect } from "./database/db.js";
import attendanceRouter from "./routes/AttendanceRouter.js";
import caseRouter from "./routes/CaseRoutes.js";
const app = express();
dotenv.config({ path: "../.env" });

dbConnect();
app.use(cors({ origin:[ process.env.VITE_FRONT_END_BASE_URL,"http://192.168.29.45:5173"], credentials: true }));
app.use(express.json({ limit: "50mb" }));
// app.use(cookieParser());
app.use(
  session({
    secret: "hello",
    resave: false,
    saveUninitialized: true,
    proxy: true,
    cookie: { secure: true, maxAge: 900000, sameSite: "none" }, // chang1e sameSite: strict to sameSite:none for production and secure true
    unset: "destroy",
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_DB_URL, // you have to provide some storage to store session data
    }),
  })
);

app.use(errorHandler);
app.use(
  "/auth",
  (req, res, next) => {
    next();
  },
  authRouter
);
app.use(
  "/attendance",
  (req, res, next) => {
    next();
  },
  attendanceRouter
);

app.use(
  "/cases",
  (req, res, next) => {
    next();
  },
  caseRouter
);
app.get("/", (req, res) => {
  res.json("hello");
});
app.get("*", (req, res) => {
  res.redirect("/");
});
app.listen(process.env.PORT, () => {
  console.log(`listening on ${process.env.PORT}`);
});
