
"use client";

import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

interface Repayment {
  id: string;
  loanId: string;
  amount: number;
  repaidAt: Date;
  status: string;
}

export default function RepaymentTable({ loanId }: { loanId?: string }) {
  const [repayments, setRepayments] = useState<Repayment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalRepayments, setTotalRepayments] = useState(0);

  useEffect(() => {
    fetchRepayments();
  }, [loanId, page, limit]);

  const fetchRepayments = async () => {
    try {
      const url = `/api/loans/repay?loanId=${loanId}&page=${page}&limit=${limit}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch repayments.");
      }
      const data = await response.json();
      setRepayments(data.repayments);
      setTotalRepayments(data.total);
    } catch (error) {
      console.error("Error fetching repayments:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-32">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Repayment ID</th>
              <th className="px-4 py-2 border-b">Loan ID</th>
              <th className="px-4 py-2 border-b">Amount (Ksh)</th>
              <th className="px-4 py-2 border-b">Date Repaid</th>
              <th className="px-4 py-2 border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {repayments.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  No repayments found.
                </td>
              </tr>
            ) : (
              repayments.map((repayment) => (
                <tr key={repayment.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b">{repayment.id}</td>
                  <td className="px-4 py-2 border-b">{repayment.loanId}</td>
                  <td className="px-4 py-2 border-b">{repayment.amount.toLocaleString()}</td>
                  <td className="px-4 py-2 border-b">
                    {new Date(repayment.repaidAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 border-b">{repayment.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page * limit >= totalRepayments}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
}