import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET() {
  const session = await auth();

  if (!session?.user?.email) {
    return NextResponse.json([], { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) return NextResponse.json([], { status: 404 });

  const transactions = await prisma.transaction.findMany({
    where: { user: { id: user.id } },
    orderBy: { date: "desc" },
  });

  return NextResponse.json(transactions);
}

export async function POST(req: Request) {
  const session = await auth();

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const body = await req.json();

  const transaction = await prisma.transaction.create({
    data: {
      amount: body.amount,
      type: body.type,
      category: body.category,
      description: body.description || "",
      date: new Date(body.date),
      userId: user.id,
    },
  });

  return NextResponse.json(transaction, { status: 201 });
}

export async function DELETE(req: Request) {
  const session = await auth();

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await req.json();

  await prisma.transaction.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
}