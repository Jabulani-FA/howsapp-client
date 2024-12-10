import {configureStore} from '@reduxjs/toolkit'
import userReducer from './userReducer'
import chatReducer from './chatReducer'
import themeReducer from './themeReducer'

export const store = configureStore({
    reducer:{
        user: userReducer,
        chat: chatReducer,
        theme: themeReducer,
    }
})