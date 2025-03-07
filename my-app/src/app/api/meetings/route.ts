
// import { NextApiRequest, NextApiResponse } from "next";
// import { getAllMeetings } from "@/lib/meetings";

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === "GET") {
//     const meetings = await getAllMeetings();
//     res.status(200).json(meetings);
//   } else {
//     res.status(405).json({ message: "Method Not Allowed" });
//   }
// }


import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma";

// export async function POST(req: Request) {
//   try {
//     const data = await req.json();
//     console.log("Request body:", data); // Debugging step

//     if (!data || Object.keys(data).length === 0) {
//       return NextResponse.json(
//         { error: "Request body is empty or invalid" },
//         { status: 400 }
//       );
//     }

//     const meeting = await prisma.meeting.create({
//       data: {
//         title: data.title,
//         description: data.description,
//         date: new Date(data.date),
//         time: data.time,
//         location: data.location,
//         agenda: data.agenda,
//         organizerId: data.organizerId,
//         chamaaId: data.chamaaId,
//         status: data.status || "Scheduled",
//       },
//     });

//     return NextResponse.json(meeting, { status: 201 });
//   } catch (error) {
//     console.error("Error creating meeting:", error);
//     return NextResponse.json(
//       { error: "Failed to create meeting" },
//       { status: 500 }
//     );
//   }
// }








export async function POST(req: Request) {
  try {
    const data = await req.json();
    console.log("Request data:", data);

    const meeting = await prisma.meeting.create({
      data: {
        title: data.title,
        description: data.description,
        date: new Date(data.date),
        time: data.time,
        location: data.location,
        agenda: data.agenda,
        organizerId: data.organizerId,
        chamaaId: data.chamaaId,
        status: data.status || "Scheduled",
      },
    });

    console.log("Meeting created:", meeting);
    return NextResponse.json(meeting, { status: 201 });
  } catch (error) {
    console.error("Error creating meeting:", error);
    return NextResponse.json(
      { error: "Failed to create meeting" },
      { status: 500 }
    );
  }
}