// export function chatReducer(state = initialState, { type, payload }) {
//   switch (type) {
//     case "SEND_MESSAGE":
//       return payload;
//     case "DELETE_MESSAGE":
//       return payload;
//     case "UPDATE_MESSAGE":
//       return payload;
//     default:
//       return state;
//   }
// }

import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  messages: [],
};

if(typeof (window !== undefined)){
    if(localStorage.getItem('chat')){
        initialState = JSON.parse(localStorage.getItem('chat'))
    }  
    else{
        initialState = {
            messages: [],
        }
    }  
}

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    send: (state, action) => {
      state.messages = action.payload;
    },
    update: (state, action) => {
        state.messages = action.payload;
    }, 
    clear: (state, action) => {
      state.messages = [];
    },
  },
});

export const { send, update, clear } = chatSlice.actions;
export default chatSlice.reducer;
