import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET() {
  const session = await auth();

  if (!session?.user?.email) {
    return NextResponse.json([], { status: 200 });
  }

  const budgets = await prisma.budget.findMany({
    where: {
      user: {
        email: session.user.email,
      },
    },
    orderBy: {
      category: "asc",
    },
  });

  return NextResponse.json(budgets);
}

export async function POST(req: Request) {
  const session = await auth();

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { category, limit } = await req.json();

  const existing = await prisma.budget.findFirst({
    where: {
      category,
      user: {
        email: session.user.email,
      },
    },
  });

  if (existing) {
    const updated = await prisma.budget.update({
      where: { id: existing.id },
      data: { limit },
    });

    return NextResponse.json(updated);
  }

  const budget = await prisma.budget.create({
    data: {
      category,
      limit,
      user: {
        connect: {
          email: session.user.email,
        },
      },
    },
  });

  return NextResponse.json(budget, { status: 201 });
}