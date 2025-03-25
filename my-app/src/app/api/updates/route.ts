import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// ✅ Fetch all updates (GET)
export async function GET() {
  try {
    const updates = await prisma.update.findMany();
    return NextResponse.json(updates, { status: 200 });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: "Failed to fetch updates" }, { status: 500 });
  }
}

// ✅ Create a new update (POST)
export async function POST(req: Request) {
  try {
    const data = await req.json();
    console.log("Received Update Data:", data);

    if (!data) {
      return NextResponse.json({ error: "Empty request body" }, { status: 400 });
    }

    const requiredFields = ["title", "description", "date"];
    const missingFields = requiredFields.filter(field => !data[field]);

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(", ")}` },
        { status: 400 }
      );
    }

    const update = await prisma.update.create({
      data: {
        title: data.title,
        description: data.description,
        date: new Date(data.date),
      },
    });

    console.log("Update Saved:", update);

    return NextResponse.json(update, { status: 201 });

  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: "Failed to create update" }, { status: 500 });
  }
}
