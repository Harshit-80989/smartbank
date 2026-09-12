"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

interface Transaction {
  id: number;
  amount: number;
  type: string;
  category: string;
  description: string;
  date: string;
}

const COLORS = [
  "#3B82F6",
  "#22C55E",
  "#F59E0B",
  "#EF4444",
  "#A855F7",
  "#14B8A6",
];

export default function Analytics({
  transactions,
}: {
  transactions: Transaction[];
}) {
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expense;

  const categoryData: { name: string; value: number }[] = Object.values(
  transactions
    .filter((t) => t.type === "expense")
    .reduce<Record<string, { name: string; value: number }>>((acc, curr) => {
      if (!acc[curr.category]) {
        acc[curr.category] = {
          name: curr.category,
          value: 0,
        };
      }

      acc[curr.category].value += curr.amount;
      return acc;
    }, {})
);

  const monthlyData = Array.from({ length: 12 }, (_, i) => {
    const total = transactions
      .filter((t) => {
        const d = new Date(t.date);
        return t.type === "expense" && d.getMonth() === i;
      })
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      month: new Date(0, i).toLocaleString("en", { month: "short" }),
      expense: total,
    };
  });

  return (
    <div className="mt-6 space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-2xl bg-green-600/20 p-4">
          <p className="text-sm text-green-300">Income</p>
          <h3 className="text-2xl font-bold text-white">₹{income}</h3>
        </div>

        <div className="rounded-2xl bg-red-600/20 p-4">
          <p className="text-sm text-red-300">Expense</p>
          <h3 className="text-2xl font-bold text-white">₹{expense}</h3>
        </div>

        <div className="rounded-2xl bg-blue-600/20 p-4">
          <p className="text-sm text-blue-300">Balance</p>
          <h3 className="text-2xl font-bold text-white">₹{balance}</h3>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h3 className="mb-4 text-lg font-semibold text-white">
          Expense by Category
        </h3>

        {categoryData.length === 0 ? (
          <p className="text-slate-400">No expense data yet.</p>
        ) : (
          <>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={90}
                    label
                  >
                    {categoryData.map((_, index) => (
                      <Cell
                        key={index}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              {categoryData.map((item, index) => (
                <div
                  key={item.name}
                  className="flex items-center gap-2 text-sm"
                >
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{
                      backgroundColor:
                        COLORS[index % COLORS.length],
                    }}
                  />
                  <span className="text-slate-300">{item.name}</span>
                  <span className="ml-auto text-white">₹{item.value}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Bar Chart */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h3 className="mb-4 text-lg font-semibold text-white">
          Monthly Expenses
        </h3>

        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData}>
              <CartesianGrid stroke="#334155" strokeDasharray="3 3" />
              <XAxis dataKey="month" stroke="#CBD5E1" />
              <YAxis stroke="#CBD5E1" />
              <Tooltip />
              <Bar
                dataKey="expense"
                fill="#3B82F6"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}