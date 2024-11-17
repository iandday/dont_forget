import { Card } from '@/components/ui/card'
import { UserAuthForm } from './components/user-auth-form'
import { Layout } from '@/components/custom/layout'
import { Search } from '@/components/search'
import useIsCollapsed from '@/hooks/use-is-collapsed'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { useState } from 'react'
import { Button } from '@/components/custom/button'
import useLocalStorageState from '@/hooks/use-local-storage'
import { useEffect } from 'react'
import SetConfiguredServer from './components/set-configured-server'

export default function SignIn() {
  const [isCollapsed, setIsCollapsed] = useIsCollapsed()
  const [isLoading, setIsLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [baseUrl, setBaseUrl] = useLocalStorageState('base_url', '')

  useEffect(() => {
    setShowModal(baseUrl ? false : true)
  }, [baseUrl])

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
              <div className='flex flex-col space-y-2 text-left'>
                <h1 className='text-2xl font-semibold tracking-tight'>Login</h1>
                <p className='text-sm text-muted-foreground'>
                  Enter your email and password below <br />
                  to log into your account
                </p>
              </div>
              <UserAuthForm />
              <p className='mt-4 px-3 text-center text-sm'>
                <Button
                  className='mt-2'
                  loading={isLoading}
                  onClick={() => setShowModal(true)}
                  variant='secondary'
                >
                  Configured Server: {baseUrl}
                </Button>
              </p>
            </Card>
          </div>
        </div>
        <SetConfiguredServer
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      </Layout.Body>
    </Layout>
  )
}
