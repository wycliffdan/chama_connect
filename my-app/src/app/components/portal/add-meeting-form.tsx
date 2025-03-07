

// "use client";

// import { useState } from "react";
// import { createMeeting } from "@/lib/meetings";

// export default function AddMeetingForm() {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [date, setDate] = useState("");
//   const [time, setTime] = useState("");
//   const [location, setLocation] = useState("");
//   const [agenda, setAgenda] = useState("");
//   const [organizer, setOrganizer] = useState("");
//   const [attendees, setAttendees] = useState("");
//   const [errors, setErrors] = useState<{ [key: string]: string }>({});
//   const [isLoading, setIsLoading] = useState(false);
//   const [successMessage, setSuccessMessage] = useState("");

//   const validateForm = () => {
//     const newErrors: { [key: string]: string } = {};

//     if (!title) newErrors.title = "Title is required.";
//     if (!description) newErrors.description = "Description is required.";
//     if (!date) newErrors.date = "Date is required.";
//     if (!time) newErrors.time = "Time is required.";
//     if (!location) newErrors.location = "Location is required.";
//     if (!agenda) newErrors.agenda = "Agenda is required.";
//     if (!organizer) newErrors.organizer = "Organizer is required.";
//     if (!attendees) newErrors.attendees = "Attendees are required.";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!validateForm()) return;

//     setIsLoading(true);
//     setSuccessMessage("");

//     try {
//       await createMeeting({
//         title,
//         description,
//         date: new Date(date),
//         time,
//         location,
//         agenda,
//         organizer,
//         attendees: attendees.split(",").map((a) => a.trim()),
//       });

//       setSuccessMessage("Meeting added successfully!");
//       // Clear form
//       setTitle("");
//       setDescription("");
//       setDate("");
//       setTime("");
//       setLocation("");
//       setAgenda("");
//       setOrganizer("");
//       setAttendees("");
//     } catch (error) {
//       console.error("Error adding meeting:", error);
//       alert("Failed to add meeting. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow">
//       <h2 className="text-xl font-semibold mb-4">Add New Meeting</h2>
//       <div className="space-y-4">
//         {/* Title */}
//         <div>
//           <label className="block text-sm font-medium">Title</label>
//           <input
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className={`w-full p-2 border rounded ${
//               errors.title ? "border-red-500" : ""
//             }`}
//           />
//           {errors.title && (
//             <p className="text-red-500 text-sm mt-1">{errors.title}</p>
//           )}
//         </div>

//         {/* Description */}
//         <div>
//           <label className="block text-sm font-medium">Description</label>
//           <textarea
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             className={`w-full p-2 border rounded ${
//               errors.description ? "border-red-500" : ""
//             }`}
//           />
//           {errors.description && (
//             <p className="text-red-500 text-sm mt-1">{errors.description}</p>
//           )}
//         </div>

//         {/* Date */}
//         <div>
//           <label className="block text-sm font-medium">Date</label>
//           <input
//             type="date"
//             value={date}
//             onChange={(e) => setDate(e.target.value)}
//             className={`w-full p-2 border rounded ${
//               errors.date ? "border-red-500" : ""
//             }`}
//           />
//           {errors.date && (
//             <p className="text-red-500 text-sm mt-1">{errors.date}</p>
//           )}
//         </div>

//         {/* Time */}
//         <div>
//           <label className="block text-sm font-medium">Time</label>
//           <input
//             type="time"
//             value={time}
//             onChange={(e) => setTime(e.target.value)}
//             className={`w-full p-2 border rounded ${
//               errors.time ? "border-red-500" : ""
//             }`}
//           />
//           {errors.time && (
//             <p className="text-red-500 text-sm mt-1">{errors.time}</p>
//           )}
//         </div>

//         {/* Location */}
//         <div>
//           <label className="block text-sm font-medium">Location</label>
//           <input
//             type="text"
//             value={location}
//             onChange={(e) => setLocation(e.target.value)}
//             className={`w-full p-2 border rounded ${
//               errors.location ? "border-red-500" : ""
//             }`}
//           />
//           {errors.location && (
//             <p className="text-red-500 text-sm mt-1">{errors.location}</p>
//           )}
//         </div>

//         {/* Agenda */}
//         <div>
//           <label className="block text-sm font-medium">Agenda</label>
//           <textarea
//             value={agenda}
//             onChange={(e) => setAgenda(e.target.value)}
//             className={`w-full p-2 border rounded ${
//               errors.agenda ? "border-red-500" : ""
//             }`}
//           />
//           {errors.agenda && (
//             <p className="text-red-500 text-sm mt-1">{errors.agenda}</p>
//           )}
//         </div>

//         {/* Organizer */}
//         <div>
//           <label className="block text-sm font-medium">Organizer</label>
//           <input
//             type="text"
//             value={organizer}
//             onChange={(e) => setOrganizer(e.target.value)}
//             className={`w-full p-2 border rounded ${
//               errors.organizer ? "border-red-500" : ""
//             }`}
//           />
//           {errors.organizer && (
//             <p className="text-red-500 text-sm mt-1">{errors.organizer}</p>
//           )}
//         </div>

//         {/* Attendees */}
//         <div>
//           <label className="block text-sm font-medium">Attendees (comma-separated)</label>
//           <input
//             type="text"
//             value={attendees}
//             onChange={(e) => setAttendees(e.target.value)}
//             className={`w-full p-2 border rounded ${
//               errors.attendees ? "border-red-500" : ""
//             }`}
//           />
//           {errors.attendees && (
//             <p className="text-red-500 text-sm mt-1">{errors.attendees}</p>
//           )}
//         </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           disabled={isLoading}
//           className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-400"
//         >
//           {isLoading ? "Adding..." : "Add Meeting"}
//         </button>

//         {/* Success Message */}
//         {successMessage && (
//           <p className="text-green-600 text-sm mt-2">{successMessage}</p>
//         )}
//       </div>
//     </form>
//   );
// }


"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

export default function MeetingForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [agenda, setAgenda] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/meetings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          date,
          time,
          location,
          agenda,
          organizerId: "your-organizer-id", // Replace with dynamic organizer ID
          chamaaId: "your-chamaa-id", // Replace with dynamic chamaa ID
        }),
      });

      if (response.ok) {
        alert("Meeting created successfully!");
        setTitle("");
        setDescription("");
        setDate("");
        setTime("");
        setLocation("");
        setAgenda("");
      } else {
        const errorData = await response.json();
        alert(errorData.error || "Failed to create meeting.");
      }
    } catch (error) {
      alert("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="title" className="block text-sm font-medium">
          Title
        </label>
        <Input
          id="title"
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="description" className="block text-sm font-medium">
          Description
        </label>
        <Input
          id="description"
          type="text"
          placeholder="Enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="date" className="block text-sm font-medium">
          Date
        </label>
        <Input
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="time" className="block text-sm font-medium">
          Time
        </label>
        <Input
          id="time"
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="location" className="block text-sm font-medium">
          Location
        </label>
        <Input
          id="location"
          type="text"
          placeholder="Enter location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="agenda" className="block text-sm font-medium">
          Agenda
        </label>
        <Input
          id="agenda"
          type="text"
          placeholder="Enter agenda"
          value={agenda}
          onChange={(e) => setAgenda(e.target.value)}
          required
        />
      </div>
      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          "Create Meeting"
        )}
      </Button>
    </form>
  );
}