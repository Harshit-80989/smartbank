"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useEffect, useState } from "react";
import Button from "./Button";
import BalanceCard from "./BalanceCard";
import TransactionCard from "./TansactionCard";
import Analytics from "./Analytics";

interface Transaction {
  id: number;
  amount: number;
  type: string;
  category: string;
  description: string;
  date: string;
}

export default function TransactionForm() {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");

  const today = new Date().toISOString().split("T")[0];
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const balance = transactions.reduce((acc, curr) => {
    return curr.type === "income"
      ? acc + curr.amount
      : acc - curr.amount;
  }, 0);

  const loadTransactions = async () => {
  const response = await fetch("/api/transactions");

  if (!response.ok) {
    // User logged out
    setTransactions([]);
    setAmount("");
    setCategory("");
    setDescription("");
    setDate("");
    setType("expense");
    return;
  }

  const data = await response.json();
  setTransactions(data);
};
  useEffect(() => {
  loadTransactions();
}, []);

  const handleAdd = async () => {
    const amountValue = Number(amount);

    if (amountValue <= 0) return;

    if (!category || !date || !amountValue) {
  alert("Please fill all required fields");
  return;
}

if (type === "expense" && !description) {
  alert("Please enter a description");
  return;
}

    const response = await fetch("/api/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: amountValue,
        type,
        category,
        description,
        date,
      }),
    });

    if (!response.ok) {
      alert("Failed to save transaction");
      return;
    }

    await loadTransactions();

    setAmount("");
    setCategory("");
    setDescription("");
    setDate("");
    setType("expense");
  };

  const handleDelete = async (id: number) => {
    const response = await fetch("/api/transactions", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    if (!response.ok) {
      alert("Failed to delete transaction");
      return;
    }

    await loadTransactions();
  };

  return (
    <div className="mx-auto w-full max-w-2xl rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-white">
          Add New Transaction
        </h2>
        <p className="mt-1 text-sm text-slate-400">
          Record your income and expenses instantly.
        </p>
      </div>

      {/* Income / Expense Toggle */}
      <div className="mb-4 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => setType("income")}
          className={`rounded-lg py-2 font-medium transition ${
            type === "income"
              ? "bg-green-600 text-white"
              : "bg-slate-800 text-slate-300"
          }`}
        >
          Income
        </button>

        <button
          type="button"
          onClick={() => setType("expense")}
          className={`rounded-lg py-2 font-medium transition ${
            type === "expense"
              ? "bg-red-600 text-white"
              : "bg-slate-800 text-slate-300"
          }`}
        >
          Expense
        </button>
      </div>

      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:bg-white/10"
          />

          <Select value={category} onValueChange={(value) => setCategory(value ?? "")}>
  <SelectTrigger className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white">
    <SelectValue
      placeholder={
        type === "income"
          ? "Select income source"
          : "Select category"
      }
    />
  </SelectTrigger>

  <SelectContent className="border border-white/10 bg-slate-900 text-white">
    {type === "income" ? (
      <>
        <SelectItem value="Salary">Salary</SelectItem>
        <SelectItem value="Freelance">Freelance</SelectItem>
        <SelectItem value="Business">Business</SelectItem>
        <SelectItem value="Investment">Investment</SelectItem>
        <SelectItem value="Gift">Gift</SelectItem>
        <SelectItem value="Other Income">Other Income</SelectItem>
      </>
    ) : (
      <>
        <SelectItem value="Food">Food</SelectItem>
        <SelectItem value="Transport">Transport</SelectItem>
        <SelectItem value="Entertainment">Entertainment</SelectItem>
        <SelectItem value="Utilities">Utilities</SelectItem>
        <SelectItem value="Shopping">Shopping</SelectItem>
        <SelectItem value="Other">Other</SelectItem>
      </>
    )}
  </SelectContent>
</Select>

          <input
            type="text"
            placeholder={
    type === "income"
      ? "Note (optional)"
      : "Enter description"
  }
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:bg-white/10"
          />

          <input
            type="date"
            value={date}
            max={today}
            onChange={(e) => setDate(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-blue-500 focus:bg-white/10"
          />
        </div>

        <div className="pt-2">
          <Button text="Add Transaction" onClick={handleAdd} />
        </div>
      </div>

      <div className="mt-4">
        <BalanceCard balance={balance} />
      </div>

      <Analytics transactions={transactions} />
      
      <div className="mt-4 flex flex-col gap-3">
        {transactions.map((transaction) => (
          <TransactionCard
            key={transaction.id}
            transaction={{
              ...transaction,
              date: transaction.date.slice(0, 10),
            }}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}