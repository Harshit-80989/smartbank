interface TransactionCardProps {
  transaction: {
    id: number;
    amount: number;
    type: string;
    category: string;
    description: string;
    date: string;
  };
  onDelete: (id: number) => void;
}

export default function TransactionCard({
  transaction,
  onDelete,
}: TransactionCardProps) {
  const isIncome = transaction.type === "income";

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-lg transition hover:bg-white/10">
      <div className="flex items-start justify-between">
        <div>
          <span className="rounded-full bg-yellow-400/20 px-3 py-1 text-xs font-medium text-yellow-300">
            {transaction.category}
          </span>

          <h3 className="mt-3 text-lg font-semibold text-white">
            {transaction.description}
          </h3>

          <p className="mt-1 text-sm text-slate-400">
            {transaction.date}
          </p>
        </div>

        <div className="flex flex-col items-end gap-3">
          <p
            className={`text-xl font-bold ${
              isIncome ? "text-emerald-400" : "text-red-400"
            }`}
          >
            {isIncome ? "+" : "-"}₹{transaction.amount}
          </p>

          <button
            onClick={() => onDelete(transaction.id)}
            className="text-sm text-red-400 hover:text-red-300"
          >
            🗑 Delete
          </button>
        </div>
      </div>
    </div>
  );
}