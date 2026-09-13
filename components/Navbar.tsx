import Link from "next/link";
import { auth } from "@/auth";
import { login, logout } from "@/app/actions/auth";

export default async function Navbar() {
  const session = await auth();

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-8">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-2xl font-bold text-white">
            SmartBank
          </Link>

          <Link href="/" className="text-slate-300 hover:text-white">
            Dashboard
          </Link>

          <Link href="/budgets" className="text-slate-300 hover:text-white">
            Budgets
          </Link>
        </div>

        {session?.user ? (
          <div className="flex items-center gap-3">
            <span className="text-sm text-white">{session.user.name}</span>

            <form action={logout}>
              <button className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-500">
                Logout
              </button>
            </form>
          </div>
        ) : (
          <form action={login}>
            <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500">
              Login
            </button>
          </form>
        )}
      </div>
    </nav>
  );
}