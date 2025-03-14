






"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import Link from "next/link";
import { useRouter } from "next/navigation";

export default function PortalPage() {
  const router = useRouter();
  // Mock data for demonstration
  const userStats = {
    totalContributions: 50000,
    totalLoans: 20000,
    totalRepayments: 15000,
  };

  const groupStats = {
    totalSavings: 1000000,
    totalLoansDisbursed: 500000,
    repaymentRate: "95%",
  };

  const upcomingEvents = [
    {
      title: "Monthly Meeting",
      date: "2023-10-15",
      time: "10:00 AM",
      location: "Community Hall",
    },
    {
      title: "Loan Repayment Deadline",
      date: "2023-10-20",
      description: "Ensure repayment is made on time.",
    },
  ];

  const testimonials = [
    {
      name: "Jane Doe",
      story: "Thanks to Chamaa Connect, I was able to grow my business with a low-interest loan. The process was quick and easy!",
    },
    {
      name: "John Doe",
      story: "The contributions I made helped me save for my child's education. I'm grateful for this platform.",
    },
  ];

  const financialTips = [
    "Always plan your budget before taking a loan.",
    "Make timely contributions to avoid penalties.",
    "Regularly check your repayment schedule to stay on track.",
  ];

  const notifications = [
    "Reminder: Monthly meeting on 15th October.",
    "New loan products now available. Apply today!",
    "Contribution deadline for this month is 25th October.",
  ];

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">Welcome to Chamaa Connect</h1>

      {/* Quick Links Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Loans Card */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-xl">Loans</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600">
              Loans from Chamaa Connect have helped members grow their businesses, pay for education, and meet emergency needs. Join the many who have benefited!
            </p>
            
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => router.push("/portal/loans")} // Navigate on click
            >
              Explore Loan Options
            </Button>
          </CardContent>
        </Card>

        {/* Contributions Card */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-xl">Contributions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600">
              Make your contributions to support the group and earn benefits. Your contributions help others and grow your savings.
            </p>
            
            
             
             <Button
              className="w-full bg-green-600 hover:bg-green-700 text-white"
              onClick={() => router.push("/portal/contributions")} // Navigate on click
            >
              Make a Contribution
            </Button>
          </CardContent>
        </Card>

        {/* Repayments Card */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-xl">Repayments</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600">
              View your repayment history and manage your loan repayments. Stay on track and avoid penalties.
            </p>
           
           
             
             <Button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => router.push("/portal/repayment")} // Navigate on click
            >
             View Repayments
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Group Performance Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Group Performance Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-600">Total Savings</p>
              <p className="text-2xl font-bold">
                Ksh {groupStats.totalSavings.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Loans Disbursed</p>
              <p className="text-2xl font-bold">
                Ksh {groupStats.totalLoansDisbursed.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Repayment Rate</p>
              <p className="text-2xl font-bold">{groupStats.repaymentRate}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Testimonials Section */}
      <Card>
        <CardHeader>
          <CardTitle>Success Stories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="border-b pb-2">
                <p className="text-sm font-semibold">{testimonial.name}</p>
                <p className="text-xs text-gray-600">{testimonial.story}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Financial Tips Section */}
      <Card>
        <CardHeader>
          <CardTitle>Financial Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {financialTips.map((tip, index) => (
              <div key={index} className="flex items-start">
                <span className="text-sm text-gray-600">• {tip}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Notifications Section */}
      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {notifications.map((notification, index) => (
              <div key={index} className="flex items-start">
                <span className="text-sm text-gray-600">• {notification}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Events */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Events</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="border-b pb-2">
                <p className="text-sm font-semibold">{event.title}</p>
                <p className="text-xs text-gray-500">
                  {event.date} {event.time && `at ${event.time}`}
                </p>
                {event.location && (
                  <p className="text-xs text-gray-500">{event.location}</p>
                )}
                {event.description && (
                  <p className="text-xs text-gray-500">{event.description}</p>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border-b pb-2">
              <p className="text-sm">Contribution of Ksh 2,000 received from Jane Doe.</p>
              <p className="text-xs text-gray-500">2023-10-01 10:00 AM</p>
            </div>
            <div className="border-b pb-2">
              <p className="text-sm">Loan of Ksh 10,000 approved for John Doe.</p>
              <p className="text-xs text-gray-500">2023-10-02 11:00 AM</p>
            </div>
            <div className="border-b pb-2">
              <p className="text-sm">Repayment of Ksh 5,000 received from Jane Doe.</p>
              <p className="text-xs text-gray-500">2023-10-03 12:00 PM</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}