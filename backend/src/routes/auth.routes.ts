import { Router } from "express";
import { register } from "../controller/auth.controller";
import { login } from "../controller/auth.controller";

export const authRouter = Router();

authRouter.post("/register",register);
authRouter.post("/login",login);

