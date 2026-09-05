"use client";

import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Area,
} from "recharts";

const CustomerChart = () => {
  const data = [
    {
      month: "يناير",
      customers: 180,
      newCustomers: 8,
    },
    {
      month: "فبراير",
      customers: 210,
      newCustomers: 10,
    },
    {
      month: "مارس",
      customers: 240,
      newCustomers: 14,
    },
    {
      month: "أبريل",
      customers: 280,
      newCustomers: 18,
    },
    {
      month: "مايو",
      customers: 320,
      newCustomers: 22,
    },
    {
      month: "يونيو",
      customers: 360,
      newCustomers: 25,
    },
    {
      month: "يوليو",
      customers: 390,
      newCustomers: 18,
    },
    {
      month: "أغسطس",
      customers: 420,
      newCustomers: 12,
    },
  ];

  return (
    <div className="bg-white border col-span-2 border-slate-100 rounded-2xl shadow-sm p-5 h-[390px]">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-lg font-bold text-slate-800">نمو العملاء</h2>

          <p className="mt-1 text-xs text-slate-400">
            عدد العملاء خلال الفترة المحددة
          </p>
        </div>

        <button className="text-sm transition-colors text-slate-400 hover:text-blue-600">
          آخر 8 أشهر
        </button>
      </div>

      {/* Chart */}
      <div className="w-full h-[290px]" dir="rtl">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 10,
              right: 5,
              left: 0,
              bottom: 5,
            }}
          >
            {/* Grid */}
            <CartesianGrid
              strokeDasharray="0"
              vertical={false}
              stroke="#e2e8f0"
            />

            {/* X Axis */}
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{
                fontSize: 11,
                fill: "#64748b",
              }}
              dy={8}
            />

            {/* Y Axis */}
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{
                fontSize: 10,
                fill: "#64748b",
              }}
              domain={[0, 450]}
              ticks={[0, 50, 100, 150, 200, 250, 300, 350, 400, 450]}
              width={35}
            />

            {/* Tooltip */}
            <Tooltip
              contentStyle={{
                borderRadius: "10px",
                border: "1px solid #e2e8f0",
                boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
                fontSize: "12px",
              }}
            />

            {/* Legend */}
            <Legend
              verticalAlign="top"
              height={35}
              iconType="circle"
              wrapperStyle={{
                fontSize: "12px",
              }}
            />

            {/* Area under customers line */}
            <Area
              type="monotone"
              dataKey="customers"
              stroke="none"
              fill="#2563eb"
              fillOpacity={0.08}
              legendType="none"
            />

            {/* Total Customers */}
            <Line
              type="monotone"
              dataKey="customers"
              name="إجمالي العملاء"
              stroke="#2563eb"
              strokeWidth={3}
              dot={{
                r: 4,
                fill: "#2563eb",
                strokeWidth: 0,
              }}
              activeDot={{
                r: 6,
              }}
            />

            {/* New Customers */}
            <Line
              type="monotone"
              dataKey="newCustomers"
              name="العملاء الجدد"
              stroke="#22c55e"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{
                r: 4,
                fill: "#22c55e",
                strokeWidth: 0,
              }}
              activeDot={{
                r: 5,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CustomerChart;
