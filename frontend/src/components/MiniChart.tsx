import { LineChart, Line, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

interface MiniChartProps {
  title: string;
  type: "line" | "bar";
  data: { name: string; value: number; value2?: number }[];
  color?: string;
  color2?: string;
}

const MiniChart = ({ title, type, data, color = "hsl(215, 80%, 55%)", color2 }: MiniChartProps) => {
  return (
    <div className="glass-card p-4">
      <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">{title}</h4>
      <div className="h-[100px]">
        <ResponsiveContainer width="100%" height="100%">
          {type === "line" ? (
            <LineChart data={data}>
              <XAxis dataKey="name" tick={{ fontSize: 9, fill: "hsl(215, 12%, 55%)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 9, fill: "hsl(215, 12%, 55%)" }} axisLine={false} tickLine={false} width={30} />
              <Tooltip
                contentStyle={{
                  background: "hsl(220, 18%, 13%)",
                  border: "1px solid hsl(220, 14%, 20%)",
                  borderRadius: "8px",
                  fontSize: "11px",
                }}
              />
              <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2} dot={false} />
              {color2 && <Line type="monotone" dataKey="value2" stroke={color2} strokeWidth={2} dot={false} />}
            </LineChart>
          ) : (
            <BarChart data={data}>
              <XAxis dataKey="name" tick={{ fontSize: 9, fill: "hsl(215, 12%, 55%)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 9, fill: "hsl(215, 12%, 55%)" }} axisLine={false} tickLine={false} width={30} />
              <Tooltip
                contentStyle={{
                  background: "hsl(220, 18%, 13%)",
                  border: "1px solid hsl(220, 14%, 20%)",
                  borderRadius: "8px",
                  fontSize: "11px",
                }}
              />
              <Bar dataKey="value" fill={color} radius={[3, 3, 0, 0]} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MiniChart;
