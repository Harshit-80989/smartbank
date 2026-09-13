"use client";

import { useState } from "react";

const categories = [
  "Food",
  "Transport",
  "Entertainment",
  "Utilities",
  "Shopping",
  "Other",
];

export default function BudgetManager() {
  const [category, setCategory] = useState("Food");
  const [limit, setLimit] = useState("");

  const handleSave = () => {
    alert(`Budget saved for ${category}: ₹${limit}`);
    setLimit("");
  };

  return (
    <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
      <h2 className="mb-6 text-2xl font-semibold text-white">
        Set Monthly Budget
      </h2>

      <div className="grid gap-4 md:grid-cols-2">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-xl border border-white/10 bg-slate-800 p-3 text-white"
        >
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Budget amount"
          value={limit}
          onChange={(e) => setLimit(e.target.value)}
          className="rounded-xl border border-white/10 bg-white/5 p-3 text-white placeholder:text-slate-400"
        />
      </div>

      <button
        onClick={handleSave}
        className="mt-6 w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-500"
      >
        Save Budget
      </button>
    </div>
  );
}