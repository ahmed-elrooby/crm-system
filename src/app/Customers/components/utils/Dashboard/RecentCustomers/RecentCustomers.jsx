"use client";

import React, { useContext, useMemo } from "react";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import { userContext } from "../../../../../../Providers/CustomerProvider/Customer.js";

const RecentCustomers = () => {
  const { customers } = useContext(userContext);

  // حالات العملاء
  const customerStatuses = {
    1: {
      label: "عميل محتمل",
      className: "bg-slate-50 text-slate-600",
    },
    2: {
      label: "تم التواصل",
      className: "bg-blue-50 text-blue-600",
    },
    3: {
      label: "مهتم",
      className: "bg-purple-50 text-purple-600",
    },
    4: {
      label: "مؤهل",
      className: "bg-cyan-50 text-cyan-600",
    },
    5: {
      label: "تفاوض",
      className: "bg-orange-50 text-orange-600",
    },
    6: {
      label: "تم التعاقد",
      className: "bg-indigo-50 text-indigo-600",
    },
    7: {
      label: "قيد التنفيذ",
      className: "bg-yellow-50 text-yellow-600",
    },
    8: {
      label: "تم التسليم",
      className: "bg-green-50 text-green-600",
    },
    9: {
      label: "مدفوع جزئيًا",
      className: "bg-amber-50 text-amber-600",
    },
    10: {
      label: "مدفوع بالكامل",
      className: "bg-emerald-50 text-emerald-600",
    },
    11: {
      label: "ملغي",
      className: "bg-red-50 text-red-600",
    },
  };

  // أحدث 5 عملاء
  const recentCustomers = useMemo(() => {
    if (!Array.isArray(customers)) return [];

    return [...customers]
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
      .slice(0, 5);
  }, [customers]);

  // Initials
  const getInitials = (name) => {
    if (!name) return "؟";

    return name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((word) => word.charAt(0))
      .join("");
  };

  // Format Date
  const formatDate = (date) => {
    if (!date) return "-";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) return "-";

    return parsedDate.toLocaleDateString("ar-EG", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  return (
    <div className="p-5 bg-white border shadow-sm border-slate-100 rounded-xl">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 mb-3">
        <h3 className="text-lg font-semibold text-slate-800">أحدث العملاء</h3>

        <Link
          href="/Customers/Customer"
          className="flex items-center gap-1 text-xs font-medium text-blue-600 transition group hover:text-blue-700"
        >
          عرض جميع العملاء
          <FiArrowLeft
            size={14}
            className="transition-transform duration-200 group-hover:-translate-x-1"
          />
        </Link>
      </div>

      {/* Empty State */}
      {recentCustomers.length === 0 ? (
        <div className="flex items-center justify-center py-10 text-sm text-slate-400">
          لا توجد بيانات للعملاء
        </div>
      ) : (
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[700px] text-right">
            {/* Table Head */}
            <thead>
              <tr className="border-b border-slate-100">
                <th className="px-3 py-3 text-xs font-medium text-slate-400">
                  العميل
                </th>

                <th className="px-3 py-3 text-xs font-medium text-slate-400">
                  الشركة
                </th>

                <th className="px-3 py-3 text-xs font-medium text-slate-400">
                  التصنيف
                </th>

                <th className="px-3 py-3 text-xs font-medium text-slate-400">
                  الحالة
                </th>

                <th className="px-3 py-3 text-xs font-medium text-slate-400">
                  تاريخ الإضافة
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {recentCustomers.map((customer) => {
                const status = customerStatuses[Number(customer.status)] || {
                  label: "غير معروف",
                  className: "bg-slate-50 text-slate-500",
                };

                return (
                  <tr
                    key={customer.id}
                    className="transition border-b border-slate-50 hover:bg-slate-50"
                  >
                    {/* Customer */}
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center justify-center w-8 h-8 text-xs font-semibold text-blue-600 rounded-full shrink-0 bg-blue-50">
                          {getInitials(customer.fullName)}
                        </div>

                        <span className="text-sm font-medium text-slate-800">
                          {customer.fullName || "بدون اسم"}
                        </span>
                      </div>
                    </td>

                    {/* Company */}
                    <td className="px-3 py-3">
                      <span className="text-sm text-slate-600">
                        {customer.companyName || "-"}
                      </span>
                    </td>

                    {/* Category */}
                    <td className="px-3 py-3">
                      <span className="px-2 py-1 text-xs font-medium text-blue-600 rounded-md bg-blue-50">
                        {customer.customerCategoryName || "غير مصنف"}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-3 py-3">
                      <span
                        className={`inline-flex rounded-md px-2 py-1 text-xs font-medium ${status.className}`}
                      >
                        {status.label}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="px-3 py-3">
                      <span className="text-sm text-slate-500">
                        {formatDate(customer.createdAt)}
                      </span>
                    </td>

                    {/* Action */}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RecentCustomers;
