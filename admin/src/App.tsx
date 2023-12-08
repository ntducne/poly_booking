import { Route, Routes } from "react-router-dom";
import LayoutAdmin from "./layout/LayoutAdmin";
// import ListBooking from "./pages/Admin/Booking/List";
import Dashboard from "./pages/Admin/Dashboard";
import ListFeedBack from "./pages/Admin/Feedback/List";
import ListAdmin from "./pages/Admin/Guset/Admin/List";
import ListUser from "./pages/Admin/Guset/User/List";
import NotFound from "./pages/Admin/NotFound";
// import AddOffers from "./pages/Admin/Offers/Add";
// import EditOffers from "./pages/Admin/Offers/Edit";
// import ListOffers from "./pages/Admin/Offers/List";
import AddPolicy from "./pages/Admin/Policy/Add";
import EditPolicy from "./pages/Admin/Policy/Edit";
import ListPolicy from "./pages/Admin/Policy/List";
import AddReview from "./pages/Admin/Review/Add";
import EditReview from "./pages/Admin/Review/Edit";
import ListReview from "./pages/Admin/Review/List";
import AddRoom from "./pages/Admin/Room/Add";
import EditRoom from "./pages/Admin/Room/Edit";
import ListRoom from "./pages/Admin/Room/List";
import AddRoomExtend from "./pages/Admin/RoomExtend/Add";
import EditRoomExtend from "./pages/Admin/RoomExtend/Edit";
import ListRoomExtend from "./pages/Admin/RoomExtend/List";
import AddRoomType from "./pages/Admin/RoomType/Add";
import EditRoomType from "./pages/Admin/RoomType/Edit";
import ListRoomType from "./pages/Admin/RoomType/List";
import AddRoomUtilities from "./pages/Admin/RoomUtilities/Add";
import EditRoomUtilities from "./pages/Admin/RoomUtilities/Edit";
import ListRoomUtilities from "./pages/Admin/RoomUtilities/List";
import AddServices from "./pages/Admin/Services/Add";
import ListServices from "./pages/Admin/Services/List";
import LoginAdmin from "./pages/Auth/login";
import EditServices from "./pages/Admin/Services/Edit";
import ForgotPasswordAdmin from "./pages/Auth/forgot_password";
import Page403 from "./pages/403";
import RoomBooking from "./pages/Admin/Room/booking";
import Demo from "./pages/demo";
import ListContact from "./pages/Admin/Contact/List";
import ListNotifications from "./pages/Admin/Notifications/List";
import {
  AuthorizedListBillings,
  AuthorizedListBranches,
  AuthorizedListPolicies,
  AuthorizedListRates,
  AuthorizedListRooms,
  AuthorizedListServices,
  AuthorizedListStaffs,
  AuthorizedListTypes,
  AuthorizedListUsers,
  AuthorizedListUtilities,
  AuthorizedStoreBillings,
  AuthorizedStoreBranches,
  AuthorizedStorePolicies,
  AuthorizedStoreRooms,
  AuthorizedStoreServices,
  AuthorizedStoreTypes,
  AuthorizedStoreUtilities,
  AuthorizedUpdateBranches,
  AuthorizedUpdatePolicies,
  AuthorizedUpdateRooms,
  AuthorizedUpdateServices,
  AuthorizedUpdateStaffs,
  AuthorizedUpdateTypes,
  AuthorizedUpdateUsers,
  AuthorizedUpdateUtilities,
} from "./hoc/componentRole";
import { role } from "./hoc/withAuthorization";
function App() {
  return (
    <>
      <Routes>
        <Route path="login" element={<LoginAdmin />} />
        <Route path="forGotPassword" element={<ForgotPasswordAdmin />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<LayoutAdmin />}>
          <Route index element={<Dashboard />} />
          {/* <Route path="dashboard" element={<Dashboard />} /> */}
          <Route path="billing">
            <Route index element={<AuthorizedListBillings />} />
            <Route path=":id" element={<AuthorizedStoreBillings />} />
          </Route>
          {/* <Route path="offers">
            <Route index element={<ListOffers />} />
            <Route path="add" element={<AddOffers />} />
            <Route path="edit/:id" element={<EditOffers />} />
          </Route> */}
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
            {/* <Route path="renew">
              <Route index element={<ListRoomExtend />} />
              <Route path="add" element={<AddRoomExtend />} />
              <Route path="edit/:id" element={<EditRoomExtend />} />
            </Route> */}
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
          <Route path="staff">
            <Route index element={<AuthorizedListStaffs />} />
            <Route path="edit/:id" element={<AuthorizedUpdateStaffs />} />
          </Route>
          <Route path="user">
            <Route index element={<AuthorizedListUsers />} />
            <Route path="edit/:id" element={<AuthorizedUpdateUsers />} />
          </Route>
          {role === "super_admin" && (
            <Route path="branches">
              <Route index element={<AuthorizedListBranches />} />
              <Route path="add" element={<AuthorizedStoreBranches />} />
              <Route path="edit/:id" element={<AuthorizedUpdateBranches />} />
            </Route>
          )}  
        </Route>
        <Route path="/403" element={<Page403 />}></Route>
        <Route path="/demo" element={<Demo />}></Route>
      </Routes>
    </>
  );
}
export default App;
