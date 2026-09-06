"use client";

import React, { useContext, useMemo, useState } from "react";
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

import { userContext } from "../../../../../../Providers/CustomerProvider/Customer.js";

const COLORS = [
  "#8B5CF6",
  "#3B82F6",
  "#F59E0B",
  "#22C55E",
  "#06B6D4",
  "#EC4899",
  "#F97316",
  "#6366F1",
  "#14B8A6",
  "#A855F7",
  "#0EA5E9",
  "#84CC16",
];

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
  const { analytics } = useContext(userContext);

  const [period, setPeriod] = useState("month");

  const data = useMemo(() => {
    const monthly = analytics?.data?.monthly || [];

    if (!monthly.length) return [];

    // الشهر الحالي
    const currentMonth = new Date().getMonth() + 1;

    let filteredData = [];

    if (period === "month") {
      filteredData = monthly.filter((item) => item.month === currentMonth);
    }

    if (period === "quarter") {
      const startMonth = Math.max(currentMonth - 2, 1);

      filteredData = monthly.filter(
        (item) => item.month >= startMonth && item.month <= currentMonth,
      );
    }

    if (period === "year") {
      filteredData = monthly;
    }

    return filteredData.map((item, index) => {
      const quotations = Number(item.quotations || 0);
      const salesOrders = Number(item.salesOrders || 0);
      const invoices = Number(item.invoices || 0);
      const paid = Number(item.paid || 0);
      const creditNotes = Number(item.creditNotes || 0);

      const total = quotations + salesOrders + invoices + paid + creditNotes;

      return {
        name: item.monthName,

        value: total,

        quotations,
        salesOrders,
        invoices,
        paid,
        creditNotes,

        color: COLORS[index % COLORS.length],
      };
    });
  }, [analytics, period]);

  return (
    <div
      dir="rtl"
      className="p-5 mb-6 bg-white border shadow-sm border-slate-100 rounded-xl"
    >
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div>
          <h3 className="text-lg font-semibold text-slate-800">نشاط العملاء</h3>

          <p className="mt-1 text-xs text-slate-400">
            إجمالي النشاطات خلال الفترة المحددة
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
      <div className="w-full h-[200px]">
        {data.length > 0 ? (
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
              <CartesianGrid
                vertical={false}
                stroke="#E2E8F0"
                strokeDasharray="4 4"
              />

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

              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{
                  fontSize: 10,
                  fill: "#94A3B8",
                }}
                width={30}
                allowDecimals={false}
              />

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
                formatter={(value) => [`${value} نشاط`, "إجمالي النشاطات"]}
              />

              <Bar dataKey="value" radius={[7, 7, 2, 2]} maxBarSize={45}>
                {data.map((item, index) => (
                  <Cell key={`cell-${index}`} fill={item.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-full text-sm text-slate-400">
            لا توجد بيانات للنشاطات
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerActivity;
