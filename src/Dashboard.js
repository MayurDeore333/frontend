import React from 'react';
import SideBar from "./Sidebar/SideBar";
// import Items from "./pages/Items";
// import Sales from "./pages/Sales";
// import Purchase from "./pages/Purchase";
// import Profile from "./pages/Profile";
// import Cashbook from "./pages/Casbook";
// import Customers from "./pages/Customers";
// import Suppliers from "./pages/Suppliers";
// import EditProfile from "./pages/profile/EditProfile";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import EditProfile from './profile/EditProfile';
// import ProductSummary from '../components/product/productSummary/ProductSummary';
  //  import SideBar from '../Sidebar/SideBar';
 

const Dashboard = () => {
  return (
    <>
      {/* <SideBar/> */}
    {/* <Router>
      <SideBar>
    <Routes>
    <Route path="/edit-profile" element={<EditProfile/> }/>
     <Route path="/items" element={<Items/>} />
     <Route path="/sales" element={<Sales />} />
     <Route path="/purchase" element={<Purchase />} />
     <Route path="/cashbook" element={<Cashbook />} />
     <Route path="/customers" element={<Customers />} />
     <Route path="/suppliers" element={<Suppliers />} />
     <Route path="/Profile" element={<Profile />} />
     <Route path="*" element={<> not found</>} />
     </Routes>
     </SideBar>
     </Router> */}
    </>
  )
}

export default Dashboard
