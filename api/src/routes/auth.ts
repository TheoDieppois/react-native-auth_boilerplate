import { Router } from "express";
import Controller from "../controllers/auth";
import { validateData } from "../middlewares/validateData";
import { createUserSchema, loginUserSchema } from "../db/schema/users";
import { verifyToken } from "../middlewares/verifyToken";

const router = Router();

router.post("/login", validateData(loginUserSchema), Controller.login);

router.post("/register", validateData(createUserSchema), Controller.register);

router.post("/logout", Controller.logout);

router.post("/refresh", Controller.refresh);

router.get("/test", verifyToken, Controller.test);

router.get("/me", verifyToken, Controller.me);

export default router;
