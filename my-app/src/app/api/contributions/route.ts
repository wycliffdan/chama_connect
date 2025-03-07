import { NextResponse } from "next/server";



import { prisma } from "@/lib/prisma";

// POST: Submit a contribution
export async function POST(req: Request) {
  const { amount, userId, chamaaId, month, year } = await req.json();

  try {
    const contribution = await prisma.contribution.create({
      data: {
        amount,
        userId,
        chamaaId,
        month,
        year,
      },
    });

    return NextResponse.json(contribution, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to submit contribution" },
      { status: 500 }
    );
  }
}

// GET: Fetch contributions for the current month
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const month = searchParams.get("month");
  const year = searchParams.get("year");
  const chamaaId = searchParams.get("chamaaId");

  if (!month || !year || !chamaaId) {
    return NextResponse.json(
      { error: "Month, year, and chamaaId are required" },
      { status: 400 }
    );
  }

  try {
    const contributions = await prisma.contribution.findMany({
      where: {
        month: parseInt(month),
        year: parseInt(year),
        chamaaId,
      },
      include: {
        user: true, // Include user details
      },
    });

    return NextResponse.json(contributions, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch contributions" },
      { status: 500 }
    );
  }
}