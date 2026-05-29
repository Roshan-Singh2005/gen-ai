import { Request, Response } from "express";
import bcrypt from "bcrypt";
import {prisma} from "../db/prisma";
import jwt from "jsonwebtoken";
import { registerSchema,loginSchema } from "../schemas/auth.schema";
import { JWT_SECRET } from "../lib/constants";


export async function register(req:Request, res:Response){
  const decoded = registerSchema.safeParse(req.body);
  if (!decoded.success){
    return res.status(400).json({error:"invalid request body"});
  }
  const {email,name,password} = decoded.data;

  try{
    const existingUser = await prisma.user.findUnique({
        where: {
            email : email,
        }
    });
    if(existingUser){
        return res.status(400).json({message:"user already exists"});
    };

    const hashedPassword = await bcrypt.hash(password,10);
    const newUser = await prisma.user.create({
        data:{
            email,
            name,
            password: hashedPassword,
        },
    });
    const token = jwt.sign({ id: newUser.id }, JWT_SECRET as string); //id+jwt secret token
    res.cookie("token",token);
    return res.status(201).json({ user: newUser.name, token });
    
  }catch(error){
    console.log(error);
    return res.status(400).json(error);
  }
};


export async function login(req: Request,res:Response){

}