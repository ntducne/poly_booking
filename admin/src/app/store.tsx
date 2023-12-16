
import { Action, ThunkAction, combineReducers, configureStore } from '@reduxjs/toolkit';

import {
    FLUSH,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    REHYDRATE,
    persistReducer,
    persistStore,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authApi, { authReducer } from '../api/auth';
import userSlicer from '../Slices/Auth'
import { usersApi } from '../api/account/users';
import { staffsApi } from '../api/account/staffs';
import roomApi from '../api/room';
import roomTypesApi from '../api/roomTypes';
import branchApi from '../api/branches';
import serviceApi from '../api/services';
import bookingApi from '../api/booking';
import promotionsApi from '../api/promotions';
import billingApi from '../api/billings';
import ratesApi from '../api/rate';
import permissonApi from '../api/permission';
import policyApi from '../api/policy';
import utilitiesApi from '../api/utilities';
import statisticalsApi from '../api/statisticals';
import contactApi from '../api/contact';
import notificationsApi from '../api/notifications';
'../api/account/staffs';
import { adminsApi } from '../api/account/admin';
import { profileApi } from '../api/account/profile';

const persistConfig = {
    key: 'root',
    storage,
    whileList: ['auth'],
}


const rootReducer = combineReducers({
    // [api.something] : appendFile.reducer
    [authApi.reducerPath]: authReducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [staffsApi.reducerPath]: staffsApi.reducer,
    user: userSlicer,
    [roomApi.reducerPath]: roomApi.reducer,
    [roomTypesApi.reducerPath]: roomTypesApi.reducer,
    [branchApi.reducerPath]: branchApi.reducer,
    [serviceApi.reducerPath]: serviceApi.reducer,
    [bookingApi.reducerPath]: bookingApi.reducer,
    [promotionsApi.reducerPath]: promotionsApi.reducer,
    [billingApi.reducerPath]: billingApi.reducer,
    [ratesApi.reducerPath]: ratesApi.reducer,
    [permissonApi.reducerPath]: permissonApi.reducer,
    [policyApi.reducerPath]: policyApi.reducer,
    [utilitiesApi.reducerPath]: utilitiesApi.reducer,
    [statisticalsApi.reducerPath]: statisticalsApi.reducer,
    [contactApi.reducerPath]: contactApi.reducer,
    [notificationsApi.reducerPath]: notificationsApi.reducer,
    [adminsApi.reducerPath]: adminsApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
})


const persistedReducer = persistReducer(persistConfig, rootReducer)

const middlewares = [
    authApi.middleware,
    usersApi.middleware,
    staffsApi.middleware,
    roomApi.middleware,
    roomTypesApi.middleware,
    branchApi.middleware,
    serviceApi.middleware,
    bookingApi.middleware,
    promotionsApi.middleware,
    billingApi.middleware,
    ratesApi.middleware,
    permissonApi.middleware,
    policyApi.middleware,
    utilitiesApi.middleware,
    statisticalsApi.middleware,
    contactApi.middleware,
    notificationsApi.middleware,
    adminsApi.middleware,
    profileApi.middleware,
]

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware: any) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(...middlewares)
})


export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>

export default store
export const persistor = persistStore(store)