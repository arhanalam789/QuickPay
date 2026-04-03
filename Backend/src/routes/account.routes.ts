import express from "express";
import * as accountController from "../controllers/account.controller";
import * as authmiddleware from "../middleware/auth.middleware";
const router = express.Router();


router.post("/", authmiddleware.authenticate, accountController.createAccount);

export default router;