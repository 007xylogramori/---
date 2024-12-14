import { Router } from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  refreshAccessToken,
  changeCurrentPassword,
  getCurrentUser,
} from "../controllers/user.controller.js";


const router = Router();
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);


router.route("/logout").get( logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/change-password").post( changeCurrentPassword);
router.route("/current-user").get( getCurrentUser);
router.route("/update-account").patch( updateAccountDetails)


export default router;
