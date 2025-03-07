// import LoanRequestForm from "@/components/dashboard/loan-request";
// import LoanTable from "@/components/dashboard/loan-table";

import LoanRequestForm from "@/app/components/portal/loan-request";
import LoanTable from "@/app/components/portal/loan-table";

export default function LoansPage() {
  const chamaaId = "your-chamaa-id"; // Replace with dynamic chamaa ID
  const userId = "your-user-id"; // Replace with dynamic user ID

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Loans</h1>
      <LoanRequestForm chamaaId={chamaaId} userId={userId} />
      <LoanTable />
    </div>
  );
}