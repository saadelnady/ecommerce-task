import Image from "next/image";
import React from "react";
import { addToCart } from "@/store/cart/actions";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { ProductCardProps, Product } from "@/types/interfaces";

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();

  const handleAdd = (product: Product) => {
    dispatch(addToCart(product));
    toast.success(`🛒 Added ${product.name} to cart`, {
      duration: 2000,
      style: {
        background: "#fff",
        color: "#333",
        border: "1px solid #eee",
        fontWeight: 500,
      },
    });
  };

  return (
    <div
      key={product.id}
      className="bg-white rounded-lg shadow-sm overflow-hidden transform hover:-translate-y-1 transition"
    >
      <Image
        src={product.img}
        alt={product.name}
        className="w-full h-55 object-cover"
        width={1024}
        height={1080}
        unoptimized
        priority
      />
      <div className="p-4">
        <h2 className="font-semibold text-lg">{product.name}</h2>
        <div className="text-sm text-gray-600">{product.category}</div>
        <div className="mt-2 flex items-center justify-between">
          <div className="text-xl font-bold">${product.price.toFixed(2)}</div>
          <button
            onClick={() => handleAdd(product)}
            className="bg-blue-600 text-white px-3 py-1 rounded"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
