import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// PUT: Submit a loan repayment
export async function PUT(req: Request) {
  try {
    const { loanId, amount } = await req.json();

    // Validate input
    if (!loanId || !amount || isNaN(parseFloat(amount))) {
      return NextResponse.json(
        { error: "Loan ID and amount are required" },
        { status: 400 }
      );
    }

    // Fetch the loan to check its status and remaining amount
    const loan = await prisma.loan.findUnique({
      where: { id: loanId },
      include: { repayments: true },
    });

    if (!loan) {
      return NextResponse.json(
        { error: "Loan not found" },
        { status: 404 }
      );
    }

    if (loan.status === "repaid") {
      return NextResponse.json(
        { error: "Loan has already been repaid" },
        { status: 400 }
      );
    }

    // Create a repayment record
    const repayment = await prisma.repayment.create({
      data: {
        loanId,
        amount: parseFloat(amount),
        repaidAt: new Date(),
      },
    });

    // Update the loan status if fully repaid
    const totalRepayments = loan.repayments.reduce((sum, r) => sum + r.amount, 0) + parseFloat(amount);
    if (totalRepayments >= loan.totalRepaymentAmount) {
      await prisma.loan.update({
        where: { id: loanId },
        data: { status: "repaid" },
      });
    }

    return NextResponse.json(repayment, { status: 200 });
  } catch (error) {
    console.error("Error processing repayment:", error);
    return NextResponse.json(
      { error: "Failed to process repayment" },
      { status: 500 }
    );
  }
}