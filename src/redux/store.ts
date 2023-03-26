import { combineReducers, configureStore, PreloadedState } from "@reduxjs/toolkit";

import userReducer from './user/userSlice';

const rootReducer = combineReducers({
    user: userReducer
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => 
    configureStore({
        reducer: rootReducer,
        preloadedState,
        middleware: getDefaultMiddleware => getDefaultMiddleware({
            serializableCheck: false
          })
    });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];