import { SET_PRODUCTS } from "./actionTypes";
import { Product } from "@/types/interfaces";
import products from "@/data/data";
interface ProductState {
  products: Product[];
}

interface SetProductsAction {
  type: typeof SET_PRODUCTS;
  payload: Product[];
}

type ProductAction = SetProductsAction;

const initialState: ProductState = {
  products,
};

export const productsReducer = (
  state = initialState,
  action: ProductAction
): ProductState => {
  switch (action.type) {
    case SET_PRODUCTS:
      return { ...state, products: action.payload };
    default:
      return state;
  }
};
