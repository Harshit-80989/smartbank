import { auth } from "@/auth";
import Hero from "@/components/Hero";
import TransactionForm from "@/components/TransactionForm";
import RecurringManager from "@/components/RecurringManager";


export default async function Home() {
  const session = await auth();

  return (
    <main>
      <Hero
        title="Smart banking made simple"
        subtitle="Track transactions, manage money, and stay in control from one secure place."
        buttonText="Get started"
      />

      {session ? (
        <>
          <TransactionForm />

          <RecurringManager />
        </>
      ) : (
        <div className="mx-auto mt-10 max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
          <h2 className="text-xl font-semibold text-white">
            Sign in to continue
          </h2>
          <p className="mt-2 text-slate-400">
            Your transactions are stored securely in your account.
          </p>
        </div>
      )}
    </main>
  );
}