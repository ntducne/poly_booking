import BillDetail from "../pages/Admin/Bill/Detail";
import BillList from "../pages/Admin/Bill/List";
import AddBranche from "../pages/Admin/Branches/Add";
import EditBranche from "../pages/Admin/Branches/Edit";
import ListBranches from "../pages/Admin/Branches/List";
import ListFeedback from "../pages/Admin/Feedback/List";
import EditUser from "../pages/Admin/Guset/User/Edit";
import ListUser from "../pages/Admin/Guset/User/List";
import AddPolicy from "../pages/Admin/Policy/Add";
import EditPolicy from "../pages/Admin/Policy/Edit";
import ListPolicy from "../pages/Admin/Policy/List";
import AddRoom from "../pages/Admin/Room/Add";
import EditRoom from "../pages/Admin/Room/Edit";
import ListRoom from "../pages/Admin/Room/List";
import EditRoomExtend from "../pages/Admin/RoomExtend/Edit";
import AddRoomType from "../pages/Admin/RoomType/Add";
import EditRoomType from "../pages/Admin/RoomType/Edit";
import ListRoomType from "../pages/Admin/RoomType/List";
import AddRoomUtilities from "../pages/Admin/RoomUtilities/Add";
import ListRoomUtilities from "../pages/Admin/RoomUtilities/List";
import AddServices from "../pages/Admin/Services/Add";
import EditServices from "../pages/Admin/Services/Edit";
import ListServices from "../pages/Admin/Services/List";
import withAuthorization from "./withAuthorization";

const AuthorizedListBranches = withAuthorization(ListBranches, 'admin.branches.index');
const AuthorizedStoreBranches = withAuthorization(AddBranche, 'admin.branches.store');
const AuthorizedUpdateBranches = withAuthorization(EditBranche, 'admin.branches.update');

const AuthorizedListTypes = withAuthorization(ListRoomType, 'admin.types.index');
const AuthorizedStoreTypes = withAuthorization(AddRoomType, 'admin.types.store');
const AuthorizedUpdateTypes = withAuthorization(EditRoomType, 'admin.types.update');

const AuthorizedListUtilities = withAuthorization(ListRoomUtilities, 'admin.utilities.index');
const AuthorizedStoreUtilities = withAuthorization(AddRoomUtilities, 'admin.utilities.store');
const AuthorizedUpdateUtilities = withAuthorization(EditRoomExtend, 'admin.utilities.update');

const AuthorizedListRooms = withAuthorization(ListRoom, 'admin.rooms.index');
const AuthorizedStoreRooms = withAuthorization(AddRoom, 'admin.rooms.store');
const AuthorizedUpdateRooms = withAuthorization(EditRoom, 'admin.rooms.update');

const AuthorizedListUsers = withAuthorization(ListUser, 'admin.users.index');
// const AuthorizedStoreUsers = withAuthorization(AddBranche, 'admin.users.store');
const AuthorizedUpdateUsers = withAuthorization(EditUser, 'admin.users.update');

const AuthorizedListStaffs = withAuthorization(ListUser, 'admin.staffs.index');
// const AuthorizedStoreStaffs = withAuthorization(AddBranche, 'admin.staffs.store');
const AuthorizedUpdateStaffs = withAuthorization(EditUser, 'admin.staffs.update');

const AuthorizedListRates = withAuthorization(ListFeedback, 'admin.rates.index');
// const AuthorizedStoreRates = withAuthorization(AddBranche, 'admin.rates.store');
// const AuthorizedUpdateRates = withAuthorization(AddBranche, 'admin.rates.update');

const AuthorizedListPolicies = withAuthorization(ListPolicy, 'admin.policies.index');
const AuthorizedStorePolicies = withAuthorization(AddPolicy, 'admin.policies.store');
const AuthorizedUpdatePolicies = withAuthorization(EditPolicy, 'admin.policies.update');

const AuthorizedListServices = withAuthorization(ListServices, 'admin.services.index');
const AuthorizedStoreServices = withAuthorization(AddServices, 'admin.services.store');
const AuthorizedUpdateServices = withAuthorization(EditServices, 'admin.services.update');

const AuthorizedListBillings = withAuthorization(BillList, 'admin.billings.index');
const AuthorizedStoreBillings = withAuthorization(BillDetail, 'admin.billings.show');


export {
    AuthorizedListBranches,
    AuthorizedStoreBranches,
    AuthorizedUpdateBranches,
    AuthorizedListTypes,
    AuthorizedStoreTypes,
    AuthorizedUpdateTypes,
    AuthorizedListUtilities,
    AuthorizedStoreUtilities,
    AuthorizedUpdateUtilities,
    AuthorizedListRooms,
    AuthorizedStoreRooms,
    AuthorizedUpdateRooms,
    AuthorizedListUsers,
    AuthorizedUpdateUsers,
    AuthorizedListStaffs,
    AuthorizedUpdateStaffs,
    AuthorizedListRates,
    AuthorizedListPolicies,
    AuthorizedStorePolicies,
    AuthorizedUpdatePolicies,
    AuthorizedListServices,
    AuthorizedStoreServices,
    AuthorizedUpdateServices,
    AuthorizedListBillings,
    AuthorizedStoreBillings,

    

}
