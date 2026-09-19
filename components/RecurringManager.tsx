"use client";

import { useEffect, useState } from "react";

interface Recurring {
  id: number;
  title: string;
  amount: number;
  category: string;
  frequency: string;
  nextDue: string;
}

const categories = [
  "Food",
  "Transport",
  "Entertainment",
  "Utilities",
  "Shopping",
  "Other",
];

export default function RecurringManager() {
  const [items, setItems] = useState<Recurring[]>([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Utilities");
  const [frequency, setFrequency] = useState("Monthly");
  const [nextDue, setNextDue] = useState("");

  const loadRecurring = async () => {
    const res = await fetch("/api/recurring");
    const data = await res.json();
    setItems(data);
  };

  useEffect(() => {
    fetch("/api/recurring/process");
    loadRecurring();
  }, []);

  const handleSave = async () => {
    if (!title || !amount || !nextDue) return;

    const res = await fetch("/api/recurring", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        amount,
        category,
        frequency,
        nextDue,
      }),
    });

    if (!res.ok) {
      alert("Failed");
      return;
    }

    setTitle("");
    setAmount("");
    setNextDue("");

    await loadRecurring();
  };

  const handleDelete = async (id: number) => {
  await fetch("/api/recurring", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });

  loadRecurring();
};

const markPaid = async (id: number) => {
  await fetch("/api/recurring", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });

  loadRecurring();
};
  return (
    <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
      <h2 className="mb-6 text-2xl font-semibold text-white">
        Recurring Payments
      </h2>

      <div className="grid gap-4 md:grid-cols-2">
        <input
          placeholder="Netflix / Rent"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="rounded-xl bg-slate-800 p-3 text-white"
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="rounded-xl bg-slate-800 p-3 text-white"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-xl bg-slate-800 p-3 text-white"
        >
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        <select
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
          className="rounded-xl bg-slate-800 p-3 text-white"
        >
          <option>Monthly</option>
          <option>Weekly</option>
        </select>

        <input
          type="date"
          value={nextDue}
          onChange={(e) => setNextDue(e.target.value)}
          className="rounded-xl bg-slate-800 p-3 text-white md:col-span-2"
        />
      </div>

      <button
        onClick={handleSave}
        className="mt-6 w-full rounded-xl bg-purple-600 py-3 font-semibold text-white hover:bg-purple-500"
      >
        Add Recurring Payment
      </button>

      <div className="mt-8 space-y-4">
  {items.length === 0 ? (
    <p className="text-slate-400">
      No recurring payments yet.
    </p>
  ) : (
    items.map((item) => (
      <div
        key={item.id}
        className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4"
      >
        <div>
          <h3 className="font-semibold text-white">
            {item.title}
          </h3>

          <p className="text-sm text-slate-400">
            {item.category} • {item.frequency}
          </p>
        </div>

        <div className="text-right">
          <p className="font-bold text-white">
            ₹{item.amount}
          </p>

          <p className="mb-2 text-xs text-slate-400">
            Due {new Date(item.nextDue).toLocaleDateString()}
          </p>

          <div className="flex justify-end gap-2">
            <button
              onClick={() => markPaid(item.id)}
              className="rounded-lg bg-green-600 px-3 py-1 text-xs text-white hover:bg-green-500"
            >
              Paid
            </button>

            <button
              onClick={() => handleDelete(item.id)}
              className="rounded-lg bg-red-600 px-3 py-1 text-xs text-white hover:bg-red-500"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    ))
  )}
</div>
    </div>
  );
}