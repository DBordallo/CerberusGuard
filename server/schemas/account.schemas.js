import { z } from "zod";

export const AccountCreateSchemas = (req, res, next) => {
    const accountCreateSchema = z.object({
      img: z.string({
        required_error: "Image required",
      }),
  
      app_name: z.string({
        required_error: "Name of the App is required",
      }),
  
      email: z.email({
        required_error: "Email required",
      }),
  
      password: z
        .string({
          required_error: "Password is required",
        })
        .min(6, {
          message: "Password must be at least 6 characters",
        }),
    });
  
    try {
      const validatedData = accountCreateSchema.parse(req.body);
      req.validatedData = validatedData;
      next();
    } catch (error) {
      res.status(400).json({ error: error.errors });
    }
  };