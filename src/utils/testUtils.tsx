/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type PreloadedState } from "@reduxjs/toolkit";
import { render, type RenderOptions } from "@testing-library/react";
import React, { type PropsWithChildren } from "react";
import { Provider } from "react-redux";

import { type AppStore, type RootState, setupStore } from "../redux/store";

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: PreloadedState<RootState>
  store?: AppStore
}

export function renderWithProviders (
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  const Wrapper = ({ children }: PropsWithChildren<unknown>): JSX.Element => (
    <Provider store={store}>{children}</Provider>
  );
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
