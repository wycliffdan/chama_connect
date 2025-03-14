

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const data = await req.json();
    console.log("Request data:", data);

    // Validate the request body
    if (!data || typeof data !== 'object') {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      );
    }

    const { title, description, date, time, location, agenda, organizerId, chamaaId } = data;

    // Validate required fields
    if (!title || !description || !date || !time || !location || !agenda || !organizerId || !chamaaId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create the meeting
    const meeting = await prisma.meeting.create({
      data: {
        title,
        description,
        date: new Date(date),
        time,
        location,
        agenda,
        organizerId,
        chamaaId,
        status: data.status || "Scheduled",
      },
    });

    console.log("Meeting created:", meeting);
    return NextResponse.json(meeting, { status: 201 });
} catch (error) {
  console.error("Error creating meeting:", error);
    return NextResponse.json(
      { error: "Failed to create meeting" }, // Ensure this is an object
      { status: 500 }
    );
  }
}



