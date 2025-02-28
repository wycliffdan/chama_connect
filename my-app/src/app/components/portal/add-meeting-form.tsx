// "use client"; // Required for client-side interactivity

// import { useState } from "react";

// export default function AddMeetingForm() {
//   const [date, setDate] = useState("");
//   const [time, setTime] = useState("");
//   const [location, setLocation] = useState("");
//   const [agenda, setAgenda] = useState("");

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     // Add logic to save the meeting (e.g., API call)
//     console.log({ date, time, location, agenda });
//     alert("Meeting added successfully!");
//     setDate("");
//     setTime("");
//     setLocation("");
//     setAgenda("");
//   };

//   return (
//     <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow">
//       <h2 className="text-xl font-semibold mb-4">Add New Meeting</h2>
//       <div className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium">Date</label>
//           <input
//             type="date"
//             value={date}
//             onChange={(e) => setDate(e.target.value)}
//             className="w-full p-2 border rounded"
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium">Time</label>
//           <input
//             type="time"
//             value={time}
//             onChange={(e) => setTime(e.target.value)}
//             className="w-full p-2 border rounded"
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium">Location</label>
//           <input
//             type="text"
//             value={location}
//             onChange={(e) => setLocation(e.target.value)}
//             className="w-full p-2 border rounded"
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium">Agenda</label>
//           <textarea
//             value={agenda}
//             onChange={(e) => setAgenda(e.target.value)}
//             className="w-full p-2 border rounded"
//             required
//           />
//         </div>
//         <button
//           type="submit"
//           className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           Add Meeting
//         </button>
//       </div>
//     </form>
//   );
// }

"use client";

import { useState } from "react";
import { createMeeting } from "@/lib/meetings";

export default function AddMeetingForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [agenda, setAgenda] = useState("");
  const [organizer, setOrganizer] = useState("");
  const [attendees, setAttendees] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!title) newErrors.title = "Title is required.";
    if (!description) newErrors.description = "Description is required.";
    if (!date) newErrors.date = "Date is required.";
    if (!time) newErrors.time = "Time is required.";
    if (!location) newErrors.location = "Location is required.";
    if (!agenda) newErrors.agenda = "Agenda is required.";
    if (!organizer) newErrors.organizer = "Organizer is required.";
    if (!attendees) newErrors.attendees = "Attendees are required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setSuccessMessage("");

    try {
      await createMeeting({
        title,
        description,
        date: new Date(date),
        time,
        location,
        agenda,
        organizer,
        attendees: attendees.split(",").map((a) => a.trim()),
      });

      setSuccessMessage("Meeting added successfully!");
      // Clear form
      setTitle("");
      setDescription("");
      setDate("");
      setTime("");
      setLocation("");
      setAgenda("");
      setOrganizer("");
      setAttendees("");
    } catch (error) {
      console.error("Error adding meeting:", error);
      alert("Failed to add meeting. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Add New Meeting</h2>
      <div className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`w-full p-2 border rounded ${
              errors.title ? "border-red-500" : ""
            }`}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`w-full p-2 border rounded ${
              errors.description ? "border-red-500" : ""
            }`}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
          )}
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-medium">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={`w-full p-2 border rounded ${
              errors.date ? "border-red-500" : ""
            }`}
          />
          {errors.date && (
            <p className="text-red-500 text-sm mt-1">{errors.date}</p>
          )}
        </div>

        {/* Time */}
        <div>
          <label className="block text-sm font-medium">Time</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className={`w-full p-2 border rounded ${
              errors.time ? "border-red-500" : ""
            }`}
          />
          {errors.time && (
            <p className="text-red-500 text-sm mt-1">{errors.time}</p>
          )}
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className={`w-full p-2 border rounded ${
              errors.location ? "border-red-500" : ""
            }`}
          />
          {errors.location && (
            <p className="text-red-500 text-sm mt-1">{errors.location}</p>
          )}
        </div>

        {/* Agenda */}
        <div>
          <label className="block text-sm font-medium">Agenda</label>
          <textarea
            value={agenda}
            onChange={(e) => setAgenda(e.target.value)}
            className={`w-full p-2 border rounded ${
              errors.agenda ? "border-red-500" : ""
            }`}
          />
          {errors.agenda && (
            <p className="text-red-500 text-sm mt-1">{errors.agenda}</p>
          )}
        </div>

        {/* Organizer */}
        <div>
          <label className="block text-sm font-medium">Organizer</label>
          <input
            type="text"
            value={organizer}
            onChange={(e) => setOrganizer(e.target.value)}
            className={`w-full p-2 border rounded ${
              errors.organizer ? "border-red-500" : ""
            }`}
          />
          {errors.organizer && (
            <p className="text-red-500 text-sm mt-1">{errors.organizer}</p>
          )}
        </div>

        {/* Attendees */}
        <div>
          <label className="block text-sm font-medium">Attendees (comma-separated)</label>
          <input
            type="text"
            value={attendees}
            onChange={(e) => setAttendees(e.target.value)}
            className={`w-full p-2 border rounded ${
              errors.attendees ? "border-red-500" : ""
            }`}
          />
          {errors.attendees && (
            <p className="text-red-500 text-sm mt-1">{errors.attendees}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-400"
        >
          {isLoading ? "Adding..." : "Add Meeting"}
        </button>

        {/* Success Message */}
        {successMessage && (
          <p className="text-green-600 text-sm mt-2">{successMessage}</p>
        )}
      </div>
    </form>
  );
}