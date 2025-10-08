"use client";

import React, { useMemo, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import products from "@/data/data";
import { Product } from "@/types/types";
import { addToCart } from "@/store/cart/actions";
import { Range, getTrackBackground } from "react-range";
import Pagination from "@/components/Pagination/Index";
import toast from "react-hot-toast";

const Products = () => {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialQuery = searchParams.get("q") || "";
  const initialCategory = searchParams.get("category") || "All";
  const initialMin = Number(searchParams.get("min") || 0);
  const initialMax = Number(searchParams.get("max") || 500);

  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [values, setValues] = useState([initialMin, initialMax]);
  const [currentPage, setCurrentPage] = useState(1);

  const PRODUCTS_PER_PAGE = 9;

  const STEP = 1;
  const MIN = 0;
  const MAX = 500;

  const categories = useMemo(
    () => [
      "All",
      ...Array.from(
        new Set(products.map((p) => p.category ?? "Uncategorized"))
      ),
    ],
    []
  );

  useEffect(() => {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (selectedCategory && selectedCategory !== "All")
      params.set("category", selectedCategory);
    if (values[0] !== MIN) params.set("min", String(values[0]));
    if (values[1] !== MAX) params.set("max", String(values[1]));

    router.replace(`?${params.toString()}`);
    setCurrentPage(1);
  }, [query, selectedCategory, values, router]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const [minVal, maxVal] = values;

    return products.filter((p) => {
      if (selectedCategory !== "All" && p.category !== selectedCategory)
        return false;
      if (q && !p.name.toLowerCase().includes(q)) return false;
      if (p.price < minVal) return false;
      if (p.price > maxVal) return false;
      return true;
    });
  }, [query, selectedCategory, values]);

  const totalPages = Math.ceil(filtered.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = filtered.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

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

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <main className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
        <aside className="md:col-span-1 bg-white p-4 rounded-lg shadow-sm">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Search</label>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Category */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full border rounded px-3 py-2"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Price range */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Price range
            </label>
            <Range
              step={STEP}
              min={MIN}
              max={MAX}
              values={values}
              onChange={(vals) => setValues(vals)}
              renderTrack={({ props, children }) => (
                <div
                  {...props}
                  style={{
                    ...props.style,
                    height: "6px",
                    width: "100%",
                    background: getTrackBackground({
                      values,
                      colors: ["#ccc", "#6e591a", "#ccc"],
                      min: MIN,
                      max: MAX,
                    }),
                    borderRadius: "4px",
                  }}
                >
                  {children}
                </div>
              )}
              renderThumb={({ props }) => (
                <div
                  {...props}
                  className="h-5 w-5 bg-white border border-gray-400 rounded-full shadow"
                />
              )}
            />
            <div className="flex justify-between mt-2 text-sm">
              <span>Min: ${values[0]}</span>
              <span>Max: ${values[1]}</span>
            </div>
            <div className="mt-2">
              <button
                onClick={() => setValues([MIN, MAX])}
                className="text-sm px-2 py-1 border rounded"
              >
                Reset
              </button>
            </div>
          </div>

          <div className="text-sm text-gray-600">
            Showing <strong>{filtered.length}</strong> product(s)
          </div>
        </aside>

        <section className="md:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedProducts.map((product) => (
              <article
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
                  <div className="text-sm text-gray-600">
                    {product.category}
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="text-xl font-bold">
                      ${product.price.toFixed(2)}
                    </div>
                    <button
                      onClick={() => handleAdd(product)}
                      className="bg-blue-600 text-white px-3 py-1 rounded"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination
              goToPage={goToPage}
              currentPage={currentPage}
              totalPages={totalPages}
            />
          )}
        </section>
      </main>
    </div>
  );
};

export default Products;
