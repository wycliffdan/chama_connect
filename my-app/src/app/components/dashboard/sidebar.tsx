import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="w-64 bg-blue-800 text-white p-4">
      <h1 className="text-2xl font-bold mb-6">Chamaa Connect</h1>
      <nav>
        <ul className="space-y-2">
          <li>
            <Link href="/portal/dashboard" className="hover:text-blue-200">
              Dashboard
            </Link>
          </li>
          <li>
            <Link href="/portal/dashboard/contributions" className="hover:text-blue-200">
              Contributions
            </Link>
          </li>
          <li>
            <Link href="/portal/dashboard/payouts" className="hover:text-blue-200">
              Payouts
            </Link>
          </li>
          <li>
            <Link href="/portal/dashboard/loans" className="hover:text-blue-200">
              Loans
            </Link>
          </li>
          <li>
            <Link href="/portal/dashboard/meetings" className="hover:text-blue-200">
              Meetings
            </Link>
          </li>
          <li>
            <Link href="/portal/dashboard/updates" className="hover:text-blue-200">
              Updates
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}