// "use client";

// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";
// import { toast } from "sonner";

// const Portal = () => {
//   const router = useRouter();

//   useEffect(() => {
//     toast.success("Welcome to the Portal!");
//   }, []);

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
//       <h1 className="text-4xl font-bold mb-6">Welcome to Chamaa Connect Portal</h1>
//       <p className="text-lg mb-4">Select an option to proceed:</p>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
//         {/* View Dashboard */}
//         <Card className="bg-gray-800 hover:bg-gray-700 transition cursor-pointer" onClick={() => router.push("/dashboard")}> 
//           <CardHeader>
//             <CardTitle className="text-white">View Dashboard</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <p>Check financial summaries, contributions, and savings.</p>
//           </CardContent>
//         </Card>

//         {/* Request Loan */}
//         <Card className="bg-gray-800 hover:bg-gray-700 transition cursor-pointer" onClick={() => router.push("/loan-request")}> 
//           <CardHeader>
//             <CardTitle className="text-white">Request Loan</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <p>Apply for an emergency loan instantly.</p>
//           </CardContent>
//         </Card>

//         {/* See Contributions */}
//         <Card className="bg-gray-800 hover:bg-gray-700 transition cursor-pointer" onClick={() => router.push("/contributions")}> 
//           <CardHeader>
//             <CardTitle className="text-white">See Contributions</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <p>View monthly savings and contribution records.</p>
//           </CardContent>
//         </Card>

//         {/* View Members */}
//         <Card className="bg-gray-800 hover:bg-gray-700 transition cursor-pointer" onClick={() => router.push("/members")}> 
//           <CardHeader>
//             <CardTitle className="text-white">View Members</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <p>See all members and their contribution status.</p>
//           </CardContent>
//         </Card>

//         {/* Announcements & Meetings */}
//         <Card className="bg-gray-800 hover:bg-gray-700 transition cursor-pointer" onClick={() => router.push("/updates")}> 
//           <CardHeader>
//             <CardTitle className="text-white">Announcements & Meetings</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <p>Stay updated with group meetings and news.</p>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Logout Button */}
//       <Button onClick={() => router.push("/")} className="mt-6 bg-red-500 hover:bg-red-600">
//         Logout
//       </Button>
//     </div>
//   );
// };

// export default Portal;

"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth"; // Authentication hook
import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import PortalNav from "./PortalNav";
import { FaPiggyBank, FaMoneyBillWave, FaHandsHelping, FaBell } from "react-icons/fa"; // Icons

export default function PortalPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/portal");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) return null; // Redirecting...

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-600 to-purple-500">
      {/* Navbar */}
      <PortalNav />

      {/* Main Content */}
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          Welcome to <span className="text-yellow-300">Chamaa Connect Portal</span>
        </h1>

        {/* Sections Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Contributions */}
          <FeatureCard
            title="Contributions"
            description="Track monthly contributions and savings."
            href="/portal/contributions"
            Icon={FaPiggyBank}
            color="bg-blue-600"
          />

          {/* ROSCA Payouts */}
          <FeatureCard
            title="ROSCA Payouts"
            description="See who has received their payout and who's next."
            href="/portal/payouts"
            Icon={FaMoneyBillWave}
            color="bg-green-600"
          />

          {/* Emergency Loans */}
          <FeatureCard
            title="Emergency Loans"
            description="Request and track emergency loans."
            href="/portal/loans"
            Icon={FaHandsHelping}
            color="bg-red-600"
          />

          {/* New Updates */}
          <FeatureCard
            title="New Updates"
            description="Stay updated with meetings and announcements."
            href="/portal/updates"
            Icon={FaBell}
            color="bg-yellow-500"
          />
        </div>
      </div>
    </div>
  );
}

// Feature Card Component
const FeatureCard = ({
  title,
  description,
  href,
  Icon,
  color,
}: {
  title: string;
  description: string;
  href: string;
  Icon: React.ElementType;
  color: string;
}) => (
  <Link href={href} className="group">
    <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center text-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
      <div className={`p-4 rounded-full text-white ${color}`}>
        <Icon className="text-3xl" />
      </div>
      <h2 className="text-xl font-semibold mt-4">{title}</h2>
      <p className="text-gray-600 mt-2">{description}</p>
      <Button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 transition-all">
        View {title}
      </Button>
    </div>
  </Link>
);
