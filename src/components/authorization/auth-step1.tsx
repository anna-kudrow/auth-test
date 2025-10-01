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
  FormMessage,
} from "@/components/ui/form";
import Lock from "../icons/lock";
import User from "../icons/user";
import Heading3 from "../shared/heading3";
import { Input } from "../ui/input";
import AuthLayout from "./auth-layout";

const formSchema = z.object({
  email: z.string().min(7).max(50),
  password: z.string().min(8).max(50),
});

function AuthStep1() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <AuthLayout>
      <Heading3>
        Sign in to your account to <br /> continue
      </Heading3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="relative">
                <div className="-translate-y-1/2 absolute top-1/2 left-3">
                  <User />
                </div>
                <FormControl>
                  <Input type="email" placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="relative">
                <div className="-translate-y-1/2 absolute top-1/2 left-3">
                  <Lock />
                </div>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="w-full text-secondary-foreground"
            disabled
            type="submit"
          >
            Log in
          </Button>
        </form>
      </Form>
    </AuthLayout>
  );
}

export default AuthStep1;
