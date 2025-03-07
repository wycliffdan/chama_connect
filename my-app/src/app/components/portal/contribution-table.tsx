"use client";

import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

interface Contribution {
  id: string;
  amount: number;
  userId: string;
  user: {
    name: string;
  };
  month: number;
  year: number;
  createdAt: string;
}

export default function ContributionTable({ chamaaId }: { chamaaId: string }) {
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchContributions();
  }, [chamaaId]);

  const fetchContributions = async () => {
    const currentDate = new Date();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();

    try {
      const response = await fetch(
        `/api/contributions?month=${month}&year=${year}&chamaaId=${chamaaId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch contributions.");
      }
      const data = await response.json();
      setContributions(data);
    } catch (error) {
      alert("Failed to fetch contributions. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-32">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">Member</th>
            <th className="px-4 py-2 border-b">Amount (Ksh)</th>
            <th className="px-4 py-2 border-b">Date</th>
          </tr>
        </thead>
        <tbody>
          {contributions.length === 0 ? (
            <tr>
              <td colSpan={3} className="text-center py-4">
                No contributions found for this month.
              </td>
            </tr>
          ) : (
            contributions.map((contribution) => (
              <tr key={contribution.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">{contribution.user.name}</td>
                <td className="px-4 py-2 border-b">{contribution.amount.toLocaleString()}</td>
                <td className="px-4 py-2 border-b">
                  {new Date(contribution.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}