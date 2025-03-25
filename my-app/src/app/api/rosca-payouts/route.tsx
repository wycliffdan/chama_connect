



import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// ✅ Fetch all Payouts (GET)
export async function GET() {
  try {
    const payouts = await prisma.payout.findMany();
    return NextResponse.json(payouts, { status: 200 });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: "Failed to fetch payouts" }, { status: 500 });
  }
}

// ✅ Create a Payout (POST)
export async function POST(req) {
  try {
    const data = await req.json();
    console.log("Received Payout Data:", data);

    // ✅ Ensure required fields exist
    if (!data.roscaId || !data.memberId || !data.amount) {
      return NextResponse.json(
        { error: "Missing required fields: roscaId, memberId, amount" },
        { status: 400 }
      );
    }

    // ✅ Convert amount to Float
    const payout = await prisma.payout.create({
      data: {
        roscaId: parseInt(data.roscaId),
        memberId: parseInt(data.memberId),
        amount: parseFloat(data.amount),
        status: "Pending", // Default status
      },
    });

    return NextResponse.json(payout, { status: 201 });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: "Failed to create payout" }, { status: 500 });
  }
}








