import { Request, Response } from "express";
import { promptSchema } from "../schemas/generate.schema";
import { prisma } from "../db/prisma";
import { runLLM } from "../services/ai.service";
import { ResponseSchema } from "@google/generative-ai";




export async function generate(req:Request, res:Response){
const decoded = promptSchema.safeParse(req.body);

if (!decoded.success){
      return res.status(400).json({message:"invalid request body"});
    }
    const {prompt} = decoded.data;

    try{
    const generatedText = await runLLM(prompt);
    const cleanText  = JSON.stringify(generatedText);
    const user = req.userId as string;
    const generation = await prisma.generation.create({
        data:{
            prompt : prompt,
            response : cleanText,
            userId : user,
        },

    });
return res.status(201).json({message: "Generation created successfully",generation});
}catch(error){
    return res.status(500).json({message:error})
    }
}

export async function getById(req: Request, res: Response){
    const genId = req.params.id;
    try{
        const generatedText = await prisma.generation.findUnique({
            where:{
                id: genId as string,
            },
        });
        if(!generatedText){
            return res.status(404).json({message:"Generated text not found"});
        };
        res.status(200).json(generatedText);
    }catch(error){
        res.status(500).json({message:error});
    }
};

export async function getAll(req:Request, res:Response){
  const genId = req.userId as string;
  try{
  const generatedText = await prisma.generation.findMany({
    where:{
      id: genId as string,
    },
  });
    if(!generatedText){
            return res.status(404).json({message:"Generated text not found"});
        };
        res.status(200).json(generatedText);
    }catch(error){
      return res.status(500).json({message:error});
    }
};

export async function deleteById(req:Request,res:Response){
const genId = req.params.id;
  try{
    const generatedText = await prisma.generation.delete({
      where:{
        id : genId as string,
      },
    });
      if(!generatedText){
          return res.status(404).json({message:"Generated text not found"});
      };
  res.status(200).json({message:"Todo Deleted",generatedText});
  }catch(error){
    return res.status(500).json({message:error});
  }
};