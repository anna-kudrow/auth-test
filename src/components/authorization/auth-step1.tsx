"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { mockLogin } from "../../api/mockAuth";
import Lock from "../icons/lock";
import User from "../icons/user";
import Heading3 from "../shared/heading3";
import { Input } from "../ui/input";
import AuthLayout from "./auth-layout";

const formSchema = z.object({
  email: z.string().min(7).max(50),
  password: z.string().min(3).max(50),
});

function AuthStep1() {
  const [isInputDataWrong, setInputDataWrong] = useState(false);

  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
  });

  const authMutation = useMutation({
    mutationFn: (data: z.infer<typeof formSchema>) => mockLogin(data),
    onSuccess: (response) => {
      if (response.needs2FA) {
        setInputDataWrong(false);
        navigate("/sign-in-step2");
      }
    },
    onError: (_error: any) => {
      setInputDataWrong(true);
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    authMutation.mutate(values);
  }

  return (
    <AuthLayout>
      <Heading3 className="mb-6">
        Sign in to your account to <br /> continue
      </Heading3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <div className="-translate-y-1/2 absolute top-1/2 left-3">
                      <User />
                    </div>
                    <Input type="email" placeholder="Email" {...field} />
                  </div>
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
                <FormControl>
                  <div className="relative">
                    <div className="-translate-y-1/2 absolute top-1/2 left-3">
                      <Lock />
                    </div>
                    <Input type="password" placeholder="Password" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="w-full"
            disabled={!form.formState.isValid}
            type="submit"
          >
            Log in
          </Button>
        </form>
        {isInputDataWrong && <div>Invalid username or password</div>}
      </Form>
    </AuthLayout>
  );
}

export default AuthStep1;
