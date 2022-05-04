import { createSlice } from "@reduxjs/toolkit"

export const userInfoSlice = createSlice({
    name: 'userInfo',
    initialState: {
        data: null,
    },
    reducers: {
        setUserInfo: (state, action) => {
            state.data = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { setUserInfo } = userInfoSlice.actions