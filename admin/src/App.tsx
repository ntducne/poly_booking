import { Route, Routes } from "react-router-dom";
import LayoutAdmin from "./layout/LayoutAdmin";
// import ListBooking from "./pages/Admin/Booking/List";
import Dashboard from "./pages/Admin/Dashboard";
import NotFound from "./pages/Admin/NotFound";
// import AddOffers from "./pages/Admin/Offers/Add";
// import EditOffers from "./pages/Admin/Offers/Edit";
// import ListOffers from "./pages/Admin/Offers/List";

import AddReview from "./pages/Admin/Review/Add";
import EditReview from "./pages/Admin/Review/Edit";
import ListReview from "./pages/Admin/Review/List";
import LoginAdmin from "./pages/Auth/login";
import ForgotPasswordAdmin from "./pages/Auth/forgot_password";
import Page403 from "./pages/403";
import RoomBooking from "./pages/Admin/Room/booking";
import ListContact from "./pages/Admin/Contact/List";
import ListNotifications from "./pages/Admin/Notifications/List";
import {
  AuthorizedListBillings,
  AuthorizedListPolicies,
  AuthorizedListRates,
  AuthorizedListRooms,
  AuthorizedListServices,
  AuthorizedListStaffs,
  AuthorizedListTypes,
  AuthorizedListUsers,
  AuthorizedListUtilities,
  AuthorizedStoreBillings,
  AuthorizedStorePolicies,
  AuthorizedStoreRooms,
  AuthorizedStoreServices,
  AuthorizedStoreStaffs,
  AuthorizedStoreTypes,
  AuthorizedStoreUtilities,
  AuthorizedUpdatePolicies,
  AuthorizedUpdateRooms,
  AuthorizedUpdateServices,
  AuthorizedUpdateStaffs,
  AuthorizedUpdateTypes,
  AuthorizedUpdateUsers,
  AuthorizedUpdateUtilities,
} from "./hoc/componentRole";
// import { role } from "./hoc/withAuthorization";
import Profile from "./pages/Admin/Profile";
import ListBranches from "./pages/Admin/Branches/List";
import AddBranche from "./pages/Admin/Branches/Add";
import EditBranche from "./pages/Admin/Branches/Edit";
import { useEffect, useState } from "react";
import { cookies } from "./config/cookies";
import ListAdmin from "./pages/Admin/Guset/Admin/List";
import AddAdmin from "./pages/Admin/Guset/Admin/Add";
import EditAdmin from "./pages/Admin/Guset/Admin/Edit";
import Welcome from "./pages/welcome";
import { useSelector } from "react-redux";

function App() {
  // useEffect(() => {
    //   const authUser = cookies().Get("AuthUser");
  //   if (authUser) {
  //     const parsed = JSON.parse(cookies().Get("AuthUser") as any);
  //     return setRole(parsed ? parsed[1].role : null);
  //   }
  // }, [role]);
  const role1 = useSelector((state: any) => state.role).role;
  const [role, setRole] = useState<any>(role1);
  useEffect(() => {
    setRole(role1);
  },[role1])
  console.log("role" , role);
  

  return (
    <>
      <Routes>
        <Route path="login" element={<LoginAdmin />} />
        <Route path="forGotPassword" element={<ForgotPasswordAdmin />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<LayoutAdmin />}>
          {role === "super_admin" && <Route index element={<Welcome />} />}
          {role !== "super_admin" && (
            <Route index element={<Dashboard />} />
          )}
          <Route path="profile" element={<Profile />} />
          <Route path="billing">
            <Route index element={<AuthorizedListBillings />} />
            <Route path=":id" element={<AuthorizedStoreBillings />} />
          </Route>
          <Route path="policy">
            <Route index element={<AuthorizedListPolicies />} />
            <Route path="add" element={<AuthorizedStorePolicies />} />
            <Route path="edit/:id" element={<AuthorizedUpdatePolicies />} />
          </Route>
          <Route path="review">
            <Route index element={<ListReview />} />
            <Route path="add" element={<AddReview />} />
            <Route path="edit/:id" element={<EditReview />} />
          </Route>
          <Route path="room">
            <Route index element={<AuthorizedListRooms />} />
            <Route path="add" element={<AuthorizedStoreRooms />} />
            <Route path="edit/:id" element={<AuthorizedUpdateRooms />} />
            <Route path="type">
              <Route index element={<AuthorizedListTypes />} />
              <Route path="add" element={<AuthorizedStoreTypes />} />
              <Route path="edit/:id" element={<AuthorizedUpdateTypes />} />
            </Route>
            <Route path="utilities">
              <Route index element={<AuthorizedListUtilities />} />
              <Route path="add" element={<AuthorizedStoreUtilities />} />
              <Route path="edit/:id" element={<AuthorizedUpdateUtilities />} />
            </Route>
            <Route path="booking" element={<RoomBooking />} />
          </Route>
          <Route path="services">
            <Route index element={<AuthorizedListServices />} />
            <Route path="add" element={<AuthorizedStoreServices />} />
            <Route path="edit/:id" element={<AuthorizedUpdateServices />} />
          </Route>
          <Route path="feedback">
            <Route index element={<AuthorizedListRates />} />
          </Route>
          <Route path="contact">
            <Route index element={<ListContact />} />
          </Route>
          <Route path="notifications">
            <Route index element={<ListNotifications />} />
          </Route>
          {role !== "super_admin" && (
            <Route path="staff">
              <Route index element={<AuthorizedListStaffs />} />
              <Route path="edit/:id" element={<AuthorizedUpdateStaffs />} />
              <Route path="add" element={<AuthorizedStoreStaffs />} />
            </Route>
          )}
          <Route path="user">
            <Route index element={<AuthorizedListUsers />} />
            <Route path="edit/:id" element={<AuthorizedUpdateUsers />} />
          </Route>
          {role === "super_admin" && (
            <Route path="branches">
              <Route index element={<ListBranches />} />
              <Route path="add" element={<AddBranche />} />
              <Route path="edit/:id" element={<EditBranche />} />
            </Route>
          )}
          {role === "super_admin" && (
            <Route path="staff">
              <Route index element={<ListAdmin />} />
              <Route path="edit/:id" element={<EditAdmin />} />
              <Route path="add" element={<AddAdmin />} />
            </Route>
          )}
        </Route>
        <Route path="/403" element={<Page403 />}></Route>
      </Routes>
    </>
  );
}
export default App;
