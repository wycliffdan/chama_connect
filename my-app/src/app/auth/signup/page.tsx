// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { useRouter } from "next/navigation";
// import { toast } from "sonner";
// import { useState } from "react";
// // import { useDispatch } from "react-redux";
// // import { signupUser } from "@/ReduxToolkit/authSlice";

// const formSchema = z.object({
//   email: z.string().email({ message: "Invalid email address" }),
//   password: z.string().min(8, { message: "Password must be at least 8 characters." }),
// });

// const Signup = () => {
// //   const dispatch = useDispatch();
//   const router = useRouter();
//   const [isLoading, setIsLoading] = useState(false);

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: { email: "", password: "" },
//   });

//   const onSubmit = async (values: z.infer<typeof formSchema>) => {
//     try {
//       setIsLoading(true);
//     //   await dispatch(signupUser(values)).unwrap();
//       toast.success("Signup successful! Please log in.");
//       router.push("/auth/login");
//     } catch (error: any) {
//       toast.error(error?.message || "Signup failed");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="main w-full fixed left-0 right-0 top-0 bottom-0 backdrop-blur-md z-50">
//       <div className="formcontainer w-full sm:w-[500px] bg-[#af8dff65] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] px-5 sm:px-10 py-10 rounded-lg">
//         <h2 className="text-center font-bold text-white text-3xl mb-5">Sign Up</h2>
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//             <FormField control={form.control} name="email" render={({ field }) => (
//               <FormItem>
//                 <FormLabel className="text-white text-lg">Email</FormLabel>
//                 <FormControl>
//                   <Input placeholder="Enter your Email" {...field} className="placeholder:text-white text-white text-sm p-4" />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )} />
//             <FormField control={form.control} name="password" render={({ field }) => (
//               <FormItem>
//                 <FormLabel className="text-white text-lg">Password</FormLabel>
//                 <FormControl>
//                   <Input type="password" placeholder="Enter your Password" {...field} className="placeholder:text-white text-white text-sm p-4" />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )} />
//             <Button type="submit" className="w-full bg-pink-400 hover:bg-pink-600 text-xl" disabled={isLoading}>
//               {isLoading ? "Signing up..." : "Sign Up"}
//             </Button>
//           </form>
//         </Form>
//       </div>
//     </div>
//   );
// };

// export default Signup;


"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";
import Link from "next/link";
// import { useDispatch } from "react-redux";
// import { registerUser } from "@/ReduxToolkit/authSlice";
import { Eye, EyeOff } from "lucide-react";
import { signIn } from "next-auth/react";

const formSchema = z
  .object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    confirmPassword: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const Signup = () => {
  // const dispatch = useDispatch();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // setIsLoading(true);
      // await dispatch(
      //   registerUser({
      //     name: values.name,
      //     email: values.email,
      //     password: values.password,
      //   })
      // ).unwrap();
      toast.success("Signup successful! Please verify your email.");
      router.push("/auth/login");
    } catch (error: any) {
      toast.error(error?.message || "Failed to sign up");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    await signIn("google", { callbackUrl: "/dashboard" });
  };

  return (
    <div className="main w-full fixed left-0 right-0 top-0 bottom-0 backdrop-blur-md z-50">
      <div className="formcontainer w-full sm:w-[500px] bg-[#af8dff65] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-50 px-5 sm:px-10 py-10 rounded-lg backdrop-blur-md">
        <h2 className="text-center font-bold text-white text-3xl mb-5">Sign Up</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white text-lg">Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your Name" {...field} className="placeholder:text-white text-white text-sm p-4" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white text-lg">Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your Email" {...field} className="placeholder:text-white text-white text-sm p-4" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white text-lg">Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input type={showPassword ? "text" : "password"} placeholder="Enter your Password" {...field} className="placeholder:text-white text-white text-sm p-4 pr-10" />
                      <button type="button" onClick={togglePasswordVisibility} className="absolute inset-y-0 right-3 flex items-center text-white">
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white text-lg">Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Confirm your Password" {...field} className="placeholder:text-white text-white text-sm p-4" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="btn pt-2">
              <Button type="submit" className="w-full bg-pink-400 hover:bg-pink-600 text-xl" disabled={isLoading}>
                {isLoading ? "Signing up..." : "Sign Up"}
              </Button>
            </div>
          </form>

          <div className="btn pt-2 sm:flex gap-1 justify-center items-center">
            <p className="text-lg text-white">Already have an account?</p>
            <Link href="/login">
              <Button variant="link" className="text-pink-500 text-lg p-0">
                <span className="text-xl">Log In</span>
              </Button>
            </Link>
          </div>

          <div className="text-center mt-4">
            <Button onClick={handleGoogleSignup} className="bg-blue-500 text-white w-full">
              Sign up with Google
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Signup;
