/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { createSlice } from '@reduxjs/toolkit'
import { type RootState } from '../store'

export interface UserData {
  blocked: [] | null
  city: string
  conversationRequest: null | Array<Record<string, unknown>>
  conversations: null | Array<Record<string, unknown>>
  created: string
  dateOfBirth: string
  email: string
  lastLogIn: string
  notification: '0' | '1'
  password: string
  rules: '0' | '1'
  state: string
  username: string
  verified: '0' | '1'
}

export interface Lady extends UserData {
  ladyAbouts: Record<string, unknown>
  ladyId: number
  photosLadies: Array<Record<string, unknown>>
}

export interface Gentleman extends UserData {
  gentlemanAbouts: Record<string, unknown>
  gentlemanId: number
  numberOfMessage: number
  photosGentleman: []
}

export interface User extends UserData {
  id: number
  token: string
  role: 'lady' | 'gentleman' | 'gentlemanPremium' | 'gentlemanVip' | 'administrator'
  unreadedMessage: []
  about: Array<Record<string, unknown>>
  photo: Array<Record<string, unknown>>
  conversationRequest: []
  conversationsWithUsers: []
  photosDestination: string
  usersPhotosDestination: string
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
export const selectUserId = (state: RootState) => state.user.id
export const selectUserRole = (state: RootState) => state.user.role
export const selectUsersPhoto = (state: RootState) => state.user.usersPhotosDestination
export const selectUserConversationRequest = (state: RootState) => state.user.conversationsWithUsers
