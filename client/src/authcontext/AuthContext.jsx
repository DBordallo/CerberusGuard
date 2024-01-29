import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const useAuth = () => {
 return useContext(AuthContext);
};

export function AuthProvider({ children }) {
 const [user, setUser] = useState(null);
 const [loading, setLoading] = useState(true);

 const signup = async (profileImage, fullName, email, phone, password) => {
    const response = await fetch('http://localhost:6700/cerberus/auth/register', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({profileImage, fullName, email, phone, password, }),
    });
    const data = await response.json();
    setUser(data.user);
 };

 const logout = async () => {
    const response = await fetch('http://localhost:6700/cerberus/auth/logout', { method: "POST" });
    const data = await response.json();
    setUser(null);
 };

 const login = async (email, password) => {
    const response = await fetch('http://localhost:6700/cerberus/auth/login', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    setUser(data.user);
 };


 useEffect(() => {
    const getUser = async () => {
      const response = await fetch('http://localhost:6700/cerberus/cerberus/users');
      const data = await response.json();
      setUser(data.user);
      setLoading(false);
    };
    getUser();
 }, []);

 return (
    <AuthContext.Provider
      value={{ signup, login, user, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
 );
}