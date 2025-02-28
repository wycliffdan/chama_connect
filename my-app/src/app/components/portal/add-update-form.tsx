"use client"; // Required for client-side interactivity

import { useState } from "react";

export default function AddUpdateForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add logic to save the update (e.g., API call)
    console.log({ title, description });
    alert("Update added successfully!");
    setTitle("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Add New Update</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Update
        </button>
      </div>
    </form>
  );
 }


