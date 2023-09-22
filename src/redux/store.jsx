import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./reucer";

const store = configureStore({
    reducer: appReducer
});

export default store;