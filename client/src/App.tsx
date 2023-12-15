import { Route, Routes } from "react-router-dom";
import LayoutClient from "./layouts/Client";
import AboutPage from "./pages/AboutPage/about";
import ForgotPassword from "./pages/Auth/forgot_password";
import Login from "./pages/Auth/login";
import Register from "./pages/Auth/register";
import ResetPassword from "./pages/Auth/reset-passwork";
import Home from "./pages/Home";
import Detail from "./pages/Room/Detail";
import Rooms from "./pages/Rooms";
import Contact from "./pages/contact";
import LayoutAuth from "./layouts/Auth";
import PaymentLayout from "./layouts/Payment";
import Edit from "./pages/InforUser/Edit";
import LayoutClient2 from "./layouts/Layout2";
import LayoutProfile from "./layouts/LayoutProfile";
import GoogleCallback from "./pages/Auth/googleCallback";
import AccommodationBook from "./pages/Payment/accommodation";
import AccommodationReview from "./pages/Payment/accommodation/review";
import PaymentProcess from "./pages/Payment/process";
import StatusPayment from "./pages/Payment/status";
import StatusPaymentMomo from "./pages/Payment/status/momo";
import StatusPaymentPaypal from "./pages/Payment/status/paypal";
import StatusPaymentVnpay from "./pages/Payment/status/vnpay";
import SearchOrder from "./pages/SearchOrder";
import NotFound from "./pages/Page404";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LayoutClient />}>
          <Route index element={<Home />} />
          <Route path="*" element={<NotFound />} />
          <Route path="contact" element={<Contact />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="search-order" element={<SearchOrder />} />
        </Route>
        <Route path="user" element={<LayoutProfile />}>
          <Route path="profile" element={<Edit />} />
        </Route>
        <Route path="/rooms" element={<LayoutClient2 />}>
          <Route index element={<Rooms />} />
          <Route path=":slug" element={<Detail />} />
        </Route>
        <Route path="/auth" element={<LayoutAuth />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forGotPassword" element={<ForgotPassword />} />
          <Route path="reset/:token" element={<ResetPassword />} />
          <Route path="social/callback" element={<GoogleCallback />} />
        </Route>
        <Route path="/accommodation" element={<PaymentLayout />}>
          <Route path="book" element={<AccommodationBook />} />
          <Route path="review" element={<AccommodationReview />} />
        </Route>
        <Route path="/payment" element={<PaymentLayout />}>
          <Route path="process" element={<PaymentProcess />} />
          <Route path="status" element={<StatusPayment />} />
          <Route path="status/vnpay" element={<StatusPaymentVnpay />} />
          <Route path="status/momo" element={<StatusPaymentMomo />} />
          <Route path="status/paypal" element={<StatusPaymentPaypal />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
