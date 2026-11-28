import Navbar from "./components/Home/Navbar/Navbar.jsx";
import Footer from "./components/Home/Footer/footer.jsx";
import Home from "./components/Home/user/Home.jsx";
import Signin from "./components/auth/Signin/Signin.jsx";
import Login from "./components/auth/Login/Login.jsx";
import Signout from "./components/auth/Signout/signout.jsx";
import DeleteAccount from "./components/auth/Delete/DeleteAccount.jsx";
import AdminHome from "./components/Home/admin/AdminHome.jsx";
import AddProduct from "./components/Home/admin/addProduct.jsx";
import Cart from "./components/Home/user/Cart.jsx";
import Order from "./components/Home/user/Order.jsx";
import { ToastContainer } from "react-toastify";
import OTPVerify from "./components/auth/OTPVerify/OTPVerify.jsx";
import Spinner from "./components/loaders/spinner.jsx";
import Profile from "./components/Home/user/Profile.jsx";
import { useEffect } from "react";
import api from "./lib/axios.js";
import { useDispatch } from "react-redux";
import {
  setCart,
  setLoading,
  setLogin,
  setProfile,
} from "./redux/slice/AuthSilce.js";
import { setCategories } from "./redux/slice/CategorySilce.js";
import { setProduct } from "./redux/slice/ProductSilce.js";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        dispatch(setLoading(true));

        let response;

        try {
          response = await api.get("/users/getCurrentUser");
        } catch (error) {
          if (error.response?.status === 401) {
            // Verify refresh token
            await api.get("/users/verifyUser");

            // Retry current user request
            response = await api.get("/users/getCurrentUser");
          } else {
            throw error;
          }
        }

        dispatch(setProfile(response?.data?.data));
        dispatch(setLogin(true));
      } catch (error) {
        dispatch(setProfile(null));
        dispatch(setLogin(false));
        console.error(error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    const fetchCategory = async () => {
      try {
        const response = await api.get("/users/getallCategory");
        dispatch(setCategories(response?.data?.data || []));
      } catch (error) {
        dispatch(setCategories([]));
        console.error(error);
      }
    };
    const fetchAllproduct = async () => {
      try {
        const response = await api.get("/users/getallproduct");
        dispatch(setProduct(response?.data?.data));
      } catch (error) {
        dispatch(setProduct([]));
        console.error(error);
      }
    };
    const fetchCart = async () => {
      try {
        const response = await api.get("/cart/getcart");
        console.log(response?.data?.data);
        
        dispatch(setCart(response?.data?.data || []));
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCart();
    fetchAllproduct();
    fetchCategory();
    fetchCurrentUser();
  }, []);

  return <>{/* <Profile/> */}</>;
}

export default App;
