import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PortalNav() {
  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Chamaa Connect</h1>
        <div className="flex space-x-4">
          <Link href="/portal">
            <Button variant="ghost">Home</Button>
          </Link>
          <Link href="/portal/contributions">
            <Button variant="ghost">Contributions</Button>
          </Link>
          <Link href="/portal/payouts">
            <Button variant="ghost">Payouts</Button>
          </Link>
          <Link href="/portal/loans">
            <Button variant="ghost">Loans</Button>
          </Link>
          <Link href="/portal/updates">
            <Button variant="ghost">Updates</Button>
          </Link>
          <Link href="/auth/logout">
            <Button variant="ghost">Logout</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}