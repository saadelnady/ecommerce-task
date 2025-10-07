import { SET_PRODUCTS } from "./actionTypes";
import { Product } from "@types/product";

interface ProductState {
  products: Product[];
}

const initialState: ProductState = {
  products: [],
};

export const productsReducer = (
  state = initialState,
  action: any
): ProductState => {
  switch (action.type) {
    case SET_PRODUCTS:
      return { ...state, products: action.payload };
    default:
      return state;
  }
};
