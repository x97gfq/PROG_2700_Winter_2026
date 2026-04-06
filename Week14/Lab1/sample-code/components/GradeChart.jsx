import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
  Cell,
} from "recharts";

function GradeChart({ grades }) {
  if (grades.length === 0) {
    return <p className="empty">Add a subject to see the chart.</p>;
  }

  const avg = Math.round(
    grades.reduce((sum, g) => sum + g.grade, 0) / grades.length
  );

  return (
    <div>
      <h2>Grade Overview</h2>
      <ResponsiveContainer width="100%" height={340}>
        <BarChart data={grades} margin={{ top: 16, right: 16, left: 0, bottom: 0 }}>
          <XAxis dataKey="subject" />
          <YAxis domain={[0, 100]} unit="%" />
          <Tooltip formatter={(v) => [`${v}%`, "Grade"]} />
          <ReferenceLine y={avg} stroke="#f59e0b" strokeDasharray="4 2"
            label={{ value: `Avg ${avg}%`, position: "right", fill: "#f59e0b", fontSize: 12 }} />
          <Bar dataKey="grade" radius={[4, 4, 0, 0]}>
            {grades.map((g, i) => (
              <Cell
                key={i}
                fill={g.grade >= avg ? "#4f46e5" : "#a5b4fc"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <p className="chart-note">
        Bars above the average line are highlighted in dark blue.
      </p>
    </div>
  );
}

export default GradeChart;
