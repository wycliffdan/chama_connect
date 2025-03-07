
// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";

// export default function BankLoanRequestForm({
//   userId,
//   chamaaId,
// }: {
//   userId: string;
//   chamaaId: string;
// }) {
//   const [amount, setAmount] = useState("");
//   const [interestRate, setInterestRate] = useState("");
//   const [repaymentPeriod, setRepaymentPeriod] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     // Validate inputs
//     if (!amount || !interestRate || !repaymentPeriod) {
//       alert("Please fill in all fields.");
//       return;
//     }

//     setIsSubmitting(true);

//     // Calculate total repayment amount
//     const principal = parseFloat(amount);
//     const rate = parseFloat(interestRate) / 100;
//     const period = parseInt(repaymentPeriod);
//     const totalRepayment = principal + principal * rate * period;

//     try {
//       const response = await fetch("/api/loans/bank", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           amount: principal,
//           userId,
//           chamaaId,
//           interestRate: rate * 100, // Store as percentage
//           repaymentPeriod: period,
//           totalRepaymentAmount: totalRepayment,
//           type: "bank-like",
//         }),
//       });

//       if (response.ok) {
//         alert("Loan request submitted successfully!");
//         setAmount("");
//         setInterestRate("");
//         setRepaymentPeriod("");
//       } else {
//         const errorData = await response.json();
//         alert(errorData.error || "Failed to submit loan request.");
//       }
//     } catch (error) {
//       alert("An unexpected error occurred. Please try again.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <div className="space-y-2">
//         <label htmlFor="amount" className="block text-sm font-medium">
//           Loan Amount (Ksh)
//         </label>
//         <Input
//           id="amount"
//           type="number"
//           placeholder="Enter amount"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           required
//           min="0"
//           step="0.01"
//         />
//       </div>
//       <div className="space-y-2">
//         <label htmlFor="interestRate" className="block text-sm font-medium">
//           Interest Rate (%)
//         </label>
//         <Input
//           id="interestRate"
//           type="number"
//           placeholder="Enter interest rate"
//           value={interestRate}
//           onChange={(e) => setInterestRate(e.target.value)}
//           required
//           min="0"
//           step="0.1"
//         />
//       </div>
//       <div className="space-y-2">
//         <label htmlFor="repaymentPeriod" className="block text-sm font-medium">
//           Repayment Period (Months)
//         </label>
//         <Input
//           id="repaymentPeriod"
//           type="number"
//           placeholder="Enter repayment period"
//           value={repaymentPeriod}
//           onChange={(e) => setRepaymentPeriod(e.target.value)}
//           required
//           min="1"
//         />
//       </div>
//       <Button type="submit" disabled={isSubmitting}>
//         {isSubmitting ? "Submitting..." : "Request Loan"}
//       </Button>
//     </form>
//   );
// }
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

export default function BankLoanRequestForm({
  userId,
  chamaaId,
}: {
  userId: string;
  chamaaId: string;
}) {
  const [amount, setAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [repaymentPeriod, setRepaymentPeriod] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateInputs = () => {
    if (!amount || isNaN(parseFloat(amount))) {
      alert("Please enter a valid loan amount.");
      return false;
    }

    if (!interestRate || isNaN(parseFloat(interestRate))) {
      alert("Please enter a valid interest rate.");
      return false;
    }

    if (!repaymentPeriod || isNaN(parseInt(repaymentPeriod))) {
      alert("Please enter a valid repayment period in months.");
      return false;
    }

    return true;
  };

  const calculateTotalRepayment = () => {
    const principal = parseFloat(amount);
    const rate = parseFloat(interestRate) / 100;
    const period = parseInt(repaymentPeriod);
    return principal + principal * rate * period;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateInputs()) return;

    setIsSubmitting(true);

    const totalRepaymentAmount = calculateTotalRepayment();

    try {
      const response = await fetch("/api/loans/bank", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: parseFloat(amount),
          userId,
          chamaaId,
          interestRate: parseFloat(interestRate),
          repaymentPeriod: parseInt(repaymentPeriod),
          totalRepaymentAmount,
          type: "bank-like",
        }),
      });

      if (response.ok) {
        alert("Loan request submitted successfully!");
        setAmount("");
        setInterestRate("");
        setRepaymentPeriod("");
      } else {
        const errorData = await response.json();
        alert(errorData.error || "Failed to submit loan request.");
      }
    } catch (error) {
      alert("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="amount" className="block text-sm font-medium">
            Loan Amount (Ksh)
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
          <label htmlFor="interestRate" className="block text-sm font-medium">
            Interest Rate (%)
          </label>
          <Input
            id="interestRate"
            type="number"
            placeholder="Enter interest rate"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            required
            min="0"
            step="0.1"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="repaymentPeriod" className="block text-sm font-medium">
            Repayment Period (Months)
          </label>
          <Input
            id="repaymentPeriod"
            type="number"
            placeholder="Enter repayment period"
            value={repaymentPeriod}
            onChange={(e) => setRepaymentPeriod(e.target.value)}
            required
            min="1"
          />
        </div>
      </div>
      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          "Request Loan"
        )}
      </Button>
    </form>
  );
}