import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  messages: [],
  clicked: false,
};

const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    selectUser: (state, action) => {
      state.user = action.payload;
    },
    sendMessage: (state, action) => {
      state.messages = action.payload;
    },
    setClicked: (state, action) => {
      state.clicked = action.payload;
    },
  },
});

export const { selectUser, sendMessage, setClicked } =
  conversationSlice.actions;

export default conversationSlice.reducer;
