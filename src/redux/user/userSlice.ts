/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { createSlice } from '@reduxjs/toolkit'
import { type RootState } from '../store'

export interface UserData {
  blocked: [] | null
  city: string
  conversationRequest: null | Array<{ id: number, username: string }>
  conversations: null | Array<{ id: number, username: string }>
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
  unreadedMessage: any[]
  about: Array<Record<string, unknown>>
  photo: Array<Record<string, unknown>>
  conversationRequest: []
  conversationsRequestWithUsersData: any[]
  conversationsWithUserData: any[]
  photosDestination: string
  usersPhotosDestination: string
  message: Record<string, any>
}

const initialState = {
  id: 0,
  token: '',
  role: 'lady',
  unreadedMessage: [],
  about: [],
  photo: [],
  conversationRequest: [],
  conversationsRequestWithUsersData: [],
  conversationsWithUserData: [],
  photosDestination: '',
  usersPhotosDestination: '',
  message: {},
  blocked: null,
  city: '',
  conversations: [],
  created: '',
  dateOfBirth: '',
  email: '',
  lastLogIn: '',
  notification: '0',
  password: '',
  rules: '0',
  state: '',
  username: '',
  verified: '0'
} as User

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userData (state, action) {
      state = { ...state, ...action.payload }
      return state
    },
    unreadedMessage (state, action) {
      state.unreadedMessage = [...state.unreadedMessage, ...action.payload]
      return state
    },
    setMessage (state, action) {
      state.message = { ...state.message, ...action.payload }
      return state
    },
    setRecivedMessage (state, action) {
      state.message[action.payload.from]?.message.push(action.payload);

      return state;
    },
    setConversation (state, action) {
      state.conversationsWithUserData.push(action.payload);
    },
    setRequestConversation (state, action) {
      if (Array.isArray(action.payload)) {
        state.conversationsRequestWithUsersData = [...state.conversationsRequestWithUsersData, ...action.payload];
        return;
      }
      state.conversationsRequestWithUsersData =
        state.conversationsRequestWithUsersData.filter((element) => element.username !== action.payload.username);
      return state;
    }
  }
})

export const { userData, unreadedMessage, setMessage, setRecivedMessage, setConversation, setRequestConversation } = userSlice.actions

export default userSlice.reducer

export const selectUser = (state: RootState) => state.user
export const selectUserId = (state: RootState) => state.user.id
export const selectUserRole = (state: RootState) => state.user.role
export const selectUserToken = (state: RootState) => state.user.token
export const selectUsersPhoto = (state: RootState) => state.user.usersPhotosDestination
export const selectUserConversation = (state: RootState) => state.user.conversations
export const selectUserConversationsWithUsersData = (state: RootState) => state.user.conversationsWithUserData
export const selectConversationsRequestWithUsersData = (state: RootState) => state.user.conversationsRequestWithUsersData
export const selectUserUnreadedMessage = (state: RootState) => state.user.unreadedMessage
export const selectUserMessage = (state: RootState) => state.user.message
