import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();
const initialAuth = null;

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(initialAuth);

  useEffect(() => {
    let tokenValue = JSON.parse(localStorage.getItem("_token")) || null;
    setAuth(tokenValue);
  }, []);

  const handleAuth = (value) => {
    setAuth(value);
    if (!value) {
      localStorage.removeItem("_token");
      localStorage.removeItem("favPokemones");
    }
  };

  const data = { auth, handleAuth };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export { AuthProvider };
export default AuthContext;
