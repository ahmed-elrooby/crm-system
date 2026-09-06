"use client";

import React, { useContext, useMemo } from "react";
import { userContext } from "../../../../../../Providers/CustomerProvider/Customer.js";

const TopCustomers = () => {
  const { analytics } = useContext(userContext);

  const topCustomers = useMemo(() => {
    return analytics?.data?.topCustomers || [];
  }, [analytics]);

  return (
    <div
      dir="rtl"
      className="p-5 bg-white border shadow-sm border-slate-100 rounded-xl"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-slate-800">أهم العملاء</h3>

        <span className="text-xs text-slate-400">
          آخر {topCustomers.length} عملاء
        </span>
      </div>

      {/* Customers */}
      {topCustomers.length > 0 ? (
        <div className="space-y-2">
          {topCustomers.map((customer) => {
            const name = customer.customerName || "عميل غير معروف";

            const initials = name
              .split(" ")
              .slice(0, 2)
              .map((word) => word.charAt(0))
              .join("");

            return (
              <div
                key={customer.customerId}
                className="flex items-center justify-between gap-3 rounded-xl p-2.5 transition hover:bg-slate-50"
              >
                {/* Customer Info */}
                <div className="flex items-center min-w-0 gap-3">
                  {/* Avatar */}
                  <div
                    className="flex items-center justify-center text-xs font-semibold rounded-full h-9 w-9 shrink-0"
                    style={{
                      backgroundColor: `${customer.categoryColor || "#2563EB"}15`,
                      color: customer.categoryColor || "#2563EB",
                    }}
                  >
                    {initials}
                  </div>

                  {/* Name */}
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate text-slate-800">
                      {name}
                    </p>

                    <p className="text-xs truncate text-slate-500">
                      {customer.companyName || "بدون شركة"}
                    </p>
                  </div>
                </div>

                {/* Category + Activities */}
                <div className="flex items-center gap-3 shrink-0">
                  <span
                    className="px-2 py-1 text-xs font-medium rounded-md"
                    style={{
                      backgroundColor: `${customer.categoryColor || "#2563EB"}15`,
                      color: customer.categoryColor || "#2563EB",
                    }}
                  >
                    {customer.categoryName || "غير مصنف"}
                  </span>

                  <span className="text-xs text-slate-500">
                    {Number(customer.activitiesCount || 0)} نشاط
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex items-center justify-center py-10 text-sm text-slate-400">
          لا توجد بيانات للعملاء
        </div>
      )}
    </div>
  );
};

export default TopCustomers;
