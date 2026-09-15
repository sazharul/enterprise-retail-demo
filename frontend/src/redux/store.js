import {configureStore} from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import cartReducer from './features/cart/cartSlice';
import wishListReducer from './features/wishList/wishListSlice';

import {baseApi} from './api/baseApi';
import {nodeBaseApi} from './api/nodeBaseApi';
import {
    persistReducer,
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const cartPersistConfig = {
    key: 'cart',
    storage,
};
const wishListPersistConfig = {
    key: 'wishList',
    storage,
};

// const persistedAuthReducer = persistReducer(cartPersistConfig, authReducer);
const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);
const persistedWishListReducer = persistReducer(wishListPersistConfig, wishListReducer);

export const store = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
        [nodeBaseApi.reducerPath]: nodeBaseApi.reducer,
        auth: authReducer,
        cart: persistedCartReducer,
        wishList: persistedWishListReducer,
    },
    middleware: (getDefaultMiddlewares) =>
        getDefaultMiddlewares({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(baseApi.middleware, nodeBaseApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export const persistor = persistStore(store);
