import User from "../../modules/users/user.model.js";
import { verifyToken, getTokenFromRequest } from "../utils/token.js";
import { AppError } from "../utils/AppError.js";

export async function requireAuth(req, res, next) {
  const token = getTokenFromRequest(req);
  if (!token) {
    throw new AppError(401, "You need to log in first");
  }

  const payload = verifyToken(token);
  if (!payload) {
    throw new AppError(401, "Your session has expired, please log in again");
  }

  const user = await User.findById(payload.userId);
  if (!user) {
    throw new AppError(401, "Your session has expired, please log in again");
  }

  req.user = user;
  next();
}