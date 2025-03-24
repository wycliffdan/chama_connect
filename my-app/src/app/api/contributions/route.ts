import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const data = await req.json();
    console.log("Received Contribution Data:", data);

    // Validate required fields
    if (!data.amount || !data.contributorId || !data.chamaaId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Create the contribution
    const contribution = await prisma.contribution.create({
      data: {
        amount: data.amount,
        contributorId: data.contributorId,
        chamaaId: data.chamaaId,
        status: data.status || "Pending",
      },
    });

    console.log("Contribution Created:", contribution);
    return NextResponse.json(contribution, { status: 201 });

  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: "Failed to create contribution" }, { status: 500 });
  }
}
