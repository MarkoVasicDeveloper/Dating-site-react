/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { createSlice } from '@reduxjs/toolkit'
import { type RootState } from '../store'

export interface User {
  id: number
  username: string
  token: string
  role: string
  conversationRequest: []
  unreadedMessage: []
}

interface userState {
  user: User
}

const initialState = {} as userState

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userData (state, action) {
      state = { ...state, ...action.payload }
      return state
    }
  }
})

export const { userData } = userSlice.actions

export default userSlice.reducer

export const selectUser = (state: RootState) => state.user
