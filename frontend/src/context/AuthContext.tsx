import { createContext, useState } from "react";

// Define the authentication context
// interface AuthContextType {
//   isAuthenticated: boolean;
//   login: () => void;
//   logout: () => void;
// }

// const AuthContext = createContext<AuthContextType | null>(null);

// // Authentication provider component
// const AuthProvider: React.FC = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   const login = () => {
//     // Perform login logic here (e.g., API call)
//     setIsAuthenticated(true);
//   };

//   const logout = () => {
//     // Perform logout logic here
//     setIsAuthenticated(false);
//   };

//   return <AuthContext.Provider value={{ isAuthenticated, login, logout }}>{children}</AuthContext.Provider>;
// };

// export { AuthContext, AuthProvider };
type Props = {
  children?: ReactNode;
};

type IAuthContext = {
  authenticated: boolean;
  //setAuthenticated: (newState: boolean) => void;
  login: () => void;
  logout: () => void;
};

const initialValue = {
  authenticated: false,
  setAuthenticated: () => {},
  login: () => {},
  logout: () => {},
};

const AuthContext = createContext<IAuthContext>(initialValue);

const AuthProvider = ({ children }: Props) => {
  //Initializing an auth state with false value (unauthenticated)
  const [authenticated, setAuthenticated] = useState(initialValue.authenticated);

  // const navigate = useNavigate();
  const login = () => {
    // Perform login logic here (e.g., API call)
    setAuthenticated(true);
  };

  const logout = () => {
    // Perform logout logic here
    setAuthenticated(false);
  };

  return <AuthContext.Provider value={{ authenticated, login, logout }}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
