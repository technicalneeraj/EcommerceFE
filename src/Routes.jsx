import Signup from "./pages/SignUp.jsx";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import OtpPage from "./pages/OtpPage.jsx";
import Home from "./pages/Home.jsx";
import Layout from "./Layout.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import Login from "./pages/Login.jsx";
import HomeSign from "./pages/HomeSign.jsx";
import Forgotpassword from "./pages/ForgotPassword.jsx";
import UserData from "./pages/UserData.jsx";
import AddProduct from "./pages/AddProduct.jsx";
import ProductData from "./pages/ProductData.jsx";
import { Navigate } from "react-router-dom";
import Profile from "./pages/Profile.jsx";
import CatgeoryAdd from "./pages/CatgeoryAdd.jsx";
import NotFound from "./pages/NotFound.jsx";
import Wishlist from "./pages/Wishlist.jsx";
import Cart from "./pages/Cart.jsx";
import EditProduct from "./pages/EditProduct.jsx";
import BannerUpload from "./pages/BannerUpload.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import PrivateRoutes from "./PrivateRoutes.jsx";
import AdminRoutes from "./AdminRoutes.jsx";
import Address from "./pages/Address.jsx";
import PublicRoute from "./PublicRoutes.jsx";

function Routes() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/men" />} />
        <Route path="/men" element={<Home />} />
        <Route path="/women" element={<Home />} />
        <Route path="/kids" element={<Home />} />
        <Route element={<PublicRoute />}>
          <Route path="/" element={<HomeSign />}>
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
          <Route element={<AdminRoutes />}>
            <Route path="/edit-product/:id" element={<EditProduct />} />
            <Route path="/userdata" element={<UserData />} />
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
