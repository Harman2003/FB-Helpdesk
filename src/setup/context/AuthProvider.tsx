import React, { createContext, useState, ReactNode, useCallback } from "react";

export interface AuthInterface {
  name: string;
  email: string;
  page_id: string;
  accessToken: string;
  picture: string;
}
export interface AuthContextProps {
  auth: AuthInterface;
  setAuth: (auth: AuthInterface)=>void
}

export const AuthContext = createContext<AuthContextProps>({
  auth: {
    name: "",
    email: "",
    page_id: "",
    accessToken: "",
    picture: "",
  },
  setAuth: () => {},
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const storedAuthDetails = localStorage.getItem("auth");
  const prevAuthDetails = storedAuthDetails
    ? JSON.parse(storedAuthDetails)
    : null;

  const [auth, setAuth_] = useState<AuthInterface>(prevAuthDetails);
  const setAuth = useCallback((auth: AuthInterface) => {
    setAuth_(auth);
    localStorage.setItem("auth", JSON.stringify(auth));
  },[])

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
