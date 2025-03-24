


import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// ✅ Fetch meetings (GET)
export async function GET() {
  try {
    const meetings = await prisma.meeting.findMany();
    return NextResponse.json(meetings, { status: 200 });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: "Failed to fetch meetings" }, { status: 500 });
  }
}

// ✅ Schedule a meeting (POST)
export async function POST(req: Request) {
  try {
    const data = await req.json();
    console.log("Received Meeting Data:", data);

    if (!data || typeof data !== "object") {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }

    // Debugging: Ensure data fields are correctly received
    console.log("Validated Meeting Data:", data);

    const requiredFields = [
      "title",
      "description",
      "date",
      "time",
      "location",
      "agenda",
      "organizerId",
      "chamaaId",
    ];
    const missingFields = requiredFields.filter((field) => !data[field]);

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(", ")}` },
        { status: 400 }
      );
    }

    // Ensure organizerId and chamaaId are valid (if they're supposed to be numbers)
    const meeting = await prisma.meeting.create({
      data: {
        title: data.title,
        description: data.description,
        date: new Date(data.date),
        time: data.time,
        location: data.location,
        agenda: data.agenda,
        organizerId: data.organizerId, // Ensure this is a valid user ID
        chamaaId: data.chamaaId, // Ensure this is a valid chamaa ID
        status: data.status || "Scheduled",
      },
    });

    console.log("Meeting Scheduled:", meeting);
    return NextResponse.json(meeting, { status: 201 });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json(
      { error: "Failed to create meeting" },
      { status: 500 }
    );
  }
}
