import { createSlice } from "@reduxjs/toolkit";

export type User = {
    id: number,
    username: string,
    token: string,
    role: string
}

const initialState = {
    id: null,
    username: null,
    token: null,
    role: null
} as unknown as User;

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
});

export default userSlice.reducer;