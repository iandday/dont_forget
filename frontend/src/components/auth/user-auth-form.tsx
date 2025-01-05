import { HTMLAttributes, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useUserStore } from "@/store/user-store";
import { useApiViewsUserNewToken } from "@/lib/api";
import { Link, useNavigate } from "@tanstack/react-router";
import { Button } from "../custom/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../form";
import { Input } from "../input";
import { PasswordInput } from "../password-input";
import { cn } from "@/lib/utils";
import { IconLoader2 } from "@tabler/icons-react";

interface UserAuthFormProps extends HTMLAttributes<HTMLDivElement> {}

const formSchema = z.object({
  email: z.string().min(1, { message: "Please enter your email" }).email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(1, {
      message: "Please enter your password",
    })
    .min(2, {
      message: "Password must be at least 2 characters long",
    }),
});

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();
  const { setCredentials } = useUserStore();

  const {
    mutate: loginMutate,
    isSuccess: loginMutateIsSuccess,
    isError: loginMutateIsError,
    error: loginMutateError,
    reset: loginMutateReset,
    data: loginData,
  } = useApiViewsUserNewToken();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    loginMutate(
      {
        data: {
          email: data.email,
          password: data.password,
        },
      },
      {
        async onSuccess(data) {
          loginMutateReset();
          setCredentials({
            accessToken: data.access,
            refreshToken: data.refresh,
            firstName: data.user.first_name,
            lastName: data.user.last_name,
            email: data.user.email,
          });
          navigate({ to: "/" });
        },
        onError: (err) => {
          form.reset();
          setIsDialogOpen(true);
        },
      }
    );
    setIsLoading(false);
  };

  return (
    <div
      className={cn("grid gap-6 flex-none", className)}
      {...props}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='grid gap-2'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='name@example.com'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <div className='flex items-center justify-between'>
                    <FormLabel>Password</FormLabel>
                  </div>
                  <FormControl>
                    <PasswordInput
                      placeholder='********'
                      autoComplete='password'
                      {...field}
                    />
                  </FormControl>
                  <Link
                    to='/forgot_password'
                    className='text-sm font-medium text-muted-foreground hover:opacity-75'
                  >
                    Forgot password?
                  </Link>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className='mt-2'
              variant={"default"}
              loading={isLoading}
            >
              Login
            </Button>
            <div className='text-destructive'>{loginMutateError ? loginMutateError.message : null}</div>
            <div className='relative my-2'>
              <div className='absolute inset-0 flex items-center'>
                <span className='w-full border-t' />
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
