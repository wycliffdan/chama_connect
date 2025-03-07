
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

export default function RepaymentForm({ loanId }: { loanId: string }) {
  const [amount, setAmount] = useState("");
  const [remainingBalance, setRemainingBalance] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch the remaining loan balance
  useEffect(() => {
    const fetchLoanDetails = async () => {
      try {
        const response = await fetch(`/api/loans/${loanId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch loan details.");
        }
        const loan = await response.json();
        const repaymentsResponse = await fetch(`/api/loans/repay?loanId=${loanId}`);
        const repayments = await repaymentsResponse.json();
        const totalRepaid = repayments.reduce((sum: number, r: any) => sum + r.amount, 0);
        setRemainingBalance(loan.totalRepaymentAmount - totalRepaid);
      } catch (error) {
        setError("Failed to fetch loan details.");
      }
    };

    fetchLoanDetails();
  }, [loanId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!amount || isNaN(parseFloat(amount))) {
      setError("Please enter a valid repayment amount.");
      return;
    }

    if (parseFloat(amount) > remainingBalance) {
      setError("Repayment amount cannot exceed the remaining balance.");
      return;
    }

    setIsSubmitting(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/loans/repay", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ loanId, amount: parseFloat(amount) }),
      });

      if (response.ok) {
        setSuccess("Repayment submitted successfully!");
        setAmount("");
        setRemainingBalance((prev) => prev - parseFloat(amount));
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Failed to submit repayment.");
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="amount" className="block text-sm font-medium">
          Repayment Amount (Ksh)
        </label>
        <Input
          id="amount"
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          min="0"
          step="0.01"
        />
        <p className="text-sm text-gray-600">
          Remaining Balance: Ksh {remainingBalance.toLocaleString()}
        </p>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {success && <p className="text-sm text-green-600">{success}</p>}
      <Button type="submit" onClick={handleSubmit} disabled={isSubmitting} className="w-full">
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          "Submit Repayment"
        )}
      </Button>
    </div>
  );
}