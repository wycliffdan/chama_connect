"use client";

import { useState, useEffect } from "react";

interface ROSCA {
  id: string;
  userId: string;
  payoutOrder: number;
  hasReceived: boolean;
}

export default function ROSCAPayoutTable({ chamaaId }: { chamaaId: string }) {
  const [roscaData, setROSCAData] = useState<ROSCA[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/rosca?chamaaId=${chamaaId}`)
      .then((res) => res.json())
      .then((data) => {
        setROSCAData(data);
        setIsLoading(false);
      });
  }, [chamaaId]);

  if (isLoading) {
    return <div>Loading ROSCA data...</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">User ID</th>
            <th className="px-4 py-2 border-b">Payout Order</th>
            <th className="px-4 py-2 border-b">Status</th>
          </tr>
        </thead>
        <tbody>
          {roscaData.map((rosca) => (
            <tr key={rosca.id}>
              <td className="px-4 py-2 border-b">{rosca.userId}</td>
              <td className="px-4 py-2 border-b">{rosca.payoutOrder}</td>
              <td className="px-4 py-2 border-b">
                {rosca.hasReceived ? "Received" : "Pending"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}