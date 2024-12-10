import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  user: null,
  isLoggedIn: false,
};

if(typeof (window !== undefined)){
    if(localStorage.getItem('user')){
        const savedUser = JSON.parse(localStorage.getItem('user'));
        initialState = {...initialState, ...savedUser}
    }    
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loggedIn: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    loggedOut: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },
  }, 
});

export const { loggedIn, loggedOut } = userSlice.actions;
export default userSlice.reducer;
