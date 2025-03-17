'use client'

import Link from "next/link"
import { useRouter } from "next/navigation"

export default function Sidebar(){
  const router = useRouter();

  const handleLogout = () => {
    // Perform logout logic here (e.g., clear session, remove tokens, etc.)
    console.log("User to portal");

    // Redirect to the landing page
    router.push("/portal");
  };
    return (
        <div  className="w-64 bg-blue-800 text-white p-4">
            <h1 className="text-2xl font-bold mb-6">
            <button
            onClick={handleLogout}
            className="text-white-800 hover:text-white-600"
          >
            Connect
          </button>
            </h1>
            <nav>
                <ul className="space-y-2">
                    <li>
                        <Link href="/portal/dashboard" className="hover:text-blue-200">
                        Dashboard
                        </Link>
                    </li>
                    <li>
            <Link href="/portal/emergency-loans" className="hover:text-blue-200">
              Emergency Loans
            </Link>
          </li>
          <li>
            <Link href="/portal/new-updates" className="hover:text-blue-200">
              New Updates
            </Link>
          </li>
          <li>
            <Link href="/portal/meetings" className="hover:text-blue-200">
              Meetings
            </Link>
          </li>
          <li>
            <Link href="/portal/settings" className="hover:text-blue-200">
              Settings
            </Link>
          </li>
          
          
                </ul>
            </nav>
        </div>
    )

}