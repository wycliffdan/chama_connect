import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ✅ Add this GET method to fetch contributions
export async function GET() {
  try {
    const contributions = await prisma.contribution.findMany();
    
    return NextResponse.json(
      contributions, // Returning the fetched data
      { status: 200 }
    );

  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: "Failed to fetch contributions" }, { status: 500 });
  }
}





// ✅ Keep your existing POST method for adding new contributions
// export async function POST(req: Request) {
//   try {
//     const data = await req.json();
    
//     const requiredFields = ['amount', 'date', 'memberId', 'chamaaId'];
//     const missingFields = requiredFields.filter(field => !data[field]);
    
//     if (missingFields.length > 0) {
//       return NextResponse.json(
//         { error: `Missing required fields: ${missingFields.join(', ')}` },
//         { status: 400 }
//       );
//     }

//     const dateObj = new Date(data.date);
    
//     const contribution = await prisma.contribution.create({
//       data: {
//         amount: parseFloat(data.amount),
//         date: dateObj,
//         year: dateObj.getFullYear(),
//         month: dateObj.getMonth() + 1,
//         memberId: data.memberId,
//         chamaaId: data.chamaaId,
//         status: "Pending"
//       }
//     });

//     return NextResponse.json(contribution, { status: 201 });

//   } catch (error) {
//     console.error("Database Error:", error);
//     return NextResponse.json({ error: "Failed to create contribution" }, { status: 500 });
//   }
// }


