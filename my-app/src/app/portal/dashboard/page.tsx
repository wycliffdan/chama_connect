// import ContributionTable from "@/components/dashboard/contribution-table";
// // import PayoutList from "@/components/dashboard/payout-list";
// import LoanTable from "@/components/dashboard/loan-table";
// import MeetingSchedule from "@/components/dashboard/meeting-schedule";

import ContributionTable from "@/app/components/dashboard/contribution-table";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Contributions</h2>
          <ContributionTable />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Payouts</h2>
          {/* <PayoutList /> */}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Loans</h2>
          {/* <LoanTable /> */}
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Meetings</h2>
          {/* <MeetingSchedule /> */}
        </div>
      </div>
    </div>
  );
}