import { createSlice } from "@reduxjs/toolkit"

export const userInfoSlice = createSlice({
    name: 'userInfo',
    initialState: {
        userInfo: null,
    },
    reducers: {
        setUserInfo: (state, action) => {
            state.userInfo = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { setUserInfo } = userInfoSlice.actions