import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { Layout } from '@/components/custom/layout'
import { Search } from '@/components/search'

import { Button } from '@/components/custom/button'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useUserStore } from '../../store/user-store'
import { useState } from 'react'
import { useApiViewsUserUpdateMe } from '@/lib/api'
import { useNavigate } from 'react-router-dom'
import { Card } from '@/components/ui/card'
const formSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
})

export default function Profile() {
  const firstName = useUserStore.getState().user?.firstName
  const lastName = useUserStore.getState().user?.lastName
  const accessToken = useUserStore.getState().user?.accessToken
  const refreshToken = useUserStore.getState().user?.refreshToken
  const email = useUserStore.getState().user?.email
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { setCredentials } = useUserStore()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: firstName,
      lastName: lastName,
    },
  })
  const {
    mutate: updateMutate,
    isSuccess: updateMutateIsSuccess,
    error: updaterMutateError,
    reset: updateMutateReset,
    data: updateData,
  } = useApiViewsUserUpdateMe()

  function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
    updateMutate(
      {
        data: {
          first_name: data.firstName,
          last_name: data.lastName,
        },
      },
      {
        onSuccess(data) {
          console.log(data)
          setCredentials({
            accessToken: accessToken,
            refreshToken: refreshToken,
            firstName: data.first_name,
            lastName: data.last_name,
            email: email,
          })
          setIsLoading(false)
          navigate('/')
        },
        onError: (err) => {
          console.log('ERROR')
          console.log(err)
        },
      }
    )
  }

  return (
    <Layout fixed>
      {/* ===== Top Heading ===== */}
      <Layout.Header>
        <Search />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>

      <Layout.Body className='flex flex-col'>
        <div className='container grid h-svh flex-col items-center justify-center bg-primary-foreground lg:max-w-none lg:px-0'>
          <div className='mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[480px] lg:p-8'>
            <Card className='p-6'>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className='grid gap-2'>
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
                    />
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

                    <Button className='mt-2' loading={isLoading}>
                      Save
                    </Button>

                    <div className='relative my-2'>
                      <div className='absolute inset-0 flex items-center'>
                        <span className='w-full border-t' />
                      </div>
                    </div>
                  </div>
                </form>
              </Form>
            </Card>
          </div>
        </div>
      </Layout.Body>
    </Layout>
  )
}
