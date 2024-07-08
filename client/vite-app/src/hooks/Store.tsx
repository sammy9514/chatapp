import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import slice from "./authSlice";
import conversationSlice from "./conversationSlice";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, slice);

const store = configureStore({
  reducer: {
    auth: persistedReducer,
    user: conversationSlice,
  },
});

const persistor = persistStore(store);

export { store, persistor };
