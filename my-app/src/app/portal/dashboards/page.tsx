"use client";

import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

// Mock data for demonstration
const contributionsData = [
  { name: "Paid", value: 75 },
  { name: "Pending", value: 25 },
];

const loansData = [
  { name: "Approved", value: 60 },
  { name: "Pending", value: 20 },
  { name: "Rejected", value: 20 },
];

const repaymentsData = [
  { name: "Repaid", value: 80 },
  { name: "Pending", value: 20 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState({
    totalContributions: 0,
    totalLoans: 0,
    totalRepayments: 0,
  });

  useEffect(() => {
    // Fetch summary data from the API
    const fetchSummary = async () => {
      try {
        const response = await fetch("/api/dashboard/summary");
        if (!response.ok) {
          throw new Error("Failed to fetch summary data.");
        }
        const data = await response.json();
        setSummary(data);
      } catch (error) {
        console.error("Error fetching summary data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Contributions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              Ksh {summary.totalContributions.toLocaleString()}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Loans</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              Ksh {summary.totalLoans.toLocaleString()}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Repayments</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              Ksh {summary.totalRepayments.toLocaleString()}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Pie Charts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Contributions</CardTitle>
          </CardHeader>
          <CardContent>
            <PieChart width={300} height={300}>
              <Pie
                data={contributionsData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {contributionsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Loans</CardTitle>
          </CardHeader>
          <CardContent>
            <PieChart width={300} height={300}>
              <Pie
                data={loansData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#82ca9d"
                dataKey="value"
                label
              >
                {loansData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Repayments</CardTitle>
          </CardHeader>
          <CardContent>
            <PieChart width={300} height={300}>
              <Pie
                data={repaymentsData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#ffc658"
                dataKey="value"
                label
              >
                {repaymentsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </CardContent>
        </Card>
      </div>

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