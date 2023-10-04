
import { configureStore } from "@reduxjs/toolkit";
import storeRoutesReducer from "./features/storeRoute/storeRouteSlice";
import storeMakersReducer from "./features/storeRoute/storeMakersSlice";

export const store = configureStore({
    reducer:{
        storeRoute: storeRoutesReducer,
        storeMarkers: storeMakersReducer,
    }
})
