// import Sidebar from "@/components/dashboard/sidebar";
// import Navbar from "@/components/dashboard/navbar";

import Sidebar from "../components/dashboard/sidebar";


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1">
        {/* <Navbar /> */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}