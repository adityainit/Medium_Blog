
import { Context } from "hono";
import { verify } from "hono/jwt"


export async function authMiddleware(c:Context,next:Function) {
    const token = c.req.header("Authorization") || "";

    try {

        const user = await verify(token,c.env.JWT_SECRET);

        if(user) {
            c.set("userId" , user.id);
            await next()
        } else {
        c.status(403);
        return c.json({message:"Unauthorized"})
        }
    } catch(e) {
        c.status(403);
        return c.json({message:"Unauthorized"})
    }






}