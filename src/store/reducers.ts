import { combineReducers } from "redux";
import { cartReducer } from "./cart/reducer";
import { productsReducer } from "./products/reducer";

export const rootReducer = combineReducers({
  cart: cartReducer,
  products: productsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
