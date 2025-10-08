"use client";

import React, { useMemo, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useSearchParams, useRouter } from "next/navigation";

import Pagination from "@/components/Pagination/Index";
import { RootState } from "@/store/reducers";
import ProductCard from "./ProductCard";
import Filters from "./Filters";

const Products = () => {
  const { products } = useSelector((state: RootState) => state.products);
  const searchParams = useSearchParams();
  const router = useRouter();

  const [filters, setFilters] = useState({
    query: searchParams.get("q") || "",
    category: searchParams.get("category") || "All",
    values: [
      Number(searchParams.get("min") || 0),
      Number(searchParams.get("max") || 500),
    ],
  });
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
    [products]
  );

  useEffect(() => {
    const params = new URLSearchParams();
    const { query, category, values } = filters;
    if (query) params.set("q", query);
    if (category && category !== "All") params.set("category", category);
    if (values[0] !== MIN) params.set("min", String(values[0]));
    if (values[1] !== MAX) params.set("max", String(values[1]));

    router.replace(`?${params.toString()}`);
    setCurrentPage(1);
  }, [filters, router]);

  const filtered = useMemo(() => {
    const q = filters.query.trim().toLowerCase();
    const [minVal, maxVal] = filters.values;

    return products.filter((p) => {
      if (filters.category !== "All" && p.category !== filters.category)
        return false;
      if (q && !p.name.toLowerCase().includes(q)) return false;
      if (p.price < minVal || p.price > maxVal) return false;
      return true;
    });
  }, [filters, products]);

  const totalPages = Math.ceil(filtered.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = filtered.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50 p-4 md:p-8">
      <main className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
        <Filters
          filters={filters}
          setFilters={setFilters}
          categories={categories}
          filteredLength={filtered.length}
          rangeConfig={{ STEP, MIN, MAX }}
        />

        <section className="md:col-span-3">
          {paginatedProducts.length === 0 ? (
            <div className="flex items-center justify-center bg-amber-50 p-6 rounded">
              <p className="text-2xl text-center">No products found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

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
