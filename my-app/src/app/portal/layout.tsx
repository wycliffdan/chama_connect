// import { ReactNode } from "react";

// export default function PortalLayout({ children }: { children: ReactNode }) {
//   return (
//     <div>
//       <header className="bg-blue-800 text-white p-4">
//         <h1 className="text-2xl font-bold">Chamaa Connect Portal</h1>
//       </header>
//       <main>{children}</main>
//     </div>
//   );
// }

import Navbar from "../components/portal/navbar";
import Sidebar from "../components/portal/sidebar";
// import WelcomeMessage from "../components/portal/welcome-message";
// import Sidebar from "@/components/portal/sidebar";

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        {/* <WelcomeMessage /> */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}