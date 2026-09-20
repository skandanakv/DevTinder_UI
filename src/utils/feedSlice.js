import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name: "feed",
    initialState: {
        feed: null,
    },
    reducers: {
        addFeed: (state, action) => {
            state.feed = action.payload;
        },
        removeFeed: (state) => {
            state.feed = null;
        },
    },
})

export const { addFeed } = feedSlice.actions;
export default feedSlice.reducer;