import { CartState, Product } from "@/types/interfaces";
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_QTY,
  CLEAR_CART,
} from "./actionTypes";

const cartStorageKey = "myshop_cart_v1";

const initialState: CartState = {
  items:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem(cartStorageKey) || "[]")
      : [],
};

interface AddToCartAction {
  type: typeof ADD_TO_CART;
  payload: Product;
}

interface RemoveFromCartAction {
  type: typeof REMOVE_FROM_CART;
  payload: string | number;
}

interface UpdateQtyAction {
  type: typeof UPDATE_QTY;
  payload: { id: string | number; qty: number };
}

interface ClearCartAction {
  type: typeof CLEAR_CART;
}

type CartAction =
  | AddToCartAction
  | RemoveFromCartAction
  | UpdateQtyAction
  | ClearCartAction;

export const cartReducer = (
  state = initialState,
  action: CartAction
): CartState => {
  let newState: CartState;

  switch (action.type) {
    case ADD_TO_CART: {
      const found = state.items.find((i) => i.product.id === action.payload.id);
      if (found) {
        newState = {
          ...state,
          items: state.items.map((i) =>
            i.product.id === action.payload.id ? { ...i, qty: i.qty + 1 } : i
          ),
        };
      } else {
        newState = {
          ...state,
          items: [{ product: action.payload, qty: 1 }, ...state.items],
        };
      }
      break;
    }

    case REMOVE_FROM_CART:
      newState = {
        ...state,
        items: state.items.filter((i) => i.product.id !== action.payload),
      };
      break;

    case UPDATE_QTY:
      newState = {
        ...state,
        items: state.items.map((i) =>
          i.product.id === action.payload.id
            ? { ...i, qty: action.payload.qty }
            : i
        ),
      };
      break;

    case CLEAR_CART:
      newState = { ...state, items: [] };
      break;

    default:
      return state;
  }

  if (typeof window !== "undefined") {
    localStorage.setItem(cartStorageKey, JSON.stringify(newState.items));
  }

  return newState;
};
