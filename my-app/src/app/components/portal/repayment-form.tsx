

'use client';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface Loan {
  id: string;
  amount: number;
  status: string;
  memberId: string;
  repayments: { 
    id: string;
    amount: number;
    paymentDate: string;
  }[];
  createdAt: string;
  dueDate: string;
}

export default function RepaymentForm({ loanId }: { loanId: string }) {
  const [loan, setLoan] = useState<Loan | null>(null);
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Fetch loan details with repayments
  const fetchLoan = async () => {
    try {
      const response = await fetch(`/api/loans/${loanId}`);
      if (!response.ok) throw new Error('Failed to fetch loan');
      const data = await response.json();
      setLoan(data);
    } catch (error) {
      console.error("Failed to fetch loan:", error);
      setError('Failed to load loan details');
    }
  };

  useEffect(() => {
    if (loanId) fetchLoan();
  }, [loanId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loan) return;

    setError(null);
    setSuccess(false);
    setLoading(true);

    try {
      const paymentAmount = parseFloat(amount);
      if (isNaN(paymentAmount) || paymentAmount <= 0) {
        throw new Error('Invalid payment amount');
      }

      const response = await fetch('/api/repayments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          loanId: loan.id,
          amount: paymentAmount
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Payment failed');
      }

      // Refresh data and show success
      await fetchLoan();
      setAmount('');
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);

    } catch (error) {
      setError(error instanceof Error ? error.message : 'Payment failed');
    } finally {
      setLoading(false);
    }
  };

  if (!loan) return <div className="text-center py-4">Loading loan details...</div>;

  const totalRepaid = loan.repayments.reduce((sum, r) => sum + r.amount, 0);
  const remainingBalance = loan.amount - totalRepaid;
  const repaymentProgress = (totalRepaid / loan.amount) * 100;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Loan Repayment</h2>
      
      {/* Loan Summary */}
      <div className="mb-8 space-y-4 bg-gray-50 p-4 rounded-lg">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-muted-foreground">Loan Date</Label>
            <p className="font-medium">
              {new Date(loan.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div>
            <Label className="text-muted-foreground">Due Date</Label>
            <p className="font-medium">
              {new Date(loan.dueDate).toLocaleDateString()}
            </p>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Original Amount:</span>
            <span className="font-medium">KES {loan.amount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Total Repaid:</span>
            <span className="font-medium">KES {totalRepaid.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Remaining Balance:</span>
            <span className="font-medium">KES {remainingBalance.toLocaleString()}</span>
          </div>
        </div>
        
        <Progress value={repaymentProgress} className="h-2" />
      </div>

      {/* Repayment Form */}
      <form onSubmit={handleSubmit} className="space-y-6 mb-8">
        <div className="space-y-2">
          <Label htmlFor="amount">Payment Amount</Label>
          <Input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            min="0"
            max={remainingBalance}
            step="0.01"
            required
            disabled={remainingBalance <= 0}
          />
          <p className="text-sm text-muted-foreground">
            Maximum payable amount: KES {remainingBalance.toLocaleString()}
          </p>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-500 text-sm">Payment successful!</p>}

        <Button 
          type="submit" 
          className="w-full"
          disabled={loading || remainingBalance <= 0}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="animate-spin">↻</span>
              Processing...
            </span>
          ) : remainingBalance <= 0 ? (
            'Loan Fully Repaid'
          ) : (
            'Submit Payment'
          )}
        </Button>
      </form>

      {/* Repayment History */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Payment History</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loan.repayments.map((repayment) => (
              <TableRow key={repayment.id}>
                <TableCell>
                  {new Date(repayment.paymentDate).toLocaleDateString()}
                </TableCell>
                <TableCell>KES {repayment.amount.toLocaleString()}</TableCell>
                <TableCell>
                  <span className="text-green-500">Completed</span>
                </TableCell>
              </TableRow>
            ))}
            {loan.repayments.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} className="text-center text-muted-foreground">
                  No payments recorded yet
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}