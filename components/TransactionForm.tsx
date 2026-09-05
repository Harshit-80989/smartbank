"use client";

import { useState } from "react";
import Button from "./Button";
import BalanceCard from "./BalanceCard";
import TransactionCard from "./TansactionCard";

interface Transaction {
    id : number;
    amount : number;
    category : string;
    description : string;
    date : string;
}

export default function TransactionForm() {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const balance=transactions.reduce((acc, curr) => acc + curr.amount, 0); //Calculates the total balance by summing all transactions in the array.

  function handleAdd() {
    const amountValue = Number(amount);
    if (amountValue === 0) return;
    if (!category || !description || !date) {
      alert("Please fill in all fields.");
      return;
    }
    setTransactions([...transactions, { id: Date.now(), amount: amountValue, category: category, description: description, date: date }]); //... is the spread operator, which is used to create a new array that includes all the existing transactions plus the new amount.
    setAmount("");
    setCategory("");
    setDescription("");
    setDate("");
  }

  return (
    <div className="flex flex-col gap-4 w-full max-w-2xl mx-auto mx-auto p-6">
        <div className="grid grid-cols-2 gap-4">
      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)} //Event handler to update the amount state when the input value changes
        className="border rounded-lg px-4 py-2"
      />
      <select
        className="border rounded-lg px-4 py-2"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">Select a category</option>
        <option value="Food">Food</option>
        <option value="Transport">Transport</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Utilities">Utilities</option>
        <option value="Other">Other</option>
      </select>

      <input
        type="text"
        placeholder="Enter description"
        className="border rounded-lg px-4 py-2"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="date"
        placeholder="Enter date"
        className="border rounded-lg px-4 py-2"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      </div>

      <Button text="Add Transaction" onClick={handleAdd} />


      <BalanceCard balance={balance} />
      
      {transactions.map((transaction) => (
            <TransactionCard
                key={transaction.id}
                transaction={transaction}
            />
))}
    </div>
  );
}