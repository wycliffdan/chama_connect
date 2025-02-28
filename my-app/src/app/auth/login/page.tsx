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
// import { loginUser } from "@/ReduxToolkit/authSlice";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

const Login = () => {
//   const dispatch = useDispatch();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
    //   setIsLoading(true);
    //   const result = await dispatch(
    //     loginUser({
    //       email: values.email,
    //       password: values.password,
    //     })
    //   ).unwrap();

      toast.success("Login successful!");
      router.push("/portal");
    } catch (error: any) {
      toast.error(error?.message || "Failed to log in");
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="main w-full fixed left-0 right-0 top-0 bottom-0 backdrop-blur-md z-50">
      <div className="formcontainer w-full sm:w-[500px] bg-[#af8dff65] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-50 px-5 sm:px-10 py-10 rounded-lg backdrop-blur-md">
        <h2 className="text-center font-bold text-white text-3xl mb-5">Login</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white text-lg">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your Email"
                      {...field}
                      className="placeholder:text-white text-white text-sm p-4"
                    />
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
                    <Input
                      type="password"
                      placeholder="Enter your Password"
                      {...field}
                      className="placeholder:text-white text-white text-sm p-4"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="btn pt-2">
              <Button
                type="submit"
                className="w-full bg-pink-400 hover:bg-pink-600 text-xl"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Submit"}
              </Button>
            </div>
          </form>

          <div className="forgot text-center py-2">
            <Button
              variant={"link"}
              onClick={() => router.push("/forgot-password")}
              className="text-pink-500 text-lg"
            >
              Forgot Password?
            </Button>
          </div>

          <div className="btn pt-2 sm:flex gap-1 justify-center items-center">
            <p className="text-lg text-white">Don't have an account?</p>
            <Link href="/auth/signup">
              <Button variant={"link"} className="text-pink-500 text-lg p-0">
                <span className="text-xl">Create New Account</span>
              </Button>
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
