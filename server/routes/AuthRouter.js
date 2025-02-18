import { Router } from "express";
import {
  getUserProfile,
  sendOtp,
  verifyOtp,
} from "../controllers/AuthController.js";
import {
  approveAttendanceRequest,
  rejectAttendanceRequest,
} from "../controllers/AttendanceController.js";
const authRouter = Router();

authRouter.post("/sendOtp", sendOtp);
authRouter.post("/verifyOtp", verifyOtp);
authRouter.post("/profile", getUserProfile);


export default authRouter;
