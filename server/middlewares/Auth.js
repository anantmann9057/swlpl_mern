
import { sendErrorMessage } from "../utils/helper.js";
export const isAuth = async (req, res, next) => {
  const authToken = req.body.authToken;

  try {
    if (!authToken) {
      return sendErrorMessage(res, "unauthorised auth token not found", 401, {
        token: req.body.authToken,
      });
    }
    next();
  } catch (e) {
    next(e);
  }
};
