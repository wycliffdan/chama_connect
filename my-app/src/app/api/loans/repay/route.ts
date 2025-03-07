

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const loanId = searchParams.get("loanId");

  if (!loanId) {
    return NextResponse.json(
      { error: "Loan ID is required" },
      { status: 400 }
    );
  }

  try {
    const repayments = await prisma.repayment.findMany({
      where: { loanId },
      orderBy: { repaidAt: "desc" },
    });

    return NextResponse.json(repayments, { status: 200 });
  } catch (error) {
    console.error("Error fetching repayments:", error);
    return NextResponse.json(
      { error: "Failed to fetch repayments" },
      { status: 500 }
    );
  }
}


// import { NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";

// export async function GET(req: Request) {
//   const { searchParams } = new URL(req.url);
//   const loanId = searchParams.get("loanId");
//   const page = parseInt(searchParams.get("page") || 1);
//   const limit = parseInt(searchParams.get("limit") || 10);

//   try {
//     const where = loanId ? { loanId } : {};
//     const repayments = await prisma.repayment.findMany({
//       where,
//       skip: (page - 1) * limit,
//       take: limit,
//       orderBy: { repaidAt: "desc" },
//     });

//     const total = await prisma.repayment.count({ where });

//     return NextResponse.json({ repayments, total }, { status: 200 });
//   } catch (error) {
//     console.error("Error fetching repayments:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch repayments" },
//       { status: 500 }
//     );
//   }
// }