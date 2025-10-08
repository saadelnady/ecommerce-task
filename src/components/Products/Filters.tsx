"use client";

import React from "react";
import { Range, getTrackBackground } from "react-range";
import { FiltersProps } from "@/types/interfaces";

const Filters = ({
  filters,
  setFilters,
  categories,
  filteredLength,
  rangeConfig,
}: FiltersProps) => {
  const { query, category, values } = filters;
  const { STEP, MIN, MAX } = rangeConfig;

  const handleChange = (
    key: "query" | "category" | "values",
    value: string | [number, number]
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <aside className="md:col-span-1 bg-white p-4 rounded-lg shadow-sm sm:h-fit md:h-[100vh]">
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1" htmlFor="search">
          Search
        </label>
        <input
          value={query}
          onChange={(e) => handleChange("query", e.target.value)}
          placeholder="Search products..."
          id="search"
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1" htmlFor="category">
          Category
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => handleChange("category", e.target.value)}
          className="w-full border rounded px-3 py-2"
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Price range</label>
        <Range
          step={STEP}
          min={MIN}
          max={MAX}
          values={values}
          onChange={(vals) => handleChange("values", vals as [number, number])}
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

        <button
          onClick={() => handleChange("values", [MIN, MAX])}
          className="mt-2 text-sm px-2 py-1 border rounded"
        >
          Reset
        </button>
      </div>

      <div className="text-sm text-gray-600">
        Showing <strong>{filteredLength}</strong> product(s)
      </div>
    </aside>
  );
};

export default Filters;
