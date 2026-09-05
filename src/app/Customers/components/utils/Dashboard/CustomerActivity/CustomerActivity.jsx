"use client";

import { useState } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const activityData = {
  month: [
    {
      name: "الأسبوع 1",
      value: 35,
      color: "#8B5CF6",
    },
    {
      name: "الأسبوع 2",
      value: 52,
      color: "#3B82F6",
    },
    {
      name: "الأسبوع 3",
      value: 42,
      color: "#F59E0B",
    },
    {
      name: "الأسبوع 4",
      value: 68,
      color: "#22C55E",
    },
  ],

  quarter: [
    {
      name: "يونيو",
      value: 85,
      color: "#8B5CF6",
    },
    {
      name: "يوليو",
      value: 120,
      color: "#3B82F6",
    },
    {
      name: "أغسطس",
      value: 155,
      color: "#F59E0B",
    },
  ],

  year: [
    {
      name: "سبتمبر",
      value: 80,
      color: "#8B5CF6",
    },
    {
      name: "أكتوبر",
      value: 95,
      color: "#3B82F6",
    },
    {
      name: "نوفمبر",
      value: 110,
      color: "#F59E0B",
    },
    {
      name: "ديسمبر",
      value: 90,
      color: "#22C55E",
    },
    {
      name: "يناير",
      value: 130,
      color: "#06B6D4",
    },
    {
      name: "فبراير",
      value: 115,
      color: "#EC4899",
    },
    {
      name: "مارس",
      value: 145,
      color: "#F97316",
    },
    {
      name: "أبريل",
      value: 125,
      color: "#6366F1",
    },
    {
      name: "مايو",
      value: 160,
      color: "#14B8A6",
    },
    {
      name: "يونيو",
      value: 140,
      color: "#A855F7",
    },
    {
      name: "يوليو",
      value: 175,
      color: "#0EA5E9",
    },
    {
      name: "أغسطس",
      value: 190,
      color: "#84CC16",
    },
  ],
};

const filters = [
  {
    key: "month",
    label: "هذا الشهر",
  },
  {
    key: "quarter",
    label: "آخر ٣ أشهر",
  },
  {
    key: "year",
    label: "آخر سنة",
  },
];

const CustomerActivity = () => {
  const [period, setPeriod] = useState("month");

  const data = activityData[period];

  return (
    <div dir="rtl" className="p-5 mb-6 bg-white dash-card rounded-xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div>
          <h3 className="text-lg font-semibold text-slate-800">نشاط العملاء</h3>

          <p className="mt-1 text-xs text-slate-400">
            توزيع النشاطات حسب النوع
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-1 p-1 rounded-lg bg-slate-100">
          {filters.map((filter) => (
            <button
              key={filter.key}
              type="button"
              onClick={() => setPeriod(filter.key)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
                period === filter.key
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 10,
              right: 5,
              left: 0,
              bottom: 0,
            }}
            barCategoryGap="25%"
          >
            {/* Grid */}
            <CartesianGrid
              vertical={false}
              stroke="#E2E8F0"
              strokeDasharray="4 4"
            />

            {/* X Axis */}
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{
                fontSize: 10,
                fill: "#94A3B8",
              }}
              dy={8}
            />

            {/* Y Axis */}
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{
                fontSize: 10,
                fill: "#94A3B8",
              }}
              width={30}
            />

            {/* Tooltip */}
            <Tooltip
              cursor={{
                fill: "rgba(37, 99, 235, 0.04)",
              }}
              contentStyle={{
                border: "none",
                borderRadius: "10px",
                boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
                fontSize: "12px",
              }}
              formatter={(value) => [`${value} نشاط`, "النشاطات"]}
            />

            {/* Bars */}
            <Bar dataKey="value" radius={[7, 7, 2, 2]} maxBarSize={45}>
              {data.map((item, index) => (
                <Cell key={`cell-${index}`} fill={item.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CustomerActivity;
