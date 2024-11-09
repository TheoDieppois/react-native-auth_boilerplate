import { Router } from "express";
import Controller from "../controllers/auth";

const router = Router();

router.post("/login", Controller.login);

router.post("/register", Controller.register);

export default router;
