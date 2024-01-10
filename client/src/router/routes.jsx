import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import ErrorElement from "../pages/errorElement/ErrorElement";
import { ProtectedRoute } from "../authcontext/ProtectedRoute";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login"
import Register from "../pages/register/Register";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root/>,
        errorElement: <ErrorElement />,
        children:[
            {
                path: "/",
                element: <Login/>
            },
            {
                path: "/register",
                element: <Register />,
              },
              {
                path: "/home",
                element: (
                    <ProtectedRoute> 
                        <Home />
                    </ProtectedRoute>
                
                ),
              },
        ]
    }
])

export default router