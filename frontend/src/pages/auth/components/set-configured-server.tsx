import { Card } from '@/components/ui/card'
import { UserAuthForm } from './components/user-auth-form'
import { Layout } from '@/components/custom/layout'
import { Search } from '@/components/search'
import useIsCollapsed from '@/hooks/use-is-collapsed'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { IconShoppingCart } from '@tabler/icons-react'
import { useState } from 'react'
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
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input } from '@/components/ui/input'
import useLocalStorageState from '@/hooks/use-local-storage'
import { useEffect } from 'react'
const formSchema = z.object({
  url: z.string().min(1, { message: "Please enter your backend server's URL" }),
})

interface ConfiguredServerProps {
  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void
  showModal: boolean
  setShowModal: (showModal: boolean) => void
}
export default function SetConfiguredServer({
  isLoading,
  setIsLoading,
  showModal,
  setShowModal,
}: ConfiguredServerProps) {
  const [baseUrl, setBaseUrl] = useLocalStorageState('base_url', '')

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: '',
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true)
    setBaseUrl(data.url)
    console.log(data.url)
    setIsLoading(false)
    setShowModal(false)
  }

  return (
    <Credenza open={showModal}>
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
            <Button onClick={() => setShowModal(false)}>Close</Button>
          </CredenzaClose>
        </CredenzaFooter>
      </CredenzaContent>
    </Credenza>
  )
}
