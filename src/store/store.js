import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
const store = configureStore({
    reducer: {
        userReducer: userSlice.reducer
    }
});

export default store