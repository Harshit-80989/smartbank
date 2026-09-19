import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET() {
  const session = await auth();

  if (!session?.user?.email) return NextResponse.json([]);

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) return NextResponse.json([]);

  const goals = await (prisma as any).savingsGoal.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(goals);
}

export async function POST(req: Request) {
  const session = await auth();

  if (!session?.user?.email)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user)
    return NextResponse.json({ error: "User" }, { status: 404 });

  const body = await req.json();

  const goal = await (prisma as any).savingsGoal.create({
    data: {
      title: body.title,
      target: Number(body.target),
      saved: Number(body.saved || 0),
      userId: user.id,
    },
  });

  return NextResponse.json(goal);
}