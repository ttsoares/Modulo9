import { createSlice, createAsyncThunk  } from '@reduxjs/toolkit';
import { url } from '../../services/URL'
import axios from 'axios';

/*{
    id: UUID
    name: 'bla',
    password: 'bla bla bla,
}*/

export const thunkGetUsers = createAsyncThunk(
    'users/thunkGetUsers',
    async () => {
        const response = await axios.get(`${url}/users`)
        console.log("Thunk ---->", response.data)
        return response.data
    }
)

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        status: null
    },
    reducers: {
        all (state, {payload}) {  // payload is the list of users
            return payload
        },
        del (state, {payload: userUID})  {  // payload is the UID of the user 
            return state = state.filter((id) => id !== userUID)
        },
        upd (state,{payload}) { // payload is the edited user object
            return state = state.map((elm) => (elm.uid === payload.uid ? payload : elm))
        },
    },
    extraReducers: {
        [thunkGetUsers.pending]: (state) => {
            state.status = 'Pending';
            console.log("Pending");
        },
        [thunkGetUsers.rejected]: (state) => {
            state.status = 'Rejected';
            console.log("Rejected!");
        },
        [thunkGetUsers.fulfilled]: (state, { payload }) => {
            state.messages = payload;
            state.status = 'Success';
            console.log("Fetched Successfully!");
        },
    }
});

export const { del, upd, all } = usersSlice.actions;

export const selectUsers = (state) => state.users;

export default usersSlice.reducer;