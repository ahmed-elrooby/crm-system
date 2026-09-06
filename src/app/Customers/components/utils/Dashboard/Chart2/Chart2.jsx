"use client";

import React, { useContext, useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

import { userContext } from "../../../../../../Providers/CustomerProvider/Customer.js";

const CustomerDistribution = () => {
  const { customersCategories } = useContext(userContext);

  const data = useMemo(() => {
    if (!customersCategories?.length) return [];

    const categoriesWithCustomers = customersCategories.filter(
      (category) => Number(category?.customersCount || 0) > 0,
    );

    const total = categoriesWithCustomers.reduce(
      (sum, category) => sum + Number(category?.customersCount || 0),
      0,
    );

    if (!total) return [];

    return categoriesWithCustomers.map((category) => {
      const value = Number(category?.customersCount || 0);

      return {
        name: category?.name || "غير مصنف",
        value,
        percentage: ((value / total) * 100).toFixed(1),
        color: category?.color || "#2563EB",
      };
    });
  }, [customersCategories]);

  return (
    <div className="p-5 bg-white border shadow-sm border-slate-100 rounded-2xl">
      {/* Title */}
      <h3 className="mb-3 text-lg font-semibold text-slate-800">
        توزيع العملاء
      </h3>

      {/* Chart */}
      <div className="w-full h-[160px]">
        {data.length > 0 ? (
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

              <Tooltip
                formatter={(value, name) => [`${value} عميل`, name]}
                contentStyle={{
                  borderRadius: "10px",
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
                  fontSize: "12px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-full text-sm text-slate-400">
            لا توجد بيانات
          </div>
        )}
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

            <div className="flex items-center gap-2">
              <span className="font-medium text-slate-700">{item.value}</span>

              <span className="text-slate-400">({item.percentage}%)</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerDistribution;
