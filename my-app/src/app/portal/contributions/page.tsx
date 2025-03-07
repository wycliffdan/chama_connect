// import ContributionForm from "@/components/portal/contribution-form";
// import ContributionTable from "@/components/portal/contribution-table";

import ContributionForm from "@/app/components/portal/contribution-form";
import ContributionTable from "@/app/components/portal/contribution-table";

export default function ContributionsPage() {
  const userId = "your-user-id"; // Replace with dynamic user ID
  const chamaaId = "your-chamaa-id"; // Replace with dynamic chamaa ID

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Monthly Contributions</h1>
      <div className="space-y-8">
        <ContributionForm userId={userId} chamaaId={chamaaId} />
        <ContributionTable chamaaId={chamaaId} />
      </div>
    </div>
  );
}