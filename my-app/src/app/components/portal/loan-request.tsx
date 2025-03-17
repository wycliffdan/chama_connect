



'use client';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon, Download, FileText, LineChart } from 'lucide-react';
import { format } from 'date-fns';

// Extended Loan Interface
interface Loan {
  id: string;
  amount: number;
  status: 'requested' | 'approved' | 'rejected' | 'repaid';
  interestRate: number;
  dueDate: string;
  createdAt: string;
  member: {
    id: string;
    name: string;
    email: string;
    phone: string;
  };
  repayments: {
    id: string;
    amount: number;
    paymentDate: string;
  }[];
  documents: string[];
}

export default function LoanManagementPage() {
  // const { data: session } = useSession();
  const [loans, setLoans] = useState<Loan[]>([]);
  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);
  const [filteredLoans, setFilteredLoans] = useState<Loan[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedDocument, setSelectedDocument] = useState<string>('');
  const [paymentSchedule, setPaymentSchedule] = useState<Array<{ date: Date; amount: number }>>([]);
  const [calendarDate, setCalendarDate] = useState<Date | undefined>(new Date());
  const [exportLoading, setExportLoading] = useState(false);
  const [loanApplicationOpen, setLoanApplicationOpen] = useState(false);
  const [loanAmount, setLoanAmount] = useState<number>(0);
  const [loanPurpose, setLoanPurpose] = useState<string>('');
  const [loanDuration, setLoanDuration] = useState<number>(12);

  useEffect(() => {
    // Fetch loans data from API
    const fetchLoans = async () => {
      try {
        const response = await fetch('/api/loans');
        if (!response.ok) throw new Error('Failed to fetch loans');
        const data = await response.json();
        setLoans(data);
        setFilteredLoans(data); // Initially, filtered loans are the same as all loans
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch loans');
      }
    };

    fetchLoans();
  }, []);

  // Generate Payment Schedule
  const generatePaymentSchedule = (loan: Loan) => {
    const schedule = [];
    const principal = loan.amount;
    const monthlyInterest = (principal * loan.interestRate) / 100 / 12;
    const paymentDate = new Date(loan.dueDate);
    
    for (let i = 0; i < 12; i++) {
      schedule.push({
        date: new Date(paymentDate.setMonth(paymentDate.getMonth() + 1)),
        amount: monthlyInterest + (principal / 12)
      });
    }
    return schedule;
  };

  // Export to CSV
  const handleExport = async (format: 'csv' | 'pdf') => {
    setExportLoading(true);
    try {
      const response = await fetch(`/api/loans/export?format=${format}`);
      if (!response.ok) throw new Error('Export failed');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `loans-${new Date().toISOString()}.${format}`;
      a.click();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Export failed');
    } finally {
      setExportLoading(false);
    }
  };

  // Handle Loan Application Submission
  const handleLoanApplicationSubmit = async () => {
    try {
      const response = await fetch('/api/loans', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: loanAmount,
          purpose: loanPurpose,
          duration: loanDuration,
        }),
      });

      if (!response.ok) throw new Error('Failed to submit loan application');

      const data = await response.json();
      setLoans([...loans, data]);
      setLoanApplicationOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit loan application');
    }
  };

  // Document Preview Dialog
  const DocumentPreviewDialog = () => (
    <Dialog>
      <DialogTrigger>
        <Button variant="ghost" size="sm">
          <FileText className="h-4 w-4 mr-2" />
          View Documents
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl h-[80vh]">
        <DialogHeader>
          <DialogTitle>Loan Documents</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-full">
          <div className="grid grid-cols-3 gap-4 p-4">
            {selectedLoan?.documents.map((doc, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4 flex flex-col items-center">
                  <FileText className="h-12 w-12 text-blue-500 mb-2" />
                  <Button 
                    variant="link" 
                    onClick={() => window.open(doc, '_blank')}
                  >
                    Document {index + 1}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );

  // Enhanced Table Cell with Calendar Integration
  const DueDateCell = ({ dueDate }: { dueDate: string }) => {
    const [showCalendar, setShowCalendar] = useState(false);
    
    return (
      <div className="relative">
        <Button
          variant="ghost"
          className="flex items-center gap-2"
          onClick={() => setShowCalendar(!showCalendar)}
        >
          <CalendarIcon className="h-4 w-4" />
          {/* {format(new Date(dueDate), 'PPP')} */}
          {dueDate ? format(new Date(dueDate), 'PPP') : "N/A"}

        </Button>
        
        {showCalendar && (
          <div className="absolute z-10 bg-white shadow-lg p-4 rounded-lg border mt-2">
            <Calendar
              mode="single"
              selected={new Date(dueDate)}
              onSelect={() => {}}
              className="rounded-md"
            />
          </div>
        )}
      </div>
    );
  };

  // New Statistics Card Component
  const StatCard = ({ title, value, icon }: { title: string; value: string; icon: React.ReactNode }) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Export Controls */}
      <div className="flex justify-end gap-4">
        <Button 
          variant="outline" 
          onClick={() => handleExport('csv')}
          disabled={exportLoading}
        >
          <Download className="h-4 w-4 mr-2" />
          {exportLoading ? 'Exporting...' : 'Export to CSV'}
        </Button>
        <Button 
          variant="outline" 
          onClick={() => handleExport('pdf')}
          disabled={exportLoading}
        >
          <Download className="h-4 w-4 mr-2" />
          {exportLoading ? 'Exporting...' : 'Export to PDF'}
        </Button>
        <Button 
          variant="default" 
          onClick={() => setLoanApplicationOpen(true)}
        >
          Apply for Loan
        </Button>
      </div>

      {/* Loan Application Dialog */}
      <Dialog open={loanApplicationOpen} onOpenChange={setLoanApplicationOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Apply for a Loan</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              type="number"
              placeholder="Loan Amount"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
            />
            <Input
              placeholder="Loan Purpose"
              value={loanPurpose}
              onChange={(e) => setLoanPurpose(e.target.value)}
            />
            <Select
              value={loanDuration.toString()}
              onValueChange={(value) => setLoanDuration(Number(value))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Loan Duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="6">6 Months</SelectItem>
                <SelectItem value="12">12 Months</SelectItem>
                <SelectItem value="24">24 Months</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button onClick={handleLoanApplicationSubmit}>Submit Application</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Enhanced Statistics Section */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard
          title="Total Interest"
          value={`KES ${loans.reduce((sum, loan) => sum + (loan.amount * loan.interestRate / 100), 0).toLocaleString()}`}
          icon={<LineChart className="h-4 w-4 text-muted-foreground" />}
        />
        <StatCard
          title="Avg. Loan Size"
          value={`KES ${(loans.reduce((sum, loan) => sum + loan.amount, 0) / (loans.length || 1)).toLocaleString()}`}
          icon={<LineChart className="h-4 w-4 text-muted-foreground" />}
        />
        <StatCard
          title="Active Loans"
          value={loans.filter(loan => loan.status === 'approved').length.toString()}
          icon={<LineChart className="h-4 w-4 text-muted-foreground" />}
        />
        <StatCard
          title="Default Risk"
          value={`${((loans.filter(loan => new Date(loan.dueDate) < new Date() && loan.status !== 'repaid').length / loans.length) * 100 || 0).toFixed(1)}%`}
          icon={<LineChart className="h-4 w-4 text-muted-foreground" />}
        />
      </div>

      {/* Enhanced Table with Additional Features */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Loan Portfolio</CardTitle>
          <DocumentPreviewDialog />
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Member</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Remaining Balance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLoans.map((loan) => {
              {/* {filteredLoans.map((loan) => {
  if (!loan?.member) {
    console.error("Loan missing member data:", loan);
    return null;
  } */}
                // const totalRepaid = loan.repayments.reduce((sum, r) => sum + r.amount, 0);
                const totalRepaid = loan.repayments?.reduce((sum, r) => sum + r.amount, 0) || 0;

                const remainingBalance = loan.amount - totalRepaid;
                const nextPayment = paymentSchedule.find(s => new Date(s.date) > new Date());

                return (
                  <TableRow key={loan.id}>
                    {/* <TableCell>{loan.member.name}</TableCell> */}
                    <TableCell>KES {loan.amount.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant={loan.status === 'approved' ? 'default' : 'secondary'}>
                        {loan.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DueDateCell dueDate={loan.dueDate} />
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <span className="font-medium">KES {remainingBalance.toLocaleString()}</span>
                        <span className="text-xs text-muted-foreground">
                          Next Payment: {nextPayment ? format(nextPayment.date, 'PP') : 'N/A'}
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Payment Schedule Side Panel */}
      {selectedLoan && (
        <Card className="fixed right-0 top-0 h-screen w-96 p-4 shadow-xl">
          <CardHeader>
            <CardTitle>Payment Schedule</CardTitle>
            <CardDescription>
              For {selectedLoan.member.name}'s loan of KES {selectedLoan.amount.toLocaleString()}
            </CardDescription>
          </CardHeader>
          <ScrollArea className="h-[80vh]">
            <div className="space-y-4">
              {generatePaymentSchedule(selectedLoan).map((payment, index) => (
                <div key={index} className="flex justify-between items-center p-2 border rounded-lg">
                  <div>
                    <p className="font-medium">Installment #{index + 1}</p>
                    <p className="text-sm text-muted-foreground">
                      {format(payment.date, 'PPP')}
                    </p>
                  </div>
                  <Badge variant="outline">
                    KES {payment.amount.toFixed(2)}
                  </Badge>
                </div>
              ))}
            </div>
          </ScrollArea>
        </Card>
      )}
    </div>
  );
}


