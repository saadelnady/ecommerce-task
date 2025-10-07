import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_QTY,
  CLEAR_CART,
} from "./actionTypes";
import { Product } from "@/types/types";

export interface CartItem {
  product: Product;
  qty: number;
}

interface CartState {
  items: CartItem[];
}

const cartStorageKey = "myshop_cart_v1";

// قراءة السلة من localStorage عند البداية
const initialState: CartState = {
  items:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem(cartStorageKey) || "[]")
      : [],
};

export const cartReducer = (state = initialState, action: any): CartState => {
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

  // حفظ أي تغيير في localStorage
  if (typeof window !== "undefined") {
    localStorage.setItem(cartStorageKey, JSON.stringify(newState.items));
  }

  return newState;
};
