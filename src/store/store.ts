import { createStore } from "redux";
import { rootReducer } from "./reducers";

const devtools =
  typeof window !== "undefined" &&
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
  window.__REDUX_DEVTOOLS_EXTENSION__();

export const store = createStore(rootReducer, devtools);
