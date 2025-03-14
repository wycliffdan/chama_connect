

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

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   setIsSubmitting(true);

  //   try {
  //     const response = await fetch("/api/meetings", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         title,
  //         description,
  //         date,
  //         time,
  //         location,
  //         agenda,
  //         organizerId: "your-organizer-id", // Replace with dynamic organizer ID
  //         chamaaId: "your-chamaa-id", // Replace with dynamic chamaa ID
  //       }),
  //     });
    
      

  //     if (response.ok) {
  //       alert("Meeting created successfully!");
  //       setTitle("");
  //       setDescription("");
  //       setDate("");
  //       setTime("");
  //       setLocation("");
  //       setAgenda("");
  //     } else {
  //       const errorData = await response.json();
  //       alert(errorData.error || "Failed to create meeting.");
  //     }
  //   } catch (error) {
  //     alert("An unexpected error occurred. Please try again.");
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Validate required fields
    if (!title || !description || !date || !time || !location || !agenda) {
      alert("Please fill in all required fields.");
      return;
    }
  
    setIsSubmitting(true);
  
    try {
      const response = await fetch("/api/meetings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          date,
          time,
          location,
          agenda,
          organizerId: 'user.id', // Replace with dynamic organizer ID
          chamaaId: 'chamaa.id', // Replace with dynamic chamaa ID
        }),
      });
  
      if (response.ok) {
        alert("Meeting created successfully!");
        // Reset form fields
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
      console.error("Error creating meeting:", error);
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