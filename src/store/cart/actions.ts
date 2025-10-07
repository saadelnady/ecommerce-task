import { Product } from "@/types/types";
import {
  ADD_TO_CART,
  CLEAR_CART,
  REMOVE_FROM_CART,
  UPDATE_QTY,
} from "./actionTypes";

export const addToCart = (product: Product) => ({
  type: ADD_TO_CART,
  payload: product,
});

export const removeFromCart = (id: string) => ({
  type: REMOVE_FROM_CART,
  payload: id,
});

export const updateQty = (id: string, qty: number) => ({
  type: UPDATE_QTY,
  payload: { id, qty },
});

export const clearCart = () => ({
  type: CLEAR_CART,
});
