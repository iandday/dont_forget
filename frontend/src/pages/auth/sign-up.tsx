import { Card } from '@/components/ui/card'
import { SignUpForm } from './components/sign-up-form'
import { Link } from 'react-router-dom'
import SetConfiguredServer from './components/set-configured-server'
import { useState } from 'react'
import useLocalStorageState from '@/hooks/use-local-storage'
import { Button } from '@/components/custom/button'
import { useApiViewsUserRegEnabled } from '@/lib/api'
import { useEffect } from 'react'
export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [baseUrl, setBaseUrl] = useLocalStorageState('base_url', '')

  const {
    isSuccess: regMutateIsSuccess,
    error: regMutateError,
    data: regData,
  } = useApiViewsUserRegEnabled()

  if (regData?.enabled) {
    return (
      <>
        <div className='container grid h-svh flex-col items-center justify-center bg-primary-foreground lg:max-w-none lg:px-0'>
          <div className='mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[480px] lg:p-8'>
            <Card className='p-6'>
              <div className='mb-2 flex flex-col space-y-2 text-left'>
                <h1 className='text-lg font-semibold tracking-tight'>
                  Create an account
                </h1>
                <p className='text-sm text-muted-foreground'>
                  Complete the form below to create an account. <br />
                  Already have an account?{' '}
                  <Link
                    to='/sign-in'
                    className='underline underline-offset-4 hover:text-primary'
                  >
                    Sign In
                  </Link>
                </p>
              </div>
              <SignUpForm />

              <p className='mt-4 px-8 text-center text-sm text-muted-foreground'>
                By creating an account, you agree to our{' '}
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
      </>
    )
  } else {
    return (
      <>
        <div className='container grid h-svh flex-col items-center justify-center bg-primary-foreground lg:max-w-none lg:px-0'>
          <div className='mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[480px] lg:p-8'>
            <Card className='p-6'>
              <div className='mb-2 flex flex-col space-y-2 text-left'>
                <h1 className='text-lg font-semibold tracking-tight'>
                  Registration Disabled
                </h1>
              </div>
            </Card>
          </div>
        </div>
      </>
    )
  }
}
