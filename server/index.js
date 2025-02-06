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
const app = express();
dotenv.config({ path: "../.env" });

dbConnect();
app.use(
  cors({ origin: process.env.VITE_FRONT_END_BASE_URL, credentials: true })
);
app.use(express.json());
// app.use(cookieParser());
app.use(
  session({
    secret: "hello",
    resave: false,
    saveUninitialized: true,
    proxy: true,
    cookie: { secure: false, maxAge: 900000, sameSite: "strict" }, // change sameSite: strict to sameSite:none for production and secure true
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
app.get("/", (req, res) => {
  res.json("hello");
});
app.get("*", (req, res) => {
  res.redirect("/");
});
app.listen(process.env.PORT, () => {
  console.log(`listening on ${process.env.PORT}`);
});
