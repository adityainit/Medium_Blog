import { Hono } from "hono";

import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

import { authMiddleware } from "../middleware/authMiddleware";
import { createBlogInput, updateBlogPost } from "@ad-mohankduo23/mediumblog-common";



export const blogRouter = new Hono<{
    Bindings : {
        DATABASE_URL:string
    }
    Variables:{
        userId:string
    }
}>()

blogRouter.use("/*" , authMiddleware)


blogRouter.post("/" , async (c) => {

    const body = await c.req.json();

    const {success} = createBlogInput.safeParse(body);

    if(!success) {
        c.status(411);
        return c.json({
            message:"Invalid inputs"
        })
    }


    const authorId = c.get("userId")

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const blog = await prisma.blog.create({
        data :{ 
            title:body.title,
            content:body.content,
            imgUrl:body.imgUrl,
            authorId
        }
    })

    return c.json({
        id:blog.id,
        message:"succesfully created a blog"
    })
})  


blogRouter.put("/" , async (c) => {

    const body = await  c.req.json()

    const {success} = updateBlogPost.safeParse(body);

    if(!success) {
        c.status(411);
        return c.json({
            message:"Invalid inputs"
        })
    }

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  
    
    const blog = await prisma.blog.update({
        where:{
            id:body.id
        },
        data : {
            title:body.title,
            content:body.content,
            imgUrl:body.imgUrl,
            publishedData:new Date()
        }
    })
  
    return c.json({
        message:"blog has been updated",
        blog
    })
})


//pagination should be added here - like at first you should only return 10 something posts and eventually when the user scrolls keep on returing with the posts
blogRouter.get("/bulk" , async (c) => {
    
    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const blogs = await prisma.blog.findMany({
        orderBy :{
            publishedData:"desc"
        },
        select: {
            content:true,
            title:true,
            publishedData:true,
            id:true,
            imgUrl:true,
            author: {
                select : {
                    username:true
                }
            }
        }
    });

    return c.json({
        blogs
    })
})

blogRouter.get("/myBlogs",authMiddleware , async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const id = c.get("userId");
    console.log(id)

    const blogs = await prisma.blog.findMany({
        orderBy :{
            publishedData:"desc"
        },
        where:{
            authorId:id
        },
        select: {
            content:true,
            title:true,
            publishedData:true,
            id:true,
            imgUrl:true,
            author: {
                select : {
                    username:true
                }
            }
        }
    })

    return c.json({
        blogs
    })
})

blogRouter.delete("/:id" ,async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const id = c.req.param("id");
    console.log(id)

    await prisma.blog.delete({
        where : {
            id
        }
    })

    return c.json({
        message:"deleted the blog"
    })
})



blogRouter.get("/:id" , async (c) => {

    const id =  c.req.param("id");

    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate())

     try {
        const blog = await prisma.blog.findFirst({
        where:{
            id
        },
        select: {
            content:true,
            title:true,
            publishedData:true,
            id:true,
            imgUrl:true,
            author: {
                select : {
                    username:true,
                    email:true
                }
            }
        }
    })

        return c.json({
            blog
        })
    } catch (e) {
        c.status(411);
        return c.json({message:"internal server error in fething the blog"})
    }
})


