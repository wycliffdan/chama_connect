"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

export default function ContributionForm({
  userId,
  chamaaId,
}: {
  userId: string;
  chamaaId: string;
}) {
  const [amount, setAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!amount || isNaN(parseFloat(amount))) {
      alert("Please enter a valid contribution amount.");
      return;
    }

    setIsSubmitting(true);

    const currentDate = new Date();
    const month = currentDate.getMonth() + 1; // Months are 0-indexed
    const year = currentDate.getFullYear();

    try {
      const response = await fetch("/api/contributions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: parseFloat(amount),
          userId,
          chamaaId,
          month,
          year,
        }),
      });

      if (response.ok) {
        alert("Contribution submitted successfully!");
        setAmount("");
      } else {
        const errorData = await response.json();
        alert(errorData.error || "Failed to submit contribution.");
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
          Contribution Amount (Ksh)
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
      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          "Submit Contribution"
        )}
      </Button>
    </form>
  );
}