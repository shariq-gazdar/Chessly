"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { Auth } from "firebase/auth";
type AuthContextType = {
  user: Auth | null;
  setUser: (v: Auth | null) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function UserContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Auth | null>(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuthContext must be used within UserContextProvider");
  return context;
}
