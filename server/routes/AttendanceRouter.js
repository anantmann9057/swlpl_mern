import { Router } from "express";
import { sendOtp, verifyOtp } from "../controllers/AuthController.js";
import { isAuth } from "../middlewares/Auth.js";
import {
  checkAttendance,
  markAttendance,
} from "../controllers/AttendanceController.js";
import { fileParser } from "../middlewares/File.js";
const attendanceRouter = Router();

attendanceRouter.post("/attendanceStatus", isAuth, checkAttendance);
attendanceRouter.post("/markAttendance", fileParser, markAttendance);
export default attendanceRouter;
