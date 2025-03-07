// import RepaymentForm from "@/components/portal/repayment-form";
// import RepaymentTable from "@/components/portal/repayment-table";

import RepaymentForm from "@/app/components/portal/repayment-form";
import RepaymentTable from "@/app/components/portal/repayment-table";

export default function RepaymentsPage() {
  const loanId = "your-loan-id"; // Replace with dynamic loan ID (e.g., from URL params or user session)

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Loan Repayments</h1>
      <div className="space-y-8">
        <RepaymentForm loanId={loanId} />
        <RepaymentTable loanId={loanId} />
      </div>
    </div>
  );
}