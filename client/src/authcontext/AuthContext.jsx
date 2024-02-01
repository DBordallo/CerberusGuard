import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const useAuth = () => {
 return useContext(AuthContext);
};

export function AuthProvider({ children }) {
 const [user, setUser] = useState(null);
 const [loading, setLoading] = useState(true);

 const signup = async (profile_img, user_name, user_telephone, user_email, user_password) => {
  try {
     const response = await fetch('http://localhost:6700/cerberus/auth/register', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profile_img, user_name, user_telephone, user_email, user_password }),
     });

     if (!response.ok) {
        throw new Error(`Failed to register: ${response.status}`);
     }

     const data = await response.json();
     setUser(data.user);
  } catch (error) {
     console.error(error);
     throw new Error("Failed to register");
  }
};

const logout = async () => {
  try {
     const response = await fetch('http://localhost:6700/cerberus/auth/logout', { method: "POST" });

     if (!response.ok) {
        throw new Error(`Failed to logout: ${response.status}`);
     }

     const data = await response.json();
     setUser(null);
  } catch (error) {
     console.error(error);
     throw new Error("Failed to logout");
  }
};

const login = async (user_email, user_password) => {
  try {
     const response = await fetch('http://localhost:6700/cerberus/auth/login', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_email, user_password }),
     });

     if (!response.ok) {
        throw new Error(`Failed to authenticate: ${response.status}`);
     }

     const { token: receivedToken } = await response.json();
     document.cookie = `token=${receivedToken}; path=/`;
     console.log(document.cookie);
     console.log("Received token:", receivedToken);
     return receivedToken;
  } catch (error) {
     console.error(error);
     throw new Error("Failed to authenticate");
  }
 
};

  




useEffect(() => {
  const getUser = async () => {
     try {
        const response = await fetch('http://localhost:6700/cerberus/users');

        if (!response.ok) {
           throw new Error(`Failed to fetch user data: ${response.status}`);
        }

        const data = await response.json();
        setUser(data.user);
        setLoading(false);
     } catch (error) {
        console.error(error);
        // Puedes decidir si quieres lanzar una excepción o manejar el error de otra manera
     }
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