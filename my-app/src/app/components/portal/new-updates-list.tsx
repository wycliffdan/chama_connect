// import { updates } from "@/lib/data";

// export default function NewUpdatesList() {
//   return (
//     <div className="bg-white p-4 rounded-lg shadow">
//       <table className="w-full">
//         <thead>
//           <tr>
//             <th className="text-left">Date</th>
//             <th className="text-left">Title</th>
//             <th className="text-left">Description</th>
//           </tr>
//         </thead>
//         <tbody>
//           {updates.map((update, index) => (
//             <tr key={index} className="border-b">
//               <td className="py-2">{update.date}</td>
//               <td className="py-2">{update.title}</td>
//               <td className="py-2">{update.description}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }
"use client";  // Add this line at the top

import { useState, useEffect } from "react";

export default function NewUpdatesList() {
  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    // Fetch updates from API or state management
    async function fetchUpdates() {
      const response = await fetch("/api/updates");
      if (response.ok) {
        const data = await response.json();
        setUpdates(data);
      }
    }
    fetchUpdates();
  }, []);

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left">Date</th>
            <th className="text-left">Title</th>
            <th className="text-left">Description</th>
          </tr>
        </thead>
        <tbody>
          {updates.map((update, index) => (
            <tr key={index} className="border-b">
              <td className="py-2">{update.date}</td>
              <td className="py-2">{update.title}</td>
              <td className="py-2">{update.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
