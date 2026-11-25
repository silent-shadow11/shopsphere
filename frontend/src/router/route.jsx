import { createBrowserRouter, Router } from "react-router-dom";
import Layout from "../Layout";
import Home from "../components/Home/user/Home";
import Login from "../components/auth/Login/Login";
import Signin from "../components/auth/Signin/Signin.jsx";
import Signout from "../components/auth/Signout/signout.jsx";
import Profile from "../components/Home/user/Profile.jsx";
import Shop from "../components/features/shop.jsx";
import AdminHome from "../components/Home/admin/AdminHome.jsx";
import Order from "../components/Home/user/Order.jsx";
import Adress from "../components/Home/user/Adress.jsx";
import Cart from "../components/Home/user/Cart.jsx";
import AddProduct from "../components/Home/admin/addProduct.jsx";

const router=createBrowserRouter([
    {
        path:"/",
        element:<Layout/>,
        children:[
            {
                index:true,
                element:<Home/>
            },
            {
                path:"/login",
                element:<Login/>
            },
            {
                path:"/signin",
                element:<Signin/>
            },
            {
                path:"/signout",
                element:<Signout/>
            },
            {
                path:"/profile",
                element:<Profile/>
            },
            {
                path:"/shop",
                element:<Shop/>
            },
            {
                path:"/myorder",
                element:<Order/>
            },
            {
                path:"/savedAdress",
                element:<Adress/>
            },
            {
                path:"/bag",
                element:<Cart/>
            },
            {
                path:"/admin",
                element:<AdminHome/>
            },
            {
                path:"/addToProduct",
                element:<AddProduct/>
            }
        ]
    }
])

export default router
