import "./App.css";
import Navbar from "./components/Navbar";
import MiniNavbar from "./components/MiniNavbar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home";
import Products from "./components/Products";
import ProductDetail from "./components/ProductDetail";
import Orders from "./components/Orders";
import Auth from "./components/Auth";
import { useSelector } from "react-redux";
import MyProduct from "./components/MyProduct";
import MyProfile from "./components/MyProfile";
import ListSubCategory from "./components/ListSubCategory";
import Account from "./components/Account";
import SuccessPayment from "./components/SuccessPayment";
import Sales from "./components/Sales";
import MyOrders from "./components/MyOrders";
import CategoryAdmin from "./components/Admin/CategoryAdmin";
import CategoriesAdmin from "./components/Admin/CategoriesAdmin";
import TransactionsAdmin from "./components/Admin/TransactionsAdmin";
import ListUsersAdmin from "./components/Admin/ListUsersAdmin";
import Footer from "./components/Footer";

function App() {
  const { isAuthenticated,userData } = useSelector((state) => state.auth);
 
  return (
    <Router>
      <Navbar  />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/products/:id" element={<ProductDetail />} />
        <Route exact path="/categories/:id" element={<ListSubCategory />} />
        <Route exact path="/cart/view" element={<Orders />} />
        <Route exact path="/products/user/:id" element={<Products />} />
        <Route exact path="/products/category" element={<Products />} />
        <Route exact path="/products/search" element={<Products />} />
        <Route exact path="/success" element={<SuccessPayment />} />
        <Route exact path="/myOrders/:id" element={<MyOrders />} />
        <Route exact path="/seller/:id" element={<Sales />} />
        








        


        {isAuthenticated &&userData.role!=="ADMIN" && (
          <>
          <Route exact path="/auth" element={<Navigate to="/" replace />} />
          <Route exact path="/newProduct" element={<MyProduct />} />
          <Route exact path="/updateProduct/:id" element={<MyProduct />} />

          <Route exact path="/myProfile/:id" element={<MyProfile />} />
          <Route exact path="/account/:id" element={<Account />} />

          </>

        ) 
}


  {isAuthenticated && userData.role==="ADMIN" && 
  <>
            <Route exact path="/auth" element={<Navigate to="/" replace />} />
<Route exact path="/admin/category" element={<CategoryAdmin />} />
        <Route exact path="/admin/users" element={<ListUsersAdmin />} />
        <Route exact path="/admin/transations" element={<TransactionsAdmin />} />
        <Route exact path="/admin/categories" element={<CategoriesAdmin />} />
  </>
  }
  {(!isAuthenticated || userData.role!=="ADMIN") &&
    <>
    <Route exact path="/admin/category" element={<Navigate to="/" replace />} />
            <Route exact path="/admin/users" element={<Navigate to="/" replace />} />
            <Route exact path="/admin/transations" element={<Navigate to="/" replace />} />
            <Route exact path="/admin/categories" element={<Navigate to="/" replace />} />
      </>
  
  }
        
{!isAuthenticated && (
          <>
          <Route exact path="/auth" element={<Auth />} />
          <Route exact path="/newProduct" element={<Navigate to="/auth" replace />} />
          <Route exact path="/updateProduct/:id" element={<Navigate to="/auth" replace />} />

          <Route exact path="/myProfile/:id" element={<Navigate to="/auth" replace />} />
          <Route exact path="/account/:id" element={<Navigate to="/auth" replace />} />



          </>

        )}

      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
