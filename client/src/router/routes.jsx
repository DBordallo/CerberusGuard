import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import ErrorElement from "../pages/errorElement/ErrorElement";
import { ProtectedRoute } from "../authcontext/ProtectedRoute";
import Login from "../pages/login/Login"
import Register from "../pages/register/Register";
import NewPassword from "../pages/newPassword/NewPassword";
import UserHome from "../pages/user/userHome/UserHome";
import HomeCerberus from "../pages/cerberusGuard/homeCerberus/HomeCerberus";
import Profile from "../pages/profile/Profile"
import MiComponente from "../authcontext/AuthComponent";

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
                path: "/home/:id",
                element: (
                    <ProtectedRoute>
                        <UserHome />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/profile",
                element: /*(
                <ProtectedRoute>*/
                    <Profile />
                // </ProtectedRoute>),
            },
            {
                path: "/addaccount",
                element: //(
                 //<ProtectedRoute>
                    <NewPassword />
                //{ </ProtectedRoute>), }
            },


            //ADMIN

            {
                path: "/guard",
                element:(
                <MiComponente/>
                ),
            },
        ]
    }
])

export default router