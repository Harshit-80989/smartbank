import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET() {
  const session = await auth();

  if (!session?.user?.email) {
    return NextResponse.json({ processed: 0 }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return NextResponse.json({ processed: 0 }, { status: 404 });
  }

  const duePayments = await prisma.recurringTransaction.findMany({
    where: {
      userId: user.id,
      isActive: true,
      nextDue: {
        lte: new Date(),
      },
    },
  });

  let processed = 0;

  for (const payment of duePayments) {
    await prisma.transaction.create({
      data: {
        amount: payment.amount,
        type: "expense",
        category: payment.category,
        description: payment.title,
        date: new Date(),
        userId: user.id,
      },
    });

    const nextDate = new Date(payment.nextDue);

    if (payment.frequency === "Monthly") {
      nextDate.setMonth(nextDate.getMonth() + 1);
    } else {
      nextDate.setDate(nextDate.getDate() + 7);
    }

    await prisma.recurringTransaction.update({
      where: { id: payment.id },
      data: {
        nextDue: nextDate,
      },
    });

    processed++;
  }

  return NextResponse.json({
    processed,
    message: `${processed} recurring payment(s) processed.`,
  });
}