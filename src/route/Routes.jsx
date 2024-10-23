import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Navigate
} from "react-router-dom";

import Signup from "../pages/Register.jsx";
import Home from "../pages/Home.jsx";
import Layout from "../Layout.jsx";
import SearchPage from "../pages/Search.jsx";
import Login from "../pages/Login.jsx";
import AuthPage from "../pages/auth/AuthPage.jsx";
import Forgotpassword from "../pages/ForgotPassword.jsx";
import AddProduct from "../pages/admin/AddProduct.jsx";
import ProductData from "../pages/ProductData.jsx";
import Profile from "../pages/Profile.jsx";
import CatgeoryAdd from "../pages/admin/AddCategory.jsx";
import NotFound from "../pages/NotFound.jsx";
import Wishlist from "../pages/Wishlist.jsx";
import Cart from "../pages/Cart.jsx";
import EditProduct from "../pages/admin/EditProduct.jsx";
import BannerUpload from "../pages/admin/AddBanner.jsx";
import CategoryPage from "../pages/Category.jsx";
import PrivateRoutes from "./PrivateRoutes.jsx";
import AdminRoutes from "./AdminRoutes.jsx";
import Address from "../pages/Address.jsx";
import PublicRoute from "./PublicRoutes.jsx";
import VerifyOrder from "../pages/VerifyOrder.jsx";
import MyOrders from "../pages/MyOrders.jsx";

function Routes() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/men" />} />
        <Route path="/men" element={<Home />} />
        <Route path="/women" element={<Home />} />
        <Route path="/kids" element={<Home />} />
        <Route element={<PublicRoute />}>
          <Route path="/" element={<AuthPage />}>
            <Route path="/register" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Route>
        </Route>

        <Route path="/cart" element={<Cart />} />
        <Route path="/mywishlist" element={<Wishlist />} />
        <Route path="/product/:id" element={<ProductData />} />
        <Route path="/:Pcategory/:category" element={<CategoryPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/login/forgotpassword" element={<Forgotpassword />} />

        <Route element={<PrivateRoutes />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile-address" element={<Address />} />
          <Route path="/verify" element={<VerifyOrder />} />
          <Route path="/myOrders" element={<MyOrders/>}/>
          <Route element={<AdminRoutes />}>
            <Route path="/edit-product/:id" element={<EditProduct />} />
            <Route path="/add-category" element={<CatgeoryAdd />} />
            <Route path="/add-banner" element={<BannerUpload />} />
            <Route path="/add-product" element={<AddProduct />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default Routes;
