import Link from "next/link";

export default function WelcomeMessage() {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-4">Welcome to Chamaa Connect!</h1>
      <p className="text-gray-600 mb-8">
        Manage your contributions, payouts, loans, and meetings in one place.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link
          href="/portal/contributions"
          className="bg-blue-800 text-white p-6 rounded-lg shadow hover:bg-blue-700 transition"
        >
          <h2 className="text-xl font-semibold">Contributions</h2>
          <p className="text-sm">View and manage contributions.</p>
        </Link>
        <Link
          href="/portal/payouts"
          className="bg-blue-800 text-white p-6 rounded-lg shadow hover:bg-blue-700 transition"
        >
          <h2 className="text-xl font-semibold">Payouts</h2>
          <p className="text-sm">Track upcoming payouts.</p>
        </Link>
        <Link
          href="/portal/loans"
          className="bg-blue-800 text-white p-6 rounded-lg shadow hover:bg-blue-700 transition"
        >
          <h2 className="text-xl font-semibold">Loans</h2>
          <p className="text-sm">Manage emergency loans.</p>
        </Link>
        <Link
          href="/portal/meetings"
          className="bg-blue-800 text-white p-6 rounded-lg shadow hover:bg-blue-700 transition"
        >
          <h2 className="text-xl font-semibold">Meetings</h2>
          <p className="text-sm">View upcoming meetings.</p>
        </Link>
      </div>
    </div>
  );
}