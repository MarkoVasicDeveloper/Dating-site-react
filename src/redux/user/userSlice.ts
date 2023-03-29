/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { createSlice } from '@reduxjs/toolkit'
import { type RootState } from '../store'

export interface User {
  id: number
  username: string
  token: string
  role: 'lady' | 'gentleman' | 'gentlemanPremium' | 'gentlemanVip' | 'administrator'
  conversationRequest: []
  unreadedMessage: []
  blocked: null
  city: string
  conversations: Array<Record<string, unknown>>
  created: string
  dateOfBirth: string
  email: string
  about: Array<Record<string, unknown>>
  lastLogin: string
  notification: '0' | '1'
  numberOfMessage: number
  photo: Array<Record<string, unknown>>
  state: string
  conversationsWithUsers: []
}

const initialState = {} as User

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
