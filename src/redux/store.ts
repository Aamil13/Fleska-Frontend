import { configureStore } from "@reduxjs/toolkit";
import menuSlice from "./reducers/menuSlice";

export const store = configureStore({
    reducer:{
        menu: menuSlice,
    }
})

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;