



"use client";

import { getAllMeetings } from "@/lib/meetings";
import { useEffect, useState } from "react";
// import { getAllMeetings } from "@/lib/meetings";

export default function MeetingsTable() {
  const [meetings, setMeetings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const data = await getAllMeetings();
        setMeetings(data);
      } catch (error) {
        console.error("Error fetching meetings:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMeetings();
  }, []);

  if (isLoading) {
    return <p>Loading meetings...</p>;
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Upcoming Meetings</h2>
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left">Title</th>
            <th className="text-left">Date</th>
            <th className="text-left">Time</th>
            <th className="text-left">Location</th>
            <th className="text-left">Organizer</th>
          </tr>
        </thead>
        <tbody>
          {meetings.map((meeting) => (
            <tr key={meeting.id} className="border-b">
              <td className="py-2">{meeting.title}</td>
              <td className="py-2">{new Date(meeting.date).toLocaleDateString()}</td>
              <td className="py-2">{meeting.time}</td>
              <td className="py-2">{meeting.location}</td>
              <td className="py-2">{meeting.organizer}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}