import { Card } from '@/components/ui/card'
import { UserAuthForm } from './components/user-auth-form'
import { Layout } from '@/components/custom/layout'
import { Search } from '@/components/search'
import useIsCollapsed from '@/hooks/use-is-collapsed'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { IconShoppingCart } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useUserStore } from '@/store/user-store'
export default function SignOut() {
  //const [isCollapsed, setIsCollapsed] = useIsCollapsed()
  const navigate = useNavigate()

  const { removeCredentials } = useUserStore()
  useEffect(() => {
    removeCredentials()
    navigate('/sign-in')
  }, [removeCredentials, navigate])

  return (
    <></>
    // <Layout fixed>
    //   {/* ===== Top Heading ===== */}
    //   <Layout.Header>
    //     <Search />
    //     <div className='ml-auto flex items-center space-x-4'>
    //       <ThemeSwitch />
    //       <UserNav />
    //     </div>
    //   </Layout.Header>

    //   <Layout.Body className='flex flex-col'>
    //     <div className='container grid h-svh flex-col items-center justify-center bg-primary-foreground lg:max-w-none lg:px-0'>
    //       <div className='mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[480px] lg:p-8'>
    //         <div className='mb-4 flex items-center justify-center'>
    //           <IconShoppingCart stroke={1.5} className={`mx-3`} />
    //           <div
    //             className={`flex flex-col justify-end truncate ${isCollapsed ? 'invisible w-0' : 'visible w-auto'}`}
    //           >
    //             <span className='font-medium'>Don't Forget</span>
    //             {/* <span className='text-xs'>It's Important</span> */}
    //           </div>
    //         </div>
    //         <Card className='p-6'>
    //           <div className='flex flex-col space-y-2 text-left'>
    //             <h1 className='text-2xl font-semibold tracking-tight'>Login</h1>
    //             <p className='text-sm text-muted-foreground'>
    //               Enter your email and password below <br />
    //               to log into your account
    //             </p>
    //           </div>
    //           <UserAuthForm />
    //           <p className='mt-4 px-8 text-center text-sm text-muted-foreground'>
    //             By clicking login, you agree to our{' '}
    //             <a
    //               href='/terms'
    //               className='underline underline-offset-4 hover:text-primary'
    //             >
    //               Terms of Service
    //             </a>{' '}
    //             and{' '}
    //             <a
    //               href='/privacy'
    //               className='underline underline-offset-4 hover:text-primary'
    //             >
    //               Privacy Policy
    //             </a>
    //             .
    //           </p>
    //         </Card>
    //       </div>
    //     </div>
    //   </Layout.Body>
    // </Layout>
  )
}
