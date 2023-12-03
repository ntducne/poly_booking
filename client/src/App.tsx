import { Route, Routes } from "react-router-dom";
import LayoutClient from "./layouts/Client";
import AboutPage from "./pages/AboutPage/about";
import ForgotPassword from "./pages/Auth/forgot_password";
import Login from "./pages/Auth/login";
import Register from "./pages/Auth/register";
import ResetPassword from "./pages/Auth/reset-passwork";
import Home from "./pages/Home";
import Detail from "./pages/Room/Detail";
import RoomBooked from "./pages/RoomBooked";
import Rooms from "./pages/Rooms";
import Contact from "./pages/contact";
import Demo from "./pages/demo";

import LayoutAuth from "./layouts/Auth";
import PaymentLayout from "./layouts/Payment";
import Edit from "./pages/InforUser/Edit";
// import PaymentView from "./pages/Payment";
import AccommodationBook from "./pages/Payment/accommodation";
import AccommodationReview from "./pages/Payment/accommodation/review";
import PaymentProcess from "./pages/Payment/process";
import PaymentStatus from "./pages/Payment/process/status";
import SearchOrder from "./pages/SearchOrder";
import LayoutClient2 from "./layouts/Layout2";
import DetailRoomBooked from "./pages/DetailRoomBooked";
import StatusPaymentVnpay from "./pages/Payment/status/vnpay";
import StatusPaymentMomo from "./pages/Payment/status/momo";
import StatusPaymentPaypal from "./pages/Payment/status/paypal";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LayoutClient />}>
          <Route index element={<Home />} />

          <Route path="contact" element={<Contact />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="search-order" element={<SearchOrder />} />
        </Route>
        <Route path="user" element={<LayoutClient2 />}>
          <Route path="room-booked" element={<RoomBooked />} />
          <Route path="profile" element={<Edit />} />
          <Route path="profile/roomBooked/:id" element={<DetailRoomBooked />} />
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
        </Route>
        <Route path="/accommodation" element={<PaymentLayout />}>
          <Route path="book" element={<AccommodationBook />} />
          <Route path="review" element={<AccommodationReview />} />
        </Route>
        <Route path="/payment" element={<PaymentLayout />}>
          {/* <Route index element={<PaymentView />} /> */}
          <Route path="process" element={<PaymentProcess />} />
          <Route path="status" element={<PaymentStatus />} />
          <Route path="status/vnpay" element={<StatusPaymentVnpay />} />
          <Route path="status/momo" element={<StatusPaymentMomo />} />
          <Route path="status/paypal" element={<StatusPaymentPaypal />} />
        </Route>
        <Route path="demo" element={<Demo />} />
      </Routes>
    </>
  );
}

export default App;
