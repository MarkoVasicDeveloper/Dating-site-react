import { createSlice } from '@reduxjs/toolkit'
import { type RootState } from '../store'
import { type Gentleman, type Lady } from '../user/userSlice'

const initialState = [] as Lady[] | Gentleman[]

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsersArray (state, action) {
      state = [...state, ...action.payload]
      return state
    }
  }
})

export const { setUsersArray } = usersSlice.actions

export default usersSlice.reducer

export const selectUsersArray = (state: RootState): Lady[] | Gentleman[] => state.usersArray
