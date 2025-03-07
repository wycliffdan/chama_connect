// import ROSCAPayoutTable from "@/components/portal/rosca-payout-table";

import ROSCAPayoutTable from "@/app/components/portal/rosca-payout-table";

export default function ROSCAPayoutPage() {
  const chamaaId = "your-chamaa-id"; // Replace with dynamic chamaa ID

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">ROSCA Payouts</h1>
      <ROSCAPayoutTable chamaaId={chamaaId} />
    </div>
  );
}