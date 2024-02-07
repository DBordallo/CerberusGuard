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
       const errorResponse = await response.json();
       throw new Error(`Failed to register: ${errorResponse.error}`);
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

     document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

     //const data = await response.json();
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
     (document.cookie);
     ("Received token:", receivedToken);
     return receivedToken;
  } catch (error) {
     console.error(error);
     throw new Error("Failed to authenticate");
  }
 
};

  
const isUserAdmin = async () => {
   try {
     const cookieString = document.cookie;
     ('Cookie String:', cookieString);
 
     const token = cookieString
       .split('; ')
       .map(cookie => {
         const trimmedCookie = cookie.trim();
         if (trimmedCookie.startsWith('token=')) {
            const tokenValue = trimmedCookie.substring('token='.length);
            ('Token Value:', tokenValue);
            return tokenValue;
          }
         return '';
       })
       .filter(Boolean)
       .join('; ');
 
     ('Extracted Token:', token);
     ('All Cookies:', document.cookie);
 
     const response = await fetch('http://localhost:6700/cerberus/users/role', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
         'Authorization': `${token}`,
       },
       body: JSON.stringify({ token: token }),
     });
 
     ('Request Payload:', JSON.stringify({ token: token }));
     ('Request Headers:', {
       'Content-Type': 'application/json',
       'Authorization': `${token}`,
     });
 
     if (response.ok) {
       const data = await response.json();
       (data);
       return data;
     } else {
       console.error('Error details:', response.statusText);
       throw new Error(`Failed to fetch user data: ${response.status}`);
     }
   } catch (error) {
     console.error("Error in isUserAdmin:", error);
     return false;
   }
 }
 
 

  


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
     }
  };

  getUser();
}, []);

 return (
  <AuthContext.Provider
  value={{ signup, login, user, logout, loading, isUserAdmin }}>
  {children}
</AuthContext.Provider>
 );
}