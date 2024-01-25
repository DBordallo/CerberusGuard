import { z } from "zod";

export const productCreateSchemas = z.object({
    img: z
    .string({
        required_error: "Image required",
    }),

    app_name: z
    .string({
        required_error: "Name of the App is required",
    }),

    email: z
    .email({
        required_error: "Email required",
    }),

    password: z
    .string({
        required_error: "password is required",
        
    })
    .min(6, {
        message: "password must be at least 6 characters"
    }),
    
})
