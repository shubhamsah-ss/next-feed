import { z } from "zod";

export const usernameValidation = z
.string()
.min(3, "Username must be at least 3 characters")
.max(20, "Username at most 3 characters")
.regex(/^[a-zA-z0-9]+$/,"Username must not contain special characters")

export const signupSchema = z.object({
    username: usernameValidation,
    email: z.string().email({message: "Invalid email address"}),
    password: z.string().min(6, { message: "Password must be at least 6 characters"})
})