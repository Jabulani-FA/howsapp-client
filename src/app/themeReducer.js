import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  theme: "light",
};

if(typeof (window !== undefined)){
    if(localStorage.getItem('theme')){
        initialState = JSON.parse(localStorage.getItem('theme'))
    }
    else{
        initialState = {theme: "light"}
    }
}

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    light: (state, action) => {
      state.theme = action.payload;
    },
    dark: (state, action) => {
      state.theme = action.payload;
    },
  },
});

export const { light, dark } = themeSlice.actions;
export default themeSlice.reducer;
