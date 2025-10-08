import { StaticImageData } from "next/image";

export interface Product {
  id: string;
  name: string;
  price: number;
  img: string | StaticImageData;
  category?: string;
}
export interface FiltersProps {
  filters: {
    query: string;
    category: string;
    values: number[];
  };
  setFilters: React.Dispatch<
    React.SetStateAction<{
      query: string;
      category: string;
      values: number[];
    }>
  >;
  categories: string[];
  filteredLength: number;
  rangeConfig: {
    STEP: number;
    MIN: number;
    MAX: number;
  };
}

export interface ProductCardProps {
  product: Product;
}

export interface PaginationProps {
  goToPage: (page: number) => void;
  currentPage: number;
  totalPages: number;
}

export interface CartItem {
  product: Product;
  qty: number;
}

export interface CartState {
  items: CartItem[];
}
