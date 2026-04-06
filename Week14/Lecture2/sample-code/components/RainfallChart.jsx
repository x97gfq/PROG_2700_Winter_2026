import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", mm: 128 },
  { month: "Feb", mm: 111 },
  { month: "Mar", mm: 107 },
  { month: "Apr", mm: 97 },
  { month: "May", mm: 98 },
  { month: "Jun", mm: 91 },
  { month: "Jul", mm: 95 },
  { month: "Aug", mm: 101 },
  { month: "Sep", mm: 105 },
  { month: "Oct", mm: 123 },
  { month: "Nov", mm: 138 },
  { month: "Dec", mm: 137 },
];

function RainfallChart() {
  return (
    <div>
      <h2>Monthly Rainfall — Halifax (mm)</h2>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
          <XAxis dataKey="month" />
          <YAxis unit=" mm" />
          <Tooltip formatter={(v) => [`${v} mm`, "Rainfall"]} />
          <Bar dataKey="mm" fill="#4f46e5" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default RainfallChart;
