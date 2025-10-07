import Image from "next/image";
import React, { useState, useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQty, clearCart } from "@/store/cart/actions";
import IcCart from "./assets/svg/ic-cart.svg";
import IcClose from "./assets/svg/ic-close.svg";
import toast from "react-hot-toast";

const Header = () => {
  const dispatch = useDispatch();
  const { items: cart } = useSelector((state: RootState) => state.cart);
  const [isMounted, setIsMounted] = useState(false);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const total = useMemo(
    () =>
      cart?.reduce((sum, item) => sum + item.product.price * item.qty, 0) || 0,
    [cart]
  );

  const changeQty = (productId: string, qty: number) => {
    if (qty <= 0) {
      dispatch(removeFromCart(productId));
      toast(`Removed product from cart 🛒`, {
        duration: 2000,
        style: {
          background: "#f87171",
          color: "#fff",
          fontWeight: 500,
        },
      });
    } else {
      dispatch(updateQty(productId, qty));
      toast(`Updated quantity to ${qty}`, {
        duration: 1500,
        style: {
          background: "#6e591a",
          color: "#fff",
          fontWeight: 500,
        },
      });
    }
  };

  const handlePurchase = () => {
    if (cart.length === 0) return;
    toast.success(
      `Thank you for your purchase! 🛒 Total: $${total.toFixed(2)}`,
      {
        duration: 3000,
        style: {
          background: "#6e591a",
          color: "#fff",
          fontWeight: 500,
        },
      }
    );

    dispatch(clearCart());
  };

  if (!isMounted) return null;

  return (
    <header className="mb-6 py-2 sticky top-0 z-50 bg-white ">
      <div className="max-w-6xl mx-auto flex items-center justify-between ">
        <h1 className="text-2xl md:text-3xl font-bold">My Shop</h1>

        <div className="flex items-center gap-4">
          <div className="relative">
            <button
              onClick={() => setShowCart(!showCart)}
              className="inline-block"
            >
              <IcCart width={30} height={30} />
              <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center text-xs">
                {cart?.reduce((s, i) => s + i.qty, 0) || 0}
              </span>
            </button>

            {showCart && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow p-3 z-50">
                <div className="flex gap-3">
                  <button
                    className="text-xs text-gray-500"
                    onClick={() => {
                      setShowCart(false);
                    }}
                  >
                    <IcClose />
                  </button>
                  <h3 className="font-semibold">Cart</h3>
                </div>

                <div className="max-h-48 overflow-auto mt-2">
                  {cart?.length === 0 ? (
                    <div className="text-gray-500 text-sm">
                      Your cart is empty
                    </div>
                  ) : (
                    cart.map((item) => (
                      <div
                        key={item.product.id}
                        className="flex items-center gap-3 py-2 border-b last:border-b-0"
                      >
                        <button
                          className="text-xs text-gray-500"
                          onClick={() => {
                            dispatch(removeFromCart(item.product.id));
                            toast.success(
                              `Removed ${item.product.name} from cart`,
                              {
                                duration: 2000,
                                style: {
                                  background: "#f87171", // أحمر فاتح لإشارة الحذف
                                  color: "#fff",
                                  fontWeight: 500,
                                },
                              }
                            );
                          }}
                        >
                          <IcClose />
                        </button>
                        <Image
                          src={item?.product?.img}
                          alt={item.product.name}
                          width={1024}
                          height={1080}
                          className="w-12 h-12 object-cover rounded"
                        />

                        <div className="flex-1">
                          <div className="text-sm font-medium">
                            {item.product.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            ${item.product.price.toFixed(2)}
                          </div>

                          <div className="mt-1 text-xs flex items-center gap-2">
                            <button
                              onClick={() =>
                                changeQty(item.product.id, item.qty - 1)
                              }
                              className="px-2 py-1 border rounded"
                            >
                              -
                            </button>
                            <span>{item.qty}</span>
                            <button
                              onClick={() =>
                                changeQty(item.product.id, item.qty + 1)
                              }
                              className="px-2 py-1 border rounded"
                            >
                              +
                            </button>
                            <button
                              onClick={() =>
                                dispatch(removeFromCart(item.product.id))
                              }
                              className="ml-2 text-red-500 text-xs"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <div className="text-sm">
                    Total: <strong>${total.toFixed(2)}</strong>
                  </div>
                  <button
                    onClick={handlePurchase}
                    disabled={cart?.length === 0}
                    className="bg-green-600 text-white px-3 py-1 rounded disabled:opacity-50"
                  >
                    Purchase
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
