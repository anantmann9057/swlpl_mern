import { Router } from "express";
import { isAuth } from "../middlewares/Auth.js";
import {
  checkAttendance,
  markAttendance,
} from "../controllers/AttendanceController.js";
const attendanceRouter = Router();

attendanceRouter.post("/attendanceStatus", isAuth, checkAttendance);
attendanceRouter.post("/markAttendance", isAuth, markAttendance);
export default attendanceRouter;
