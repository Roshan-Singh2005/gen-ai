import express from "express";
import { authRouter } from "./routes/auth.routes";
import cookieParser from "cookie-parser";
import { generateRouter } from "./routes/generate.route";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/auth",authRouter);
app.use("/generate",generateRouter);


app.listen(3000,()=>{
    console.log("server started at port 3000")
})