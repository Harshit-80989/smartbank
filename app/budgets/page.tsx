import BudgetManager from "@/components/BudgetManager";

export default function BudgetsPage() {
  return (
    <main className="min-h-screen bg-[#0B1120] px-6 py-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-4xl font-bold text-white">Monthly Budgets</h1>
        <p className="mt-2 text-slate-400">
          Set spending limits and track your progress.
        </p>

        <BudgetManager />
      </div>
    </main>
  );
}