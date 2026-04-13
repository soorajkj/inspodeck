"use client";

import { createContext, PropsWithChildren } from "react";
import { User } from "@/types/response";

export const AuthContext = createContext<{
  user: User;
  authenticated: boolean;
}>({ user: null, authenticated: false });

interface AuthProviderProps extends PropsWithChildren {
  user: User;
}

export function AuthProvider({ user, children }: AuthProviderProps) {
  return (
    <AuthContext.Provider value={{ user, authenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}
