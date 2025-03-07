"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function EmergencyLoanForm({
  chamaaId,
  userId,
}: {
  chamaaId: string;
  userId: string;
}) {
  const [amount, setAmount] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!amount || isNaN(parseFloat(amount))) {
      alert("Please enter a valid loan amount.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/loans/emergency", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: parseFloat(amount),
          userId,
          chamaaId,
          dueDate,
          type: "emergency",
        }),
      });

      if (response.ok) {
        alert("Emergency loan requested successfully!");
        setAmount("");
        setDueDate("");
      } else {
        const errorData = await response.json();
        alert(errorData.error || "Failed to request emergency loan.");
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
        <label htmlFor="amount" className="block text-sm font-medium">
          Loan Amount
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
      </div>
      <div className="space-y-2">
        <label htmlFor="dueDate" className="block text-sm font-medium">
          Due Date
        </label>
        <Input
          id="dueDate"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />
      </div>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Request Emergency Loan"}
      </Button>
    </form>
  );
}