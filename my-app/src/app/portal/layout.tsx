

import Navbar from "../components/portal/navbar";


import Sidebar from "../components/portal/sidebar";



export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
       
       
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}