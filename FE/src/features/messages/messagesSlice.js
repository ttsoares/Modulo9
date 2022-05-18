import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { url } from '../../services/URL'
import axios from 'axios';

/*{
    uid: UUID
    description: 'bla',
    details: 'bla bla bla',
    userid: UUID
}*/

export const thunkGetMessages = createAsyncThunk(
    'messages/thunkGetMessages',
    async (userID) => {
        const response = await axios.get(`${url}/messages/${userID}`)
        console.log("Thunk ---->", response.data)
        return response.data
    }
)

const messagesSlice = createSlice({
    name: 'messages',
    initialState: {
        messages: [],
        status: null
    },
    reducers: {
        add (state, {payload}) {  //paylad is the new message
            state.push(payload)
        },
        all (state, {payload}) {  // payload is a list of messages
            return payload
        },
        del (state, {payload: messageUID})  {  // payload is the UID of the message in state 
            return state = state.filter((id) => id !== messageUID)
        },
        upd: (state, {payload}) => { // payload is the edited message
            return state = state.map((elm) => (elm.uid === payload.uid ? payload : elm))
        },
        rst () { 
            return []
        }
    },
    extraReducers: {
        [thunkGetMessages.pending]: (state) => {
            state.status = 'Pending';
            console.log("Pending");
        },
        [thunkGetMessages.rejected]: (state) => {
            state.status = 'Rejected';
            console.log("Rejected!");
        },
        [thunkGetMessages.fulfilled]: (state, { payload }) => {
            state.messages = payload;
            state.status = 'Success';
            console.log("Fetched Successfully!");
        },
    }  
});

export const { add, del, upd, all, rst } = messagesSlice.actions;

export const selectMessages = (state) => state.messages;

export default messagesSlice.reducer;

