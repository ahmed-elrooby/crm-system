"use client";

import React, { useContext, useMemo } from "react";
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

import { userContext } from "../../../../../../Providers/CustomerProvider/Customer.js";

const CustomerChart = () => {
  const { customers } = useContext(userContext);

  const currentYear = new Date().getFullYear();

  const data = useMemo(() => {
    const months = [
      "يناير",
      "فبراير",
      "مارس",
      "أبريل",
      "مايو",
      "يونيو",
      "يوليو",
      "أغسطس",
      "سبتمبر",
      "أكتوبر",
      "نوفمبر",
      "ديسمبر",
    ];

    // عدد العملاء الجدد في كل شهر
    const monthlyNewCustomers = Array(12).fill(0);

    customers?.forEach((customer) => {
      if (!customer?.createdAt) return;

      const date = new Date(customer.createdAt);

      if (date.getFullYear() === currentYear) {
        const monthIndex = date.getMonth();

        monthlyNewCustomers[monthIndex]++;
      }
    });

    // حساب إجمالي العملاء بشكل تراكمي
    let totalCustomers = 0;

    return months.map((month, index) => {
      totalCustomers += monthlyNewCustomers[index];

      return {
        month,
        customers: totalCustomers,
        newCustomers: monthlyNewCustomers[index],
      };
    });
  }, [customers, currentYear]);

  const maxCustomers = Math.max(...data.map((item) => item.customers), 10);

  const yAxisMax = Math.ceil(maxCustomers / 10) * 10;

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

        <span className="text-sm text-slate-400">{currentYear}</span>
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
            <CartesianGrid
              strokeDasharray="0"
              vertical={false}
              stroke="#e2e8f0"
            />

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

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{
                fontSize: 10,
                fill: "#64748b",
              }}
              domain={[0, yAxisMax]}
              width={35}
            />

            <Tooltip
              contentStyle={{
                borderRadius: "10px",
                border: "1px solid #e2e8f0",
                boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
                fontSize: "12px",
              }}
              formatter={(value, name) => [value, name]}
            />

            <Legend
              verticalAlign="top"
              height={35}
              iconType="circle"
              wrapperStyle={{
                fontSize: "12px",
              }}
            />

            {/* Area */}
            <Area
              type="monotone"
              dataKey="customers"
              stroke="none"
              fill="#2563eb"
              fillOpacity={0.08}
              legendType="none"
            />

            {/* إجمالي العملاء */}
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

            {/* العملاء الجدد */}
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
