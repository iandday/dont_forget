import { createContext, ReactNode } from 'react'
import useSecureStorage from '../hooks/use-local-storage'

type Props = {
  children?: ReactNode
}

interface AuthContextUser {
  firstName: string
  lastName: string
  email: string
  token: string
  refreshToken: string
}

interface IAuthContext {
  //authenticated: boolean;
  user: AuthContextUser | null
  login: ({
    firstName,
    lastName,
    email,
    token,
    refreshToken,
  }: AuthContextUser) => void
  logout: () => void
}

const initialUser = {
  firstName: '',
  lastName: '',
  email: '',
  token: '',
  refreshToken: '',
}

const initialValue = {
  //authenticated: false,
  user: initialUser,
  login: ({
    firstName,
    lastName,
    email,
    token,
    refreshToken,
  }: AuthContextUser) => {},
  logout: () => {},
}

const AuthContext = createContext<IAuthContext>(initialValue)

const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useSecureStorage<AuthContextUser | null>('user', '')

  const login = ({
    firstName,
    lastName,
    email,
    token,
    refreshToken,
  }: AuthContextUser) => {
    setUser({
      firstName: firstName,
      lastName: lastName,
      email: email,
      token: token,
      refreshToken: refreshToken,
    })
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
