
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
import roomApi from '../api/Room';
import authApi, { authReducer } from '../api/Auth';
import branchApi from '../api/Branch';
import userApi from '../api/User';

const persistConfig = {
    key: 'root',
    storage
}


const rootReducer = combineReducers({
    [userApi.reducerPath]: userApi.reducer,
    [roomApi.reducerPath]: roomApi.reducer,
    [authApi.reducerPath]: authReducer,
    [branchApi.reducerPath]: branchApi.reducer
})


const persistedReducer = persistReducer(persistConfig, rootReducer)

const middlewares = [
    userApi.middleware,
    roomApi.middleware,
    authApi.middleware,
    branchApi.middleware
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