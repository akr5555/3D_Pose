import DashboardLayout from "@/components/DashboardLayout";
import MetricCard from "@/components/MetricCard";
import MiniChart from "@/components/MiniChart";

const perJointData = [
  { name: "Head", value: 28 },
  { name: "Neck", value: 31 },
  { name: "L.Sho", value: 35 },
  { name: "R.Sho", value: 34 },
  { name: "L.Elb", value: 42 },
  { name: "R.Elb", value: 45 },
  { name: "L.Wri", value: 52 },
  { name: "R.Wri", value: 55 },
  { name: "L.Hip", value: 38 },
  { name: "R.Hip", value: 37 },
  { name: "L.Kne", value: 44 },
  { name: "R.Kne", value: 46 },
];

const modelTrend = [
  { name: "v1", value: 68, value2: 72 },
  { name: "v2", value: 58, value2: 65 },
  { name: "v3", value: 52, value2: 58 },
  { name: "v4", value: 45, value2: 50 },
  { name: "v5", value: 42, value2: 48 },
];

const Results = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Results</h1>
          <p className="text-sm text-muted-foreground mt-1">Aggregated evaluation results across experiments</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <MetricCard label="Best MPJPE" value="42.3" unit="mm" accent tooltip="Best MPJPE across all experiments" />
          <MetricCard label="Best PA-MPJPE" value="38.1" unit="mm" tooltip="Best PA-MPJPE across all experiments" />
          <MetricCard label="Total Experiments" value="12" />
          <MetricCard label="Avg FPS" value="41.2" unit="fps" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <MiniChart
            title="Per-Joint Error (mm)"
            type="bar"
            data={perJointData}
            color="hsl(215, 80%, 55%)"
          />
          <MiniChart
            title="MPJPE Trend Over Versions"
            type="line"
            data={modelTrend}
            color="hsl(215, 80%, 55%)"
            color2="hsl(185, 75%, 55%)"
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Results;
