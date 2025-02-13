import { Router } from "express";
import { isAuth } from "../middlewares/Auth.js";
import { getCaseRequests } from "../controllers/CasesController.js";

const caseRouter = Router();

caseRouter.post("/caseRequests", isAuth, getCaseRequests);

export default caseRouter;
