import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const useAuth = () => {
 return useContext(AuthContext);
};

export function AuthProvider({ children }) {
 const [user, setUser] = useState(null);
 const [loading, setLoading] = useState(true);

 const signup = async ( profile_img, user_name, user_telephone, user_email, user_password) => {
    const response = await fetch('http://localhost:6700/cerberus/auth/register', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({  profile_img, user_name, user_telephone, user_email, user_password}),
    });
    const data = await response.json();
    setUser(data.user);
 };

 const logout = async () => {
    const response = await fetch('http://localhost:6700/cerberus/auth/logout', { method: "POST" });
    const data = await response.json();
    setUser(null);
 };

 const login = async (user_email, user_password) => {
  const response = await fetch('http://localhost:6700/cerberus/auth/login', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_email, user_password }),
  });

  let token; 
  
  if (response.ok) {
    const token = await response.json();
    document.cookie = `token= ${token}; path=/`;
    console.log(document.cookie)
    
  } else {
    throw new Error(`Failed to authenticate: ${response.status}`);
  }

 return token
};



 useEffect(() => {
    const getUser = async () => {
      const response = await fetch('http://localhost:6700/cerberus/users');
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