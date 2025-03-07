// import EmergencyLoanTable from "@/app/components/portal/emergency-loan-table";

import EmergencyLoanForm from "@/app/components/portal/emergency-loan-table";

export default function EmergencyLoanPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Emergency Loans</h1>
      {/* <EmergencyLoanTable />
       */}
       <EmergencyLoanForm />
    </div>
  );
}