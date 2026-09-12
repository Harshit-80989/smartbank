import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

// GET all transactions of logged-in user
export async function GET() {
  const session = await auth();

  if (!session?.user?.email) {
    return NextResponse.json([], { status: 401 });
  }

  const transactions = await prisma.transaction.findMany({
    where: {
      user: {
        email: session.user.email,
      },
    },
    orderBy: { date: "desc" },
  });

  return NextResponse.json(transactions);
}

// CREATE transaction
export async function POST(req: Request) {
  const session = await auth();

  if (!session?.user?.email) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const body = await req.json();

  const transaction = await prisma.transaction.create({
    data: {
      amount: body.amount,
      type: body.type,
      category: body.category,
      description: body.description || "",
      date: new Date(body.date),

      user: {
        connect: {
          email: session.user.email,
        },
      },
    },
  });

  return NextResponse.json(transaction, { status: 201 });
}

// DELETE transaction
export async function DELETE(req: Request) {
  const session = await auth();

  if (!session?.user?.email) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const { id } = await req.json();

  await prisma.transaction.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
}