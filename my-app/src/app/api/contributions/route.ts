



import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// ✅ Fetch all contributions (GET)
export async function GET() {
  try {
    const contributions = await prisma.contribution.findMany();
    return NextResponse.json(contributions, { status: 200 });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch contributions" },
      { status: 500 }
    );
  }
}

// ✅ Create a new contribution (POST)
export async function POST(req: Request) {
  try {
    const data = await req.json();
    console.log("Received Contribution Data:", data);

    if (!data || typeof data !== "object") {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }

    // Required fields
    const requiredFields = [
      "amount",
      "date",
      "month",
      "memberId",
      "chamaaId",
    ];
    const missingFields = requiredFields.filter((field) => !data[field]);

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(", ")}` },
        { status: 400 }
      );
    }

    // Validate and format the date
    const formattedDate = new Date(data.contributionDate);
    if (isNaN(formattedDate.getTime())) {
      return NextResponse.json(
        { error: "Invalid Contribution Date" },
        { status: 400 }
      );
    }

    // Create the contribution
    const contribution = await prisma.contribution.create({
      data: {
        amount: parseFloat(data.amount), // Ensure amount is a number
        // contributionDate: formattedDate, // Ensure correct date format
        date: new Date(data.date),
        month: data.month,
        memberId: data.memberId, // Ensure valid member ID
        // chamaaId: data.chamaaId, 
        // // Ensure valid chama ID
        chamaaId: data.chamaaId,
      },
    });

    console.log("Contribution Created:", contribution);
    return NextResponse.json(contribution, { status: 201 });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json(
      { error: "Failed to create contribution" },
      { status: 500 }
    );
  }
}
