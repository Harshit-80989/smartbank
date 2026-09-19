# 💳 SmartBank

A modern full-stack personal finance web application built with **Next.js 16, TypeScript, Prisma, PostgreSQL, and NextAuth**. SmartBank helps users track income and expenses, manage monthly budgets, automate recurring payments, and visualize spending through interactive analytics.

## ✨ Features

* 🔐 Secure Google Authentication (NextAuth)
* 💰 Track Income & Expense Transactions
* 📊 Real-time Balance Dashboard
* 📈 Interactive Analytics (Pie & Bar Charts)
* 🎯 Monthly Budget Management with Progress Bars
* ✏️ Edit Existing Budgets
* 🔁 Recurring Payments with Automatic Processing
* 📱 Responsive Dark UI for Desktop & Mobile
* ☁️ Deployed on Vercel with Neon PostgreSQL

## 🛠️ Tech Stack

| Technology        | Purpose               |
| ----------------- | --------------------- |
| Next.js 16        | Frontend & App Router |
| TypeScript        | Type safety           |
| React 19          | UI                    |
| Prisma ORM        | Database ORM          |
| PostgreSQL (Neon) | Database              |
| NextAuth          | Authentication        |
| Recharts          | Analytics charts      |
| Tailwind CSS      | Styling               |
| Vercel            | Deployment            |

## 📸 Screenshots

*Add screenshots of Dashboard, Budgets, and Analytics here.*

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/smartbank.git
cd smartbank
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file:

```env
DATABASE_URL=your_neon_database_url

AUTH_SECRET=your_secret

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

NEXTAUTH_URL=http://localhost:3000
```

### 4. Generate Prisma Client

```bash
npx prisma generate
```

### 5. Run migrations

```bash
npx prisma migrate dev
```

### 6. Start the development server

```bash
npm run dev
```

Visit **http://localhost:3000**

## 📂 Project Structure

```text
app/
 ├── api/
 │    ├── auth/
 │    ├── transactions/
 │    ├── budgets/
 │    └── recurring/
 ├── budgets/
 └── page.tsx

components/
 ├── TransactionForm
 ├── BalanceCard
 ├── BudgetManager
 ├── Analytics
 └── RecurringManager

prisma/
 └── schema.prisma
```

## 🔄 Recurring Payments

SmartBank automatically:

1. Stores recurring bills.
2. Checks for due payments.
3. Creates an expense transaction.
4. Moves the next due date forward (Weekly/Monthly).

## 📊 Budget Tracking

* Create monthly spending limits
* Edit budgets anytime
* Color-coded progress bars
* Track amount spent vs remaining budget

## 🌐 Deployment

This project is deployed using **Vercel** with **Neon PostgreSQL**.

## 👨‍💻 Author

**Harshit Gupta**

B.Tech Computer Science & Engineering

Babasaheb Bhimrao Ambedkar University, Lucknow

---

If you found this project useful, consider giving it a ⭐ on GitHub.
