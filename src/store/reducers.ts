import { combineReducers } from "redux";
import { cartReducer } from "./cart/reducer.ts";
import { productsReducer } from "./products/reducer.ts";

export const rootReducer = combineReducers({
  cart: cartReducer,
  products: productsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
