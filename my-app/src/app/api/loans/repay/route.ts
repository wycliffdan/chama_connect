// import { NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";

// // PUT: Submit a loan repayment
// export async function POST(req: Request) {
//   try {
//     const { loanId, amount } = await req.json();

//     // ✅ Validate input
//     if (!loanId || !amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
//       return NextResponse.json(
//         { error: "Invalid loan ID or amount" },
//         { status: 400 }
//       );
//     }

//     const parsedAmount = parseFloat(amount);

//     // ✅ Fetch the loan details
//     const loan = await prisma.loan.findUnique({
//       where: { id: loanId },
//       select: { id: true, totalRepaymentAmount: true, status: true }, // Only fetch necessary fields
//     });

//     if (!loan) {
//       return NextResponse.json({ error: "Loan not found" }, { status: 404 });
//     }

//     if (loan.status === "repaid") {
//       return NextResponse.json({ error: "Loan is already fully repaid" }, { status: 400 });
//     }

//     // ✅ Fetch all repayments made for this loan
//     const totalRepaid = await prisma.repayment.aggregate({
//       where: { loanId },
//       _sum: { amount: true },
//     });

//     const totalRepaidAmount = totalRepaid._sum.amount || 0;

//     // ✅ Check if repayment exceeds the remaining amount
//     if (parsedAmount + totalRepaidAmount > loan.totalRepaymentAmount) {
//       return NextResponse.json(
//         { error: "Repayment exceeds remaining loan balance" },
//         { status: 400 }
//       );
//     }

//     // ✅ Create a new repayment record
//     const repayment = await prisma.repayment.create({
//       data: {
//         loanId,
//         amount: parsedAmount,
//         repaidAt: new Date(),
//       },
//     });

//     // ✅ Update loan status if fully repaid
//     if (parsedAmount + totalRepaidAmount === loan.totalRepaymentAmount) {
//       await prisma.loan.update({
//         where: { id: loanId },
//         data: { status: "repaid" },
//       });
//     }

//     return NextResponse.json(repayment, { status: 200 });
//   } catch (error) {
//     console.error("Error processing repayment:", error);
//     return NextResponse.json({ error: "Failed to process repayment" }, { status: 500 });
//   }
// }



import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// ✅ Submit a loan repayment (POST)
export async function POST(req: Request) {
  try {
    const { loanId, amount } = await req.json();

    // ✅ Validate input
    if (!loanId || !amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      return NextResponse.json(
        { error: "Invalid loan ID or amount" },
        { status: 400 }
      );
    }

    const parsedAmount = parseFloat(amount);

    // ✅ Fetch the loan details
    const loan = await prisma.loan.findUnique({
      where: { id: loanId },
      select: { id: true, totalRepaymentAmount: true, status: true },
    });

    if (!loan) {
      return NextResponse.json({ error: "Loan not found" }, { status: 404 });
    }

    if (loan.status === "repaid") {
      return NextResponse.json({ error: "Loan is already fully repaid" }, { status: 400 });
    }

    // ✅ Fetch all repayments made for this loan
    const totalRepaid = await prisma.repayment.aggregate({
      where: { loanId },
      _sum: { amount: true },
    });

    const totalRepaidAmount = totalRepaid._sum.amount || 0;

    // ✅ Check if repayment exceeds the remaining amount
    if (parsedAmount + totalRepaidAmount > loan.totalRepaymentAmount) {
      return NextResponse.json(
        { error: "Repayment exceeds remaining loan balance" },
        { status: 400 }
      );
    }

    // ✅ Create a new repayment record
    const repayment = await prisma.repayment.create({
      data: {
        loanId,
        amount: parsedAmount,
        repaidAt: new Date(),
      },
    });

    // ✅ Update loan status if fully repaid
    if (parsedAmount + totalRepaidAmount === loan.totalRepaymentAmount) {
      await prisma.loan.update({
        where: { id: loanId },
        data: { status: "repaid" },
      });
    }

    return NextResponse.json(repayment, { status: 200 });
  } catch (error) {
    console.error("Error processing repayment:", error);
    return NextResponse.json({ error: "Failed to process repayment" }, { status: 500 });
  }
}
