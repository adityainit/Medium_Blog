import z from "zod";
export declare const signupInput: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    username: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
    username: string;
}, {
    email: string;
    password: string;
    username: string;
}>;
export declare const signinInput: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export declare const createBlogInput: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
    imgUrl: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    title: string;
    content: string;
    imgUrl?: string | undefined;
}, {
    title: string;
    content: string;
    imgUrl?: string | undefined;
}>;
export declare const updateBlogPost: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    imgUrl: z.ZodOptional<z.ZodString>;
    content: z.ZodOptional<z.ZodString>;
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    title?: string | undefined;
    content?: string | undefined;
    imgUrl?: string | undefined;
}, {
    id: string;
    title?: string | undefined;
    content?: string | undefined;
    imgUrl?: string | undefined;
}>;
export type SignupInput = z.infer<typeof signupInput>;
export type SigninInput = z.infer<typeof signinInput>;
export type CreateBlogInput = z.infer<typeof createBlogInput>;
export type UpdateBlogPost = z.infer<typeof updateBlogPost>;
