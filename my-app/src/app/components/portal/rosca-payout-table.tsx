
// src/app/components/portal/rosca-payout-table.tsx

"use client"; // Mark this component as a Client Component

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function RoscaPayoutTable() {
  const [payouts, setPayouts] = useState([]);
  const [roscaId, setRoscaId] = useState('');
  const [memberId, setMemberId] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    fetchPayouts();
  }, []);

  const fetchPayouts = async () => {
    const response = await fetch('/api/rosca-payouts');
    const data = await response.json();
    setPayouts(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/rosca-payouts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ roscaId: parseInt(roscaId), memberId: parseInt(memberId), amount: parseFloat(amount) }),
    });
    if (response.ok) {
      fetchPayouts();
      setRoscaId('');
      setMemberId('');
      setAmount('');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Rosca Payouts</h1>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="grid grid-cols-3 gap-4">
          <Input
            type="number"
            placeholder="Rosca ID"
            value={roscaId}
            onChange={(e) => setRoscaId(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Member ID"
            value={memberId}
            onChange={(e) => setMemberId(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <Button type="submit" className="mt-4">
          Add Payout
        </Button>
      </form>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Rosca ID</TableHead>
            <TableHead>Member ID</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Payout Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payouts.map((payout) => (
            <TableRow key={payout.id}>
              <TableCell>{payout.id}</TableCell>
              <TableCell>{payout.roscaId}</TableCell>
              <TableCell>{payout.memberId}</TableCell>
              <TableCell>{payout.amount}</TableCell>
              <TableCell>{new Date(payout.payoutDate).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}