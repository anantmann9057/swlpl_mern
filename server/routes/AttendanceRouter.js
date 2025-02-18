import { Router } from "express";
import { isAuth } from "../middlewares/Auth.js";
import {
  approveAttendanceRequest,
  checkAttendance,
  getOutApprovalList,
  markAttendance,
  rejectAttendanceRequest,
} from "../controllers/AttendanceController.js";
const attendanceRouter = Router();

attendanceRouter.post("/attendanceStatus", isAuth, checkAttendance);
attendanceRouter.post("/markAttendance", isAuth, markAttendance);
attendanceRouter.post('/approvalListOut',isAuth,getOutApprovalList);
attendanceRouter.post('/approvalListIn',isAuth,getOutApprovalList);
attendanceRouter.post("/approveRequest", approveAttendanceRequest);
attendanceRouter.post("/rejectRequest", rejectAttendanceRequest);
export default attendanceRouter;
