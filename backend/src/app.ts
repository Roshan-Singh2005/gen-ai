import express from "express";
import { authRouter } from "./routes/auth.routes";
import { authMiddleware } from "./middlewares/auth.middleware";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/auth",authRouter);


app.listen(3000,()=>{
    console.log("server started at port 3000")
})