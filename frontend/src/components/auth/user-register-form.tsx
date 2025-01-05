import { HTMLAttributes, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useUserStore } from "@/store/user-store";
import { useApiViewsUserRegisterUser } from "@/lib/api";
import { Link, useNavigate } from "@tanstack/react-router";
import { Button } from "../custom/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../form";
import { Input } from "../input";
import { PasswordInput } from "../password-input";
import { cn } from "@/lib/utils";
import { IconLoader2 } from "@tabler/icons-react";

interface UserRegisterFormProps extends HTMLAttributes<HTMLDivElement> {}

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
  confirmPassword: z
    .string()
    .min(1, {
      message: "Please confirm your password",
    })
    .min(2, {
      message: "Password must be at least 2 characters long",
    }),
  firstName: z.string().min(1, { message: "Please enter your first name" }),
  lastName: z.string().min(1, { message: "Please enter your last name" }),
});

export function UserRegisterForm({ className, ...props }: UserRegisterFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();
  const { setCredentials } = useUserStore();

  const {
    mutate: registerMutate,
    isSuccess: registerMutateIsSuccess,
    isError: registerMutateIsError,
    error: registerMutateError,
    reset: registerMutateReset,
    data: registerData,
  } = useApiViewsUserRegisterUser();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    registerMutate(
      {
        data: {
          email: data.email,
          password: data.password,
          first_name: data.firstName,
          last_name: data.lastName,
        },
      },
      {
        async onSuccess(data) {
          registerMutateReset();
          navigate({ to: "/login" });
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

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='confirmPassword'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <div className='flex items-center justify-between'>
                    <FormLabel>Confirm Password</FormLabel>
                  </div>
                  <FormControl>
                    <PasswordInput
                      placeholder='********'
                      autoComplete='confirm password'
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='firstName'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />{" "}
            <FormField
              control={form.control}
              name='lastName'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className='mt-2'
              variant={"default"}
              loading={isLoading}
            >
              Register
            </Button>
            <div className='text-destructive'>{registerMutateError ? registerMutateError.message : null}</div>
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
