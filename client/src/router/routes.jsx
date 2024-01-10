import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import ErrorElement from "../pages/errorElement/ErrorElement";
import Home from "../pages/home/Home";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root/>,
        errorElement: <ErrorPage />,
        children:[
            {
                path: "/",
                element: <Home/>
            },
        ]
    }
])

export default router