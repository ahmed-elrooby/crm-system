"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  {
    name: "مميز",
    value: 40,
    color: "#8B5CF6",
  },
  {
    name: "عادي",
    value: 40,
    color: "#3B82F6",
  },
  {
    name: "محتمل",
    value: 20,
    color: "#F59E0B",
  },
  {
    name: "تجزئة",
    value: 0,
    color: "#22C55E",
  },
  {
    name: "جملة",
    value: 0,
    color: "#06B6D4",
  },
];

const CustomerDistribution = () => {
  return (
    <div className="p-5 bg-white border shadow-sm border-slate-100 rounded-2xl">
      {/* Title */}
      <h3 className="mb-3 text-lg font-semibold text-slate-800">
        توزيع العملاء
      </h3>

      {/* Chart */}
      <div className="h-[160px] w-full ">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={42}
              outerRadius={68}
              paddingAngle={2}
              stroke="none"
            >
              {data.map((item) => (
                <Cell key={item.name} fill={item.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="mt-3 space-y-1 text-xs">
        {data.map((item) => (
          <div key={item.name} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{
                  backgroundColor: item.color,
                }}
              />

              <span className="text-slate-600">{item.name}</span>
            </div>

            <span className="font-medium text-slate-700">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerDistribution;
