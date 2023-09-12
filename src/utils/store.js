import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/userSlice";
import movieReducer from "./slice/movieSlice";
import gptReducer from "./slice/gptSlice";
import configReducer from "./slice/configSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    movies: movieReducer,
    gpt: gptReducer,
    config: configReducer,
  },
});
