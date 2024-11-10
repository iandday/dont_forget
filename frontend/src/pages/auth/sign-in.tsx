import { Card } from '@/components/ui/card'
import { UserAuthForm } from './components/user-auth-form'
import { Layout } from '@/components/custom/layout'
import { Search } from '@/components/search'
import useIsCollapsed from '@/hooks/use-is-collapsed'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { IconShoppingCart } from '@tabler/icons-react'
import React, { useState } from 'react'
import { Button } from '@/components/custom/button'
import {
  Credenza,
  CredenzaBody,
  CredenzaClose,
  CredenzaContent,
  CredenzaDescription,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from '@/components/credenza'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import useLocalStorage from '@/hooks/use-local-storage'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input } from '@/components/ui/input'

const formSchema = z.object({
  url: z.string().min(1, { message: "Please enter your backend server's URL" }),
})

export default function SignIn() {
  const [isCollapsed, setIsCollapsed] = useIsCollapsed()
  const [isLoading, setIsLoading] = useState(false)
  const [baseUrl, setBaseUrl] = useLocalStorage<string>({
    key: 'base_url',
    defaultValue: '',
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: '',
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true)
    setBaseUrl(data.url)
    setIsLoading(false)
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
            <div className='mb-4 flex items-center justify-center'>
              <IconShoppingCart stroke={1.5} className={`mx-3`} />
              <div
                className={`flex flex-col justify-end truncate ${isCollapsed ? 'invisible w-0' : 'visible w-auto'}`}
              >
                <span className='font-medium'>Don't Forget</span>
                {/* <span className='text-xs'>It's Important</span> */}
              </div>
            </div>
            <Card className='p-6'>
              <div className='flex flex-col space-y-2 text-left'>
                <h1 className='text-2xl font-semibold tracking-tight'>Login</h1>
                <p className='text-sm text-muted-foreground'>
                  Enter your email and password below <br />
                  to log into your account
                </p>
              </div>
              <UserAuthForm />
              <p className='mt-4 px-8 text-center text-sm text-muted-foreground'>
                By clicking login, you agree to our{' '}
                <a
                  href='/terms'
                  className='underline underline-offset-4 hover:text-primary'
                >
                  Terms of Service
                </a>{' '}
                and{' '}
                <a
                  href='/privacy'
                  className='underline underline-offset-4 hover:text-primary'
                >
                  Privacy Policy
                </a>
                .
              </p>
            </Card>
            <Credenza open={!baseUrl ? true : false}>
              <CredenzaContent>
                <CredenzaHeader>
                  <CredenzaTitle>Set Base URL</CredenzaTitle>
                  <CredenzaDescription>
                    Configure your backend's URL.
                  </CredenzaDescription>
                </CredenzaHeader>
                <CredenzaBody>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                      <div className='grid gap-2'>
                        <FormField
                          control={form.control}
                          name='url'
                          render={({ field }) => (
                            <FormItem className='space-y-1'>
                              <FormLabel>URL</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder='https://dontforget.domain.com'
                                  {...field}
                                />
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
                </CredenzaBody>
                <CredenzaFooter>
                  <CredenzaClose asChild>
                    <Button>Close</Button>
                  </CredenzaClose>
                </CredenzaFooter>
              </CredenzaContent>
            </Credenza>
          </div>
        </div>
      </Layout.Body>
    </Layout>
  )
}
