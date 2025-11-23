import { z } from "zod";

const schema = z.object({
    email: z.string().email("Please enter a valid email."),
    password: z.string().min(8, "Password should be at least 8 characters."),
});

export default schema;
