
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
// import userSlicer from '../Slices/Auth'
import { usersApi } from '../api/account/users';
import  { staffsApi } from '../api/account/staffs';
 '../api/account/staffs';

const persistConfig = {
    key: 'root',
    storage,
    whileList: ['auth','cartUser'], // luu strorage 
    backlist: ['products'] // k luu vaoo storage
}


const rootReducer = combineReducers({
       // [api.something] : appendFile.reducer
       [authApi.reducerPath]: authReducer,
       [usersApi.reducerPath]: usersApi.reducer,
       [staffsApi.reducerPath]: staffsApi.reducer,
})
   

const persistedReducer = persistReducer(persistConfig, rootReducer)

const middlewares = [
    authApi.middleware,
    usersApi.middleware,
    staffsApi.middleware
]

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware:any)=>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(...middlewares)
        // .concat(authApi.middleware)

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