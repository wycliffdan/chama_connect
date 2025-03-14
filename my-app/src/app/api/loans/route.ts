import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


// ✅ Fetch loans (GET)
export async function GET() {
  try {
    const loans = await prisma.loan.findMany();
    return NextResponse.json(loans, { status: 200 });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: "Failed to fetch loans" }, { status: 500 });
  }
}

// ✅ Apply for a loan (POST)
export async function POST(req: Request) {
  try {
    const data = await req.json();
    console.log("Received Loan Data:", data);

    if (!data) {
      return NextResponse.json({ error: "Empty request body" }, { status: 400 });
    }

    const requiredFields = ["amount", "duration", "purpose"];
    const missingFields = requiredFields.filter(field => !data[field]);

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(", ")}` },
        { status: 400 }
      );
    }

    const loan = await prisma.loan.create({
      data: {
        amount: parseFloat(data.amount),
        duration: parseInt(data.duration),
        purpose: data.purpose,
        memberId: data.memberId,
        status: "Pending",
      },
    });

    console.log("Loan Saved:", loan);

    return NextResponse.json(loan, { status: 201 });

  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: "Failed to create loan" }, { status: 500 });
  }
}
