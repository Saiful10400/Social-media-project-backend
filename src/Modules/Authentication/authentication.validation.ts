import { z } from "zod";

const signup=z.object({
    name: z.string().nonempty({ message: "Name is required" }),
    img: z.string().nonempty({ message: "Profile image URL is required" }),
    email: z.string().email({ message: "Invalid email format" }),
    password: z.string().nonempty({ message: "Password is required" }),
    phone: z.string().nonempty({ message: "Phone number is required" }),
    role: z.enum(["user", "admin"], { 
      errorMap: () => ({ message: "Role must be either 'user' or 'admin'" }) 
    }).optional(),
    coverImg: z.string().optional(),
    bio: z.string().optional(),
    profession: z.string().optional(),
    address: z.string().optional(),
    socialLinks: z.array(z.string().url({ message: "Invalid URL in social links" })).optional(),
})

const login=z.object({
    email:z.string().email({message:"invalid email address."}),
    password:z.string({message:"password mustbe string."})
})






const authenticationValidationSchema={signup,login}

export default authenticationValidationSchema