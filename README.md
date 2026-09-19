# 💳 SmartBank

A modern full-stack personal finance web application built with **Next.js 16, TypeScript, Prisma, PostgreSQL, and NextAuth**. SmartBank helps users track income and expenses, manage monthly budgets, automate recurring payments, and visualize spending through interactive analytics.

## 🚀 Live Demo

**Vercel:** https://smartbank-five.vercel.app/

---

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
| Recharts          | Analytics Charts      |
| Tailwind CSS      | Styling               |
| Vercel            | Deployment            |


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

1. Stores recurring bills
2. Detects due payments
3. Creates expense transactions
4. Updates the next due date (Weekly/Monthly)

## 📊 Budget Tracking

* Create monthly spending limits
* Edit budgets anytime
* Color-coded progress bars
* Track spent vs remaining budget

## 🌐 Deployment

* **Live App:** https://smartbank-five.vercel.app/
* **Hosting:** Vercel
* **Database:** Neon PostgreSQL

## 👨‍💻 Author

**Harshit Gupta**
B.Tech Computer Science & Engineering
Babasaheb Bhimrao Ambedkar University, Lucknow

---

If you found this project useful, consider giving it a ⭐ on GitHub.
