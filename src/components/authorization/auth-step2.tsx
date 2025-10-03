import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { mockVerify2FA } from "@/api/mock2FA";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { cn } from "@/lib/utils";
import Heading3 from "../shared/heading3";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import AuthLayout from "./auth-layout";

const FormSchema = z.object({
  pin: z.string().length(6, { message: "Code must be exactly 6 digits" }),
});

function AuthStep2() {
  const [isGetNewPinActive, setGetNewPinActive] = useState(false);

  const [isPinCorrect, setIsPinCorrect] = useState(true);

  const verifyMutation = useMutation({
    mutationFn: (pin: string) => mockVerify2FA(pin),
    onSuccess: () => {
      console.log("Yahoooo!");
      setIsPinCorrect(true);
    },
    onError: (_error: any) => {
      setIsPinCorrect(false);
    },
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setGetNewPinActive(true);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    verifyMutation.mutate(data.pin);
  }

  return (
    <AuthLayout>
      <Heading3 className="mb-4">Two-Factor Authentication</Heading3>
      <p className="mb-7">
        Enter the 6-digit code from the Google <br /> Authenticator app
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="pin"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputOTP
                    maxLength={6}
                    pattern={REGEXP_ONLY_DIGITS}
                    onChange={field.onChange}
                    value={field.value}
                  >
                    <InputOTPGroup className="flex w-full justify-between gap-[10px]">
                      {Array.from({ length: 6 }).map((_, index) => (
                        <InputOTPSlot
                          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                          key={index}
                          className={cn(
                            !isPinCorrect && "border border-destructive",
                          )}
                          index={index}
                        />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                {!isPinCorrect && (
                  <p className="text-start text-destructive text-sm">
                    Invalid code
                  </p>
                )}
              </FormItem>
            )}
          />
          {isGetNewPinActive ? (
            <Button className="w-full" type="button">
              Get new
            </Button>
          ) : (
            <Button className="w-full" type="submit">
              Continue
            </Button>
          )}
        </form>
      </Form>
    </AuthLayout>
  );
}

export default AuthStep2;
