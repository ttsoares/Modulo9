import { configureStore } from '@reduxjs/toolkit';
import messagesReducer from '../features/messages/messagesSlice';
import loginReducer from '../features/login/loginSlice'
import usersReducer from '../features/users/usersSlice'

export const store = configureStore({
  reducer: {
    messages: messagesReducer,
    login: loginReducer,
    users: usersReducer,
  },
});
