



// src/app/contributions/page.tsx
'use client';
import { useEffect, useState } from 'react';

interface Contribution {
  id: string;
  amount: number;
  date: string;
  month: number;
  memberId: string;
  chamaaId: string;
  status: string;
}

const ContributionsPage = () => {
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [month, setMonth] = useState('');
  const [memberId, setMemberId] = useState('');
  const [chamaaId, setChamaaId] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchContributions = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/contributions');
      if (!response.ok) throw new Error('Failed to fetch contributions');
      const data = await response.json();
      setContributions(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    try {
      const numericAmount = parseFloat(amount);
      const numericMonth = parseInt(month);
      
      if (isNaN(numericAmount)) throw new Error('Invalid amount');
      if (isNaN(numericMonth) || numericMonth < 1 || numericMonth > 12) {
        throw new Error('Invalid month (1-12)');
      }

      const response = await fetch('/api/contributions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: numericAmount,
          date: new Date(date).toISOString(),
          // contributionDate: new Date(date).toISOString(),

          month: numericMonth,
          memberId,
          chamaaId
          // chamaId
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Submission failed');
      }

      // Reset form fields
      setAmount('');
      setDate('');
      setMonth('');
      setMemberId('');
      setChamaaId('');
      await fetchContributions();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Submission failed');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContributions();
  }, []);

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Manage Contributions</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
            Amount (KES)
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            min="0"
            step="100"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
            Date
          </label>
          <input
            type="datetime-local"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="month">
            Month (1-12)
          </label>
          <input
            type="number"
            id="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            min="1"
            max="12"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="memberId">
            Member ID
          </label>
          <input
            type="text"
            id="memberId"
            value={memberId}
            onChange={(e) => setMemberId(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="chamaaId">
            Chama ID
          </label>
          <input
            type="text"
            id="chamaId"
            value={chamaaId}
            onChange={(e) => setChamaaId(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Submit Contribution'}
          </button>
        </div>
      </form>

      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8">
        <h2 className="text-xl font-semibold mb-4">Recent Contributions</h2>
        
        {loading ? (
          <div className="text-center text-gray-500">Loading contributions...</div>
        ) : contributions.length === 0 ? (
          <div className="text-center text-gray-500">No contributions found</div>
        ) : (
          <div className="space-y-4">
            {contributions.map((contribution) => (
              <div
                key={contribution.id}
                className="border-b border-gray-200 pb-4 last:border-0"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">
                      KES {contribution.amount.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(contribution.date).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                      Month: {contribution.month} | Member: {contribution.memberId.slice(-6)} | Chama: {contribution.chamaaId.slice(-6)}
                    </p>
                  </div>
                  <span className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-800">
                    {contribution.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContributionsPage;