'use client'
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FaPiggyBank, FaHandHoldingUsd, FaUsers, FaBars, FaTimes } from "react-icons/fa"; // Icons
// import { useEffect } from "react";
// import { useAuth } from "@/lib/auth";
// import { useRouter } from "next/navigation";


export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  // const { isAuthenticated, isLoading } = useAuth();
  // const router = useRouter();

  // useEffect(() => {
  //   if (!isLoading && isAuthenticated) {
  //     router.push("/portal"); // Redirect to portal after login
  //   }
  // }, [isAuthenticated, isLoading, router]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-5 bg-white shadow-md relative">
        <h1 className="text-2xl font-bold text-gray-800">Chamaa Connect</h1>
        
        
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-4">
          <Link href="/auth/login">
            <Button variant="outline" className="hover:bg-gray-200">Login</Button>
          </Link>
          <Link href="/auth/signup">
            <Button className="hover:bg-gray-800 hover:text-white">Sign Up</Button>
          </Link>
        </div>

        {/* Hamburger Icon */}
        <button 
          className="md:hidden text-gray-800 focus:outline-none text-2xl" 
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Mobile Menu */}
        <div 
          className={`absolute top-16 left-0 w-full bg-white shadow-md transform ${
            menuOpen ? "translate-y-0" : "-translate-y-full"
          } transition-transform duration-300 md:hidden`}
        >
          <div className="flex flex-col items-center gap-4 py-6">
            <Link href="/auth/login" className="text-lg font-semibold text-gray-800">Login</Link>
            <Link href="/auth/signup">
              <Button className="hover:bg-gray-800 hover:text-white">Sign Up</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative text-center py-24 px-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-40 animate-pulse"></div>
        <h2 className="relative text-5xl font-extrabold mb-6">
          Empowering Women Through Smart Savings
        </h2>
        <p className="relative text-lg max-w-2xl mx-auto mb-8">
          Join a trusted community of women saving together and accessing financial growth.
        </p>
        <Link href="/auth/signup">
          <Button className="relative px-8 py-3 text-lg bg-white text-gray-900 rounded-lg shadow-lg hover:bg-gray-100 transition">
            Get Started
          </Button>
        </Link>
      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 px-10 py-20 bg-white">
        {[
          { icon: <FaPiggyBank size={40} className="text-blue-500 mx-auto mb-3" />, title: "Track Contributions", desc: "Monitor monthly savings and see who has contributed." },
          { icon: <FaHandHoldingUsd size={40} className="text-green-500 mx-auto mb-3" />, title: "Get Loans Easily", desc: "Request emergency loans and track repayment progress." },
          { icon: <FaUsers size={40} className="text-purple-500 mx-auto mb-3" />, title: "Manage Payouts", desc: "See who's next in line for ROSCA payouts." },
        ].map((feature, index) => (
          <div key={index} className="p-6 border rounded-lg shadow-md text-center bg-gray-50 hover:shadow-lg transition">
            {feature.icon}
            <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
            <p className="text-gray-600">{feature.desc}</p>
          </div>
        ))}
      </section>

      {/* CTA Section */}
      <section className="text-center py-16 bg-gray-900 text-white">
        <h2 className="text-4xl font-bold mb-4">Ready to Start Saving?</h2>
        <p className="mb-6 text-lg text-gray-300">
          Sign up today and join a trusted savings group.
        </p>
        <Link href="/auth/signup">
          <Button className="px-6 py-3 text-lg bg-white text-gray-900 rounded-lg shadow-md hover:bg-gray-200 transition">
            Join Now
          </Button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 bg-white shadow-md">
        <p className="text-gray-600">&copy; {new Date().getFullYear()} Chamaa Connect. All rights reserved.</p>
        <div className="flex justify-center mt-4 space-x-6 text-gray-500">
          <Link href="/privacy" className="hover:text-gray-700">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-gray-700">Terms of Service</Link>
          <Link href="/contact" className="hover:text-gray-700">Contact Us</Link>
        </div>
      </footer>
    </div>
  );
}


