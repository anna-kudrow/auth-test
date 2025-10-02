import z from "zod";
import Heading3 from "../shared/heading3";
import AuthLayout from "./auth-layout";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { mockVerify2FA } from "@/api/mock2FA";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Invalid code",
  }),
});

function AuthStep2() {
  const [isGetNewPinActive, setGetNewPinActive] = useState(false);

  const navigate = useNavigate();

  // Мутация для проверки 2FA
  const verifyMutation = useMutation({
    mutationFn: (pin: string) => mockVerify2FA(pin),
    onSuccess: () => {
      // редирект после успешной проверки
      console.log("Yahoooo!");
    },
    onError: (error: any) => {
      alert(error.message);
    },
  });

  // Автоматически проверяем при открытии страницы
  // useEffect(() => {
  //   // если хочешь передать default pin для автотеста
  //   const defaultPin = "123456";
  //   verifyMutation.mutate(defaultPin);
  // }, []);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {}

  return (
    <AuthLayout>
      <Heading3 className="mb-4">Two-Factor Authentication</Heading3>
      <p className="mb-7">
        Enter the 6-digit code from the Google <br /> Authenticator app
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
          <FormField
            control={form.control}
            name="pin"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputOTP maxLength={6}>
                    <InputOTPGroup className="gap-[10px] w-full flex justify-center">
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full" type="submit">
            Continue
          </Button>
        </form>
      </Form>
    </AuthLayout>
  );
}

export default AuthStep2;
