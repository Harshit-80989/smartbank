"use client";

import { useEffect, useState } from "react";

interface Budget {
  id: number;
  category: string;
  limit: number;
}

interface Transaction {
  amount: number;
  category: string;
  type: string;
}

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
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const loadBudgets = async () => {
    const res = await fetch("/api/budgets");

    if (!res.ok) return;

    const data = await res.json();
    console.log("Budgets:", data);
    setBudgets(data);
  };

  const loadTransactions = async () => {
    const res = await fetch("/api/transactions");

    if (!res.ok) return;

    const data = await res.json();
    setTransactions(data);
  };

  useEffect(() => {
    loadBudgets();
    loadTransactions();
  }, []);

  const handleSave = async () => {
    if (!limit) return;

    const res = await fetch("/api/budgets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        category,
        limit: Number(limit),
      }),
    });

    if (!res.ok) {
      alert("Failed to save budget");
      return;
    }

    setLimit("");
    await loadBudgets();
  };

  return (
    <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
      <h2 className="mb-6 text-2xl font-semibold text-white">
        Monthly Budgets
      </h2>

      <div className="grid gap-4 md:grid-cols-2">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-xl border border-white/10 bg-slate-800 p-3 text-white"
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
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
        className="mt-6 w-full rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-500"
      >
        Save Budget
      </button>

      <div className="mt-8 space-y-4">
        {budgets.length === 0 ? (
          <p className="text-center text-slate-400">
            No budgets yet. Create your first budget above.
          </p>
        ) : (
          budgets.map((budget) => {
            const spent = transactions
              .filter(
                (t) =>
                  t.type === "expense" &&
                  t.category === budget.category
              )
              .reduce((sum, t) => sum + t.amount, 0);

            const percentage =
              budget.limit === 0
                ? 0
                : Math.min((spent / budget.limit) * 100, 100);

            const barColor =
              percentage < 60
                ? "bg-green-500"
                : percentage < 90
                ? "bg-yellow-500"
                : "bg-red-500";

            return (
              <div
                key={budget.id}
                className="rounded-2xl border border-white/10 bg-white/5 p-5"
              >
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white">
                    {budget.category}
                  </h3>

                  <span className="text-sm text-slate-300">
                    ₹{spent} / ₹{budget.limit}
                  </span>
                </div>

                <div className="h-3 w-full rounded-full bg-slate-700">
                  <div
                    className={`h-full rounded-full ${barColor} transition-all duration-500`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>

                <div className="mt-2 flex justify-between text-xs">
                  <span className="text-slate-400">
                    {percentage.toFixed(0)}% used
                  </span>

                  {percentage >= 100 && (
                    <span className="font-medium text-red-400">
                      Budget exceeded!
                    </span>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}