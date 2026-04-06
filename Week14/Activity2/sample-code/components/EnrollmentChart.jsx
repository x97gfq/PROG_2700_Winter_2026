import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { campus: "Waterfront", students: 3200 },
  { campus: "IT Campus",  students: 1850 },
  { campus: "Pictou",     students: 980 },
  { campus: "Truro",      students: 1420 },
  { campus: "Kingstec",   students: 1100 },
  { campus: "Burridge",   students: 760 },
];

function EnrollmentChart() {
  return (
    <div>
      <h2>Enrollment by Campus</h2>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
          <XAxis dataKey="campus" tick={{ fontSize: 11 }} />
          <YAxis />
          <Tooltip formatter={(v) => [v.toLocaleString(), "Students"]} />
          <Bar dataKey="students" fill="#4f46e5" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default EnrollmentChart;
