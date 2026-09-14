import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET() {
  const session = await auth();

  if (!session?.user?.email) {
    return NextResponse.json([]);
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) return NextResponse.json([]);

  const budgets = await prisma.budget.findMany({
    where: { userId: user.id },
    orderBy: { category: "asc" },
  });

  return NextResponse.json(budgets);
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

  const { category, limit } = await req.json();

  const existing = await prisma.budget.findFirst({
    where: {
      userId: user.id,
      category,
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
      userId: user.id,
    },
  });

  return NextResponse.json(budget, { status: 201 });
}

export async function PUT(req: Request) {
  const session = await auth();

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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

  const { category, limit } = await req.json();

  const existing = await prisma.budget.findFirst({
    where: {
      userId: user.id,
      category,
    },
  });

  const budget = existing
    ? await prisma.budget.update({
        where: { id: existing.id },
        data: { limit },
      })
    : await prisma.budget.create({
        data: {
          category,
          limit,
          userId: user.id,
        },
      });

  return NextResponse.json(budget);
}