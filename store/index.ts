import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./tokenSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      token: tokenReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ["token/closeModal"],

          ignoredPaths: ["token.priceUpdates"],
        },
      }),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
