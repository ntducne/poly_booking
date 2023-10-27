
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

const persistConfig = {
    key: 'root',
    storage,
    whileList: ['products'],
}


const rootReducer = combineReducers({
    [roomApi.reducerPath]: roomApi.reducer,
    [authApi.reducerPath]: authReducer,
    [branchApi.reducerPath]: branchApi.reducer
})


const persistedReducer = persistReducer(persistConfig, rootReducer)

const middlewares = [
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