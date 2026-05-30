import { Router } from "express";
import { generate , getById,getAll, deleteById} from "../controller/generate.controller";
import { authMiddleware } from "../middlewares/auth.middleware";


export const generateRouter = Router();

generateRouter.post("/",authMiddleware,generate);
generateRouter.get("/:id",getById);
generateRouter.get("/",getAll);
generateRouter.delete("/:id",deleteById);