import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { Navigate } from "react-router-dom";
// import InvoiceListScreen from "./pages/invoices/InvoiceListScreen";
// import InvoiceDetailScreen from "./pages/invoices/InvoiceDetailScreen";
// import useInitApp from "./hook/useInitApp";
// import InvoiceSettingModal from "./components/Invoice/InvoiceSettingModal";
// import InvoiceConfirmModal from "./components/Invoice/InvoiceConfirmModal";
// import InvoiceDeleteConfirm from "./components/Invoice/InvoiceDeleteConfirm";
// import PageLoading from "./components/Common/PageLoading";
import SideBar from "./Sidebar/SideBar";
import Items from "./pages/Items";
import Sales from "./pages/Sales";
import Purchase from "./pages/Purchase";
import Profile from "./pages/Profile";
import Cashbook from "./pages/Casbook";
import Customers from "./pages/Customers";
import Suppliers from "./pages/Suppliers";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Forgot from "./pages/auth/Forgot";
import Reset from "./pages/auth/Reset";
//  import Dashboard from "./pages/Dashboard";
import AddProduct from "./pages/addProduct/AddProduct";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getLoginStatus } from "./services/authService";
import { useDispatch } from "react-redux";
import { SET_LOGIN } from "./redux/features/auth/authSlice";
import { useEffect } from "react";
import ProductDetail from "./components/product/productDetail/ProductDetail";
import Dashboard from "./Dashboard";
import EditProfile from "./pages/profile/EditProfile";
import EditProduct from "./pages/editProduct/EditProduct";
import AddSaleForm from "./pages/AddSaleForm";
import ProductSal from "./pages/ProductSal";




axios.defaults.withCredentials = true;

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function loginStatus() {
      const status = await getLoginStatus();
      dispatch(SET_LOGIN(status));
    }
    loginStatus();
  }, [dispatch]);
  return (
    <>
      <Router>
        <ToastContainer />
        <SideBar>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot" element={<Forgot />} />
            <Route path="/resetpassword/:resetToken" element={<Reset />} />
            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="/addProduct" element={<AddProduct />} />
            <Route path="/product-detail/:id" element={<ProductDetail />} />
            <Route path="/edit-product/:id" element={<EditProduct />} />
            <Route path="/edit-profile" element={<EditProfile />} />
            <Route path="/addSale-form/:id" element={<AddSaleForm/>} />
            <Route path="/product-Sale/:id" element={<ProductSal/>} />
            
            <Route path="/items" element={<Items />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/purchase" element={<Purchase />} />
            <Route path="/cashbook" element={<Cashbook />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/suppliers" element={<Suppliers />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="*" element={<> not found</>} />
          </Routes>
        </SideBar>
      </Router>
    </>
  );
}

export default App;
