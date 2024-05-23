// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import authSlice from '../__redux/authSlice';
import generalSlice from '../__redux/generalSlice';



const persistConfig = {
	key: 'root',
	storage,
	whitelist: [
		'auth',
	]
};

const rootReducer = combineReducers({
	// counter: counterSlice,
	auth: authSlice,
	general: generalSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;