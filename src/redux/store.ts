/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { combineReducers, configureStore, type PreloadedState } from '@reduxjs/toolkit'

import userReducer from './user/userSlice'
import usersArrayReducer from './users/usersSlice'

const rootReducer = combineReducers({
  user: userReducer,
  usersArray: usersArrayReducer
})

export const setupStore = (preloadedState?: PreloadedState<RootState>) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
      serializableCheck: false
    })
  })

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
