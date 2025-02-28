
// import { PrismaClient } from "@/prisma/"
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Create a new meeting
export async function createMeeting(data: {
  title: string;
  description: string;
  date: Date;
  time: string;
  location: string;
  agenda: string;
  organizer: string;
  attendees: string[];
  status?: string;
}) {
  return prisma.meeting.create({
    data: {
      title: data.title,
      description: data.description,
      date: data.date,
      time: data.time,
      location: data.location,
      agenda: data.agenda,
      organizer: data.organizer,
      attendees: data.attendees,
      status: data.status || "Scheduled",
    },
  });
}

// Get all meetings
export async function getAllMeetings() {
  return prisma.meeting.findMany();
}

// Get a meeting by ID
export async function getMeetingById(id: number) {
  return prisma.meeting.findUnique({
    where: { id },
  });
}

// Update a meeting
export async function updateMeeting(
  id: number,
  data: {
    title?: string;
    description?: string;
    date?: Date;
    time?: string;
    location?: string;
    agenda?: string;
    organizer?: string;
    attendees?: string[];
    status?: string;
  }
) {
  return prisma.meeting.update({
    where: { id },
    data,
  });
}

// Delete a meeting
export async function deleteMeeting(id: number) {
  return prisma.meeting.delete({
    where: { id },
  });
}