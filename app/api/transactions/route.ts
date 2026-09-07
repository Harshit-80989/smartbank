import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const transactions = await prisma.transaction.findMany({
    orderBy: { date: "desc" },
  });

  return NextResponse.json(transactions);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const transaction = await prisma.transaction.create({
    data: {
      amount: Number(body.amount),
      category: body.category,
      description: body.description,
      date: new Date(body.date),
    },
  });

  return NextResponse.json(transaction, { status: 201 });
}