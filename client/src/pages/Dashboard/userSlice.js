import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = { users: [] };
// import Axios from axios

export const getUsers = createAsyncThunk('user/getUsers', async () => {
    try {
        const users = await axios.get('/user/allUsers');
        console.log(users)
    }
})