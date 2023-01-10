import {
	Area,
	AreaChart,
	BarChart,
	Bar,
	PieChart,
	Pie,
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";

import "./Charts.scss";

function Charts() {
	const data = [
		{
			name: "Page A",
			uv: 4000,
			pv: 2400,
			amt: 2400,
		},
		{
			name: "Page B",
			uv: 3000,
			pv: 1398,
			amt: 2210,
		},
		{
			name: "Page C",
			uv: 2000,
			pv: 9800,
			amt: 2290,
		},
		{
			name: "Page D",
			uv: 2780,
			pv: 3908,
			amt: 2000,
		},
		{
			name: "Page E",
			uv: 1890,
			pv: 4800,
			amt: 2181,
		},
		{
			name: "Page F",
			uv: 2390,
			pv: 3800,
			amt: 2500,
		},
		{
			name: "Page G",
			uv: 3490,
			pv: 4300,
			amt: 2100,
		},
	];

	const data01 = [
		{ name: "Group A", value: 400 },
		{ name: "Group B", value: 300 },
		{ name: "Group C", value: 300 },
		{ name: "Group D", value: 200 },
	];
	const data02 = [
		{ name: "A1", value: 100 },
		{ name: "A2", value: 300 },
		{ name: "B1", value: 100 },
		{ name: "B2", value: 80 },
		{ name: "B3", value: 40 },
		{ name: "B4", value: 30 },
		{ name: "B5", value: 50 },
		{ name: "C1", value: 100 },
		{ name: "C2", value: 200 },
		{ name: "D1", value: 150 },
		{ name: "D2", value: 50 },
	];

	return (
		<>
			<div className="charts-block">
				<ResponsiveContainer width="100%" height="100%">
					<LineChart
						width={500}
						height={300}
						data={data}
						margin={{
							top: 5,
							right: 30,
							left: 20,
							bottom: 5,
						}}
					>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="name" />
						<YAxis />
						<Tooltip />
						<Legend />
						<Line
							type="monotone"
							dataKey="pv"
							stroke="#8884d8"
							activeDot={{ r: 8 }}
						/>
						<Line type="monotone" dataKey="uv" stroke="#82ca9d" />
					</LineChart>
				</ResponsiveContainer>
			</div>
			<div className="charts-block">
				<ResponsiveContainer width="100%" height="100%">
					<BarChart
						width={500}
						height={300}
						data={data}
						margin={{
							top: 20,
							right: 30,
							left: 20,
							bottom: 5,
						}}
					>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="name" />
						<YAxis
							yAxisId="left"
							orientation="left"
							stroke="#8884d8"
						/>
						<YAxis
							yAxisId="right"
							orientation="right"
							stroke="#82ca9d"
						/>
						<Tooltip />
						<Legend />
						<Bar yAxisId="left" dataKey="pv" fill="#8884d8" />
						<Bar yAxisId="right" dataKey="uv" fill="#82ca9d" />
					</BarChart>
				</ResponsiveContainer>
			</div>
			<div className="charts-block">
				<ResponsiveContainer width="100%" height="100%">
					<PieChart width={400} height={400}>
						<Pie
							data={data01}
							dataKey="value"
							cx="50%"
							cy="50%"
							outerRadius={60}
							fill="#8884d8"
						/>
						<Pie
							data={data02}
							dataKey="value"
							cx="50%"
							cy="50%"
							innerRadius={70}
							outerRadius={90}
							fill="#82ca9d"
							label
						/>
					</PieChart>
				</ResponsiveContainer>
			</div>
			<div className="charts-block">
				<ResponsiveContainer>
					<AreaChart
						data={data}
						margin={{
							top: 10,
							right: 30,
							left: 0,
							bottom: 0,
						}}
					>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="name" />
						<YAxis />
						<Tooltip />
						<Area
							type="monotone"
							dataKey="uv"
							stroke="#8884d8"
							fill="#8884d8"
						/>
					</AreaChart>
				</ResponsiveContainer>
			</div>
		</>
	);
}

export default Charts;
