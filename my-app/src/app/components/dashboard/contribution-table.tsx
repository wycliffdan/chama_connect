// import { contributions } from "@/lib/data";
import { contributions } from "@/lib/data";

export default function ContributionTable() {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left">Name</th>
            <th className="text-left">Amount</th>
            <th className="text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          {contributions.map((contribution, index) => (
            <tr key={index} className="border-b">
              <td className="py-2">{contribution.name}</td>
              <td className="py-2">{contribution.amount}</td>
              <td className="py-2">{contribution.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}