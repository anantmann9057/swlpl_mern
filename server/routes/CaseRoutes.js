import { Router } from "express";
import { isAuth } from "../middlewares/Auth.js";
import {
  getCaseRequests,
  getRunningCases,
} from "../controllers/CasesController.js";

const caseRouter = Router();

caseRouter.post("/caseRequests", isAuth, getCaseRequests);
caseRouter.get("/getRunningCases", getRunningCases);
export default caseRouter;
