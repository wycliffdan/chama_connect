import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Create a new update
export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { title, description, chamaaId, memberId } = data;

    // Validate required fields
    if (!title || !description || !chamaaId || !memberId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const update = await prisma.update.create({
      data: {
        title,
        description,
        chamaaId,
        memberId,
      },
    });

    return NextResponse.json(update, { status: 201 });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: "Failed to create update" }, { status: 500 });
  }
}

// Get all updates
export async function GET() {
  try {
    const updates = await prisma.update.findMany();
    return NextResponse.json(updates, { status: 200 });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: "Failed to fetch updates" }, { status: 500 });
  }
}

// Update an existing update
export async function PUT(req: Request) {
  try {
    const data = await req.json();
    const { id, title, description } = data;

    if (!id) {
      return NextResponse.json({ error: "Update ID is required" }, { status: 400 });
    }

    const updatedUpdate = await prisma.update.update({
      where: { id },
      data: { title, description },
    });

    return NextResponse.json(updatedUpdate, { status: 200 });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: "Failed to update update" }, { status: 500 });
  }
}

// Delete an update
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Update ID is required" }, { status: 400 });
    }

    await prisma.update.delete({ where: { id } });

    return NextResponse.json({ message: "Update deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: "Failed to delete update" }, { status: 500 });
  }
}
