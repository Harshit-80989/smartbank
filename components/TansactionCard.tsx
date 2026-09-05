export interface TransactionCardProps {
    transaction: {
        id: number;
        amount: number;
        category: string;
        description: string;
        date: string;
    };
}
export default function TransactionCard({ transaction }: TransactionCardProps) {
    return (
        <div className="border rounded-lg p-4 flex justify-between items-start">
            <div>
                <p className="inline-block rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-800">{transaction.category}</p>
                <p className="text-sm text-gray-600">{transaction.description}</p>
                <p className="text-xs text-gray-400">{transaction.date}</p>
            </div>
            <p className="font-bold text-green-600">₹{transaction.amount}</p>
        </div>
    );
}