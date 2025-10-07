import { StaticImageData } from "next/image";

export type Product = {
  id: string;
  name: string;
  price: number;
  img: string | StaticImageData;
  category?: string;
};

export type CartItem = {
  product: Product;
  qty: number;
};
