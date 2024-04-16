import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    domainName: null
}

export const storeIpSlice = createSlice({
    name: "store",
    initialState,
    reducers: {
        // action
        storeDomainName: (state, action) => {
            state.domainName = action.payload;
        }
    }
})

export const {storeDomainName} = storeIpSlice.actions;

export default storeIpSlice.reducer;
