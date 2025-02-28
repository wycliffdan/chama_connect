

// import Link from "next/link";

// export default function Navbar() {
//   return (
//     <header className="bg-white shadow p-4">
//       <div className="flex justify-between items-center">
//         <h1 className="text-xl font-bold">Chamaa Connect Portal</h1>
//         <nav className="flex space-x-4">
//           <Link href="/portal/loans" className="text-blue-800 hover:text-blue-600">
//             Loans
//           </Link>
//           <Link href="/portal/meetings" className="text-blue-800 hover:text-blue-600">
//             Meetings
//           </Link>
//           <Link href="/portal/payouts" className="text-blue-800 hover:text-blue-600">
//             Payouts
//           </Link>
//           <Link href="/portal/contributions" className="text-blue-800 hover:text-blue-600">
//             Contributions
//           </Link>
//         </nav>
//         <div className="flex items-center space-x-4">
//           <button className="text-blue-800 hover:text-blue-600">
//             <Link href="/auth/login">
//             Profile
//             </Link>
//             </button>
//           <button className="text-blue-800 hover:text-blue-600">Logout</button>
//         </div>
//       </div>
//     </header>
//   );
// }

"use client"; // Required for client-side interactivity

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    // Perform logout logic here (e.g., clear session, remove tokens, etc.)
    console.log("User logged out");

    // Redirect to the landing page
    router.push("/");
  };

  return (
    <header className="bg-white shadow p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Chamaa Connect Portal</h1>
        <nav className="flex space-x-4">
          <Link href="/portal/loans" className="text-blue-800 hover:text-blue-600">
            Loans
          </Link>
          <Link href="/portal/meetings" className="text-blue-800 hover:text-blue-600">
            Meetings
          </Link>
          <Link href="/portal/payouts" className="text-blue-800 hover:text-blue-600">
            Payouts
          </Link>
          <Link href="/portal/contributions" className="text-blue-800 hover:text-blue-600">
            Contributions
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          <button className="text-blue-800 hover:text-blue-600">Profile</button>
          <button
            onClick={handleLogout}
            className="text-blue-800 hover:text-blue-600"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}