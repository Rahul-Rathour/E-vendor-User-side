import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  RouterProvider,
  Outlet,
  createRoutesFromElements,
  Route,
  ScrollRestoration,
  createBrowserRouter,
} from "react-router-dom";
import Footer from "./components/home/Footer/Footer";
import FooterBottom from "./components/home/Footer/FooterBottom";
import Header from "./components/home/Header/Header";
import HeaderBottom from "./components/home/Header/HeaderBottom";
import SpecialCase from "./components/SpecialCase/SpecialCase";
import About from "./pages/About/About";
import Mens from "./pages/Category/Mens";
import Fashion from "./pages/Category/Fashion";
import Kids from "./pages/Category/Kids";
import Toys from "./pages/Category/Toys";
import SignIn from "./pages/Account/SignIn";
import SignUp from "./pages/Account/SignUp";
import Cart from "./pages/Cart/Cart";
import Contact from "./pages/Contact/Contact";
import Home from "./pages/Home/Home";
import Journal from "./pages/Journal/Journal";
import Offer from "./pages/Offer/Offer";
import Payment from "./pages/payment/Payment";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Shop from "./pages/Shop/Shop";
import Login from "./pages/Account/Login";
import Wishlist from "./pages/Cart/Wishlist";
import Myprofile from "./pages/Account/Myprofile";
import ManageAddress from "./pages/Account/ManageAddress";
import AccountLayout from "./pages/Account/AccountLayout";
import Myorder from "./pages/Account/Myorder";
import Review from "./pages/Account/Review";
import BottomNav from "./components/home/BottomNav/BottomNav";
import MobileAccount from "./pages/MobileAccountPage/MobileAccount";
import Logout from "./pages/Account/Logout";
import ProductFilter from "./components/home/Header/ProductFilter";
import CategoryProducts from "./components/CategoryProducts";
import SubcategoryProducts from "./components/SubcategoryProducts";
import { CartProvider } from "./context/CartContext";
import CheckoutPage from "./pages/checkout/CheckoutPage";
import OrderSuccess from "./pages/checkout/OrderSuccess";
import SearchResults from "./pages/SearchResults/SearchResults";
import RazorpayPayment from "./pages/RazorPayPage/RazorpayPayment";
import OrderDetails from "./pages/OrderDetails/OrderDetails";
import PaymentFailed from "./pages/checkout/PaymentFailed";




const Layout = () => {
  return (
    <div>
      <Header />
      <HeaderBottom />
      <SpecialCase />
      <ScrollRestoration />

      <Outlet />
      <Footer />
      <FooterBottom />
      <BottomNav />
    </div>
  );
};
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Layout />}>
        {/* ==================== Header Navlink Start here =================== */}
        <Route index element={<Home />}></Route>
        <Route path="/shop" element={<Shop />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/journal" element={<Journal />}></Route>
        <Route path="/mens" element={<Mens />}></Route>
        <Route path="/fashion" element={<Fashion />}></Route>
        <Route path="/kids" element={<Kids />}></Route>
        <Route path="/toys" element={<Toys />}></Route>
        <Route path="/productFilte" element={<ProductFilter />}></Route>
        {/* ==================== Header Navlink End here ===================== */}
        <Route path="/offer" element={<Offer />}></Route>
        <Route path="/product/:id" element={<ProductDetails />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/wishlist" element={<Wishlist />}></Route>
        <Route path="/paymentgateway" element={<Payment />}></Route>
        <Route path="/profile" element={<Myprofile />} />
        <Route path="/addresses" element={<ManageAddress />} />
        <Route path="/category/:id" element={<CategoryProducts />} />
        <Route path="/subcategory/:id" element={<SubcategoryProducts />} />
        <Route path="/search" element={<SearchResults />} />
      </Route>
      <Route path="/signup" element={<SignUp />}></Route>
      <Route path="/signin" element={<SignIn />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/order" element={<Myorder />} />
      <Route path="/order-details/:id" element={<OrderDetails />} />
      <Route path="/mobile-account" element={<MobileAccount />} />
      <Route path="/review" element={<Review />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/orderSuccess" element={<OrderSuccess />} />
      <Route path="/paymentFailed" element={<PaymentFailed/>}/>
      <Route path="/razorpay" element={<RazorpayPayment />} />





      <Route path="/account" element={<AccountLayout />}>
        <Route index element={<Myprofile />} />
        <Route path="profile" element={<Myprofile />} />
        <Route path="addresses" element={<ManageAddress />} />
        <Route path="order" element={<Myorder />} />
        <Route path="review" element={<Review />} />
      </Route>

    </Route>

  )
);

function App() {
  return (
    <CartProvider>
      <div className="font-bodyFont">
        <RouterProvider router={router} />
        {/* Toast container required for toasts to display */}
        <ToastContainer position="top-right" autoClose={2000} />
      </div>
    </CartProvider>
  );
}

export default App; 
