



import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Ensure this is your correct Prisma import

export async function GET(
  req: Request,
  context: { params: { loanId: string } } // Correctly receive params in the context
) {
  try {
    // ✅ Ensure params is awaited properly
    const { loanId } = context.params;

    if (!loanId) {
      console.error("Loan ID is missing in the request");
      return NextResponse.json({ error: "Loan ID is required" }, { status: 400 });
    }

    console.log("Fetching loan with ID:", loanId);

    // Fetch the loan from the database
    const loan = await prisma.loan.findUnique({
      where: { id: loanId },
      include: { repayments: true }, // Include repayments if needed
    });

    if (!loan) {
      return NextResponse.json({ error: "Loan not found" }, { status: 404 });
    }

    return NextResponse.json(loan, { status: 200 });

  } catch (error) {
    console.error("Unexpected error fetching loan:", error);
    return NextResponse.json({ error: "Failed to fetch loan details" }, { status: 500 });
  }
}

