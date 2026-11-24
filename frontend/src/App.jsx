import Navbar from './components/Home/Navbar/Navbar.jsx'
import Footer from './components/Home/Footer/footer.jsx'
import Home from './components/Home/user/Home.jsx'
import Signin from './components/auth/Signin/Signin.jsx'
import Login from './components/auth/Login/Login.jsx'
import Signout from './components/auth/Signout/signout.jsx'
import DeleteAccount from './components/auth/Delete/DeleteAccount.jsx'
import AdminHome from './components/Home/admin/AdminHome.jsx'
import AddProduct from './components/Home/admin/addProduct.jsx'
import Cart from './components/Home/user/Cart.jsx'
import Order from './components/Home/user/Order.jsx'
import { ToastContainer } from "react-toastify";
import OTPVerify from './components/auth/OTPVerify/OTPVerify.jsx'

function App() {
  return (
    <>
    <ToastContainer/>
    <Signin/>
    <OTPVerify/>
    </>
  )
}

export default App
