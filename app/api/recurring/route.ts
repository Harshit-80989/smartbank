import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

// GET all recurring transactions
export async function GET() {
  const session = await auth();

  if (!session?.user?.email) {
    return NextResponse.json([]);
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) return NextResponse.json([]);

  const recurring = await (prisma as any).recurringTransaction.findMany({
    where: {
      userId: user.id,
      isActive: true,
    },
    orderBy: {
      nextDue: "asc",
    },
  });

  return NextResponse.json(recurring);
}

// CREATE recurring transaction
export async function POST(req: Request) {
  const session = await auth();

  if (!session?.user?.email) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return NextResponse.json(
      { error: "User not found" },
      { status: 404 }
    );
  }

  const body = await req.json();

  const recurring = await (prisma as any).recurringTransaction.create({
    data: {
      title: body.title,
      amount: Number(body.amount),
      category: body.category,
      frequency: body.frequency,
      nextDue: new Date(body.nextDue),
      userId: user.id,
    },
  });

  return NextResponse.json(recurring, { status: 201 });
}

// DELETE recurring transaction
export async function DELETE(req: Request) {
  const { id } = await req.json();

  await (prisma as any).recurringTransaction.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
}

// MARK AS PAID
export async function PATCH(req: Request) {
  const { id } = await req.json();

  const recurring = await (prisma as any).recurringTransaction.findUnique({
    where: { id },
  });

  if (!recurring) {
    return NextResponse.json(
      { error: "Not found" },
      { status: 404 }
    );
  }

  const nextDate = new Date(recurring.nextDue);

  if (recurring.frequency === "Monthly") {
    nextDate.setMonth(nextDate.getMonth() + 1);
  } else {
    nextDate.setDate(nextDate.getDate() + 7);
  }

  const updated = await (prisma as any).recurringTransaction.update({
    where: { id },
    data: {
      nextDue: nextDate,
    },
  });

  return NextResponse.json(updated);
}