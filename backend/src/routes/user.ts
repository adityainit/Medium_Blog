import { Hono } from "hono";

import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

import { decode,sign,verify } from "hono/jwt";

import { signupInput,signinInput } from "@ad-mohankduo23/mediumblog-common";
import { authMiddleware } from "../middleware/authMiddleware";



export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL:string,
        JWT_SECRET:string
    }
    Variables :{
        userId:string
    }
}>()


userRouter.get("/",authMiddleware , async (c) => {

    const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const id = c.get("userId");

    const userDetails = await prisma.user.findFirst({
        where : {
            id
        },
        select: {
            username:true,
            email:true
        }
    })

    return c.json({
        userDetails
    })

    
}) 





userRouter.post("/signup" , async (c) => {
  
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json();

  const {success} = signupInput.safeParse(body);

  if(!success) {
    c.status(411);
    return c.json({
        message:"Invalid inputs"
    })
  }

  try{

    const user = await prisma.user.create({
      data: {
        email:body.email,
        password:body.password,
        username:body.username
      }
    })

    const token = await sign({id:user.id},c.env.JWT_SECRET)


    return c.json({
      message:"signed up",
      jwt:token
    })
  } catch(e){
    c.status(411);
    return c.text("Internal server error or email already exists")
  }
})







userRouter.post("/signin" , async (c) => {
  
  const prisma = new PrismaClient({
    datasourceUrl:c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const {success} = signinInput.safeParse(body);

  if(!success) {
    c.status(411);
    return c.json({
        message:"Invalid inputs"
    })
  }

  try{
    const user = await prisma.user.findUnique({
      where: {
        email:body.email,
        password:body.password
      }
    })

    if(!user) {
      c.status(403);
      return c.json({error:"user not found"})
    }

    const jwt = await sign({id:user.id},c.env.JWT_SECRET);
    return c.json({
      message:"signed in",
      jwt
    });
  } catch(e) {
    c.status(411)
    return c.text("Internal Server error")
  }

})