import { z } from "zod";

const registerschema = z.object({
  name: z.string().min(3, "Name should be at least 3 characters."),
  email: z.string().email("Please enter a valid email."),
  password: z
    .string()
    .min(8, "Password should be at least 8 characters.")
    .regex(/[A-Z]/, "At least one uppercase letter required.")
    .regex(/[0-9]/, "Include a number for a stronger password."),
});

export default registerschema;
