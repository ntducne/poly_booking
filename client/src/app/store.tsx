
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
import roomApi, { roomReducer } from '../api/Room';

const persistConfig = {
    key: 'root',
    storage,
    whileList: ['auth', 'cartUser'], // luu strorage 
    backlist: ['products'] // k luu vaoo storage
}


const rootReducer = combineReducers({
    [roomApi.reducerPath]: roomReducer
})


const persistedReducer = persistReducer(persistConfig, rootReducer)

const middlewares = [
    roomApi.middleware
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