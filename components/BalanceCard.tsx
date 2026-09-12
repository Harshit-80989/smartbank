interface BalanceCardProps {
  balance: number;
}
export default function BalanceCard({ balance }: BalanceCardProps) {
  return (
    <div className="bg-gradient-to-br from-blue-600 to-blue-800 shadow-lg rounded-2xl p-6 w-full">
      <h2 className="text-sm font-bold mb-4">Current Balance</h2>
      <p className="text-4xl font-bold text-white">
        ₹{balance.toLocaleString("en-IN")}
      </p>
    </div>
  );
}
