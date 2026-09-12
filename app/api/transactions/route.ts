import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "../../../auth";

export async function GET() {
  const transactions = await prisma.transaction.findMany({
    orderBy: { date: "desc" },
  });

  return NextResponse.json(transactions);
}

export async function POST(request: NextRequest) {
  const session = await auth();

  if (!session?.user?.email) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const body = await request.json();

  const selectedDate = new Date(body.date);
  const today = new Date();

  // Allow today, reject future dates
  today.setHours(23, 59, 59, 999);

  if (selectedDate > today) {
    return Response.json(
      { error: "Future dates are not allowed" },
      { status: 400 },
    );
  }

  const transaction = await prisma.transaction.create({
  data: {
    amount: body.amount,
    type: body.type,
    category: body.category,
    description: body.description || "", // allow empty note for income
    date: new Date(body.date),
    userId: session.user.id,
  },
});

  return NextResponse.json(transaction, { status: 201 });
}

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