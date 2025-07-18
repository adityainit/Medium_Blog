import z from "zod"

export const signupInput = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    username:z.string()
})

export const signinInput = z.object({
    email: z.string().email(),
    password: z.string().min(6),
})

export const createBlogInput = z.object({
    title:z.string(),
    content:z.string(),
    imgUrl:z.string().optional()
})

export const updateBlogPost = z.object({
    title:z.string().optional(),
    imgUrl:z.string().optional(),
    content:z.string().optional(),
    id:z.string()
})


export type SignupInput = z.infer<typeof signupInput>

export type SigninInput = z.infer<typeof signinInput>

export type CreateBlogInput = z.infer<typeof createBlogInput>

export type UpdateBlogPost = z.infer<typeof updateBlogPost>