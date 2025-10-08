import products from "@/data/data";
import { SET_PRODUCTS } from "./actionTypes";
import { Product } from "@/types/interfaces";

export const loadProducts = () => {
  return {
    type: SET_PRODUCTS,
    payload: products as Product[],
  };
};
