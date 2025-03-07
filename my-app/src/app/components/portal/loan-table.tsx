"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface BankLoan {
  id: string;
  amount: number;
  userId: string;
  status: string;
  interestRate: number;
  repaymentPeriod: number;
  totalRepaymentAmount: number;
  dueDate: string;
  createdAt: string;
}

export default function BankLoanTable() {
  const [loans, setLoans] = useState<BankLoan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRepaying, setIsRepaying] = useState(false);

  useEffect(() => {
    fetchLoans();
  }, []);

  const fetchLoans = async () => {
    try {
      const response = await fetch("/api/loans/bank");
      if (!response.ok) {
        throw new Error("Failed to fetch loans.");
      }
      const data = await response.json();
      setLoans(data);
    } catch (error) {
      alert("Failed to fetch loans. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRepay = async (loanId: string) => {
    setIsRepaying(true);
    try {
      const response = await fetch("/api/loans/repay", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ loanId }),
      });

      if (response.ok) {
        setLoans((prev) =>
          prev.map((loan) =>
            loan.id === loanId ? { ...loan, status: "repaid" } : loan
          )
        );
        alert("The loan has been marked as repaid.");
      } else {
        const errorData = await response.json();
        alert(errorData.error || "Failed to repay loan.");
      }
    } catch (error) {
      alert("An unexpected error occurred. Please try again.");
    } finally {
      setIsRepaying(false);
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
            <th className="px-4 py-2 border-b">User ID</th>
            <th className="px-4 py-2 border-b">Amount (Ksh)</th>
            <th className="px-4 py-2 border-b">Interest Rate (%)</th>
            <th className="px-4 py-2 border-b">Repayment Period (Months)</th>
            <th className="px-4 py-2 border-b">Total Repayment (Ksh)</th>
            <th className="px-4 py-2 border-b">Status</th>
            <th className="px-4 py-2 border-b">Due Date</th>
            <th className="px-4 py-2 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {loans.length === 0 ? (
            <tr>
              <td colSpan={8} className="text-center py-4">
                No loans found.
              </td>
            </tr>
          ) : (
            loans.map((loan) => (
              <tr key={loan.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">{loan.userId}</td>
                <td className="px-4 py-2 border-b">{loan.amount.toLocaleString()}</td>
                <td className="px-4 py-2 border-b">{loan.interestRate}</td>
                <td className="px-4 py-2 border-b">{loan.repaymentPeriod}</td>
                <td className="px-4 py-2 border-b">{loan.totalRepaymentAmount.toLocaleString()}</td>
                <td className="px-4 py-2 border-b">{loan.status}</td>
                <td className="px-4 py-2 border-b">
                  {loan.dueDate ? new Date(loan.dueDate).toLocaleDateString() : "N/A"}
                </td>
                <td className="px-4 py-2 border-b">
                  {loan.status === "approved" && (
                    <Button
                      onClick={() => handleRepay(loan.id)}
                      disabled={isRepaying}
                    >
                      {isRepaying ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Repaying...
                        </>
                      ) : (
                        "Repay"
                      )}
                    </Button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}