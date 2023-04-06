import express from "express";
import authCtrl from "./../Controllers/authController.js"

const router = express.Router();

//route pour se connecter
router.route("/auth/signin").post(authCtrl.signin);

//route pour se deconnecter
router.route("/auth/signout").get(authCtrl.signout);

export default router