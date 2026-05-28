import { Router } from "express";
import {
  CheckPhoneExists,
  LoginUser,
  logOut,
  RegisterUser,
  requestPasswordReset,
  resetPassword,
} from "../controllers/userauth.controller";

const userRoute = Router();

userRoute.post("/auth/register", RegisterUser);
// Add to user.route.ts
userRoute.post("/auth/check-phone", CheckPhoneExists);
userRoute.post("/auth/login", LoginUser);
userRoute.post("/auth/request-reset-password", requestPasswordReset); // New endpoint for requesting reset
userRoute.post("/auth/reset-password", resetPassword); // Updated endpoint for resetting password
userRoute.post("/auth/logout", logOut);

export default userRoute;
