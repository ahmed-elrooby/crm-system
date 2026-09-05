"use client";

import React from "react";
import { FiArrowLeft } from "react-icons/fi";

const recentCustomers = [
  {
    initials: "آي",
    name: "آية مصطفى",
    company: "تك مصر للخدمات المالية",
    category: "مميز",
    status: "نشط",
    date: "2026-10-10",
  },
  {
    initials: "دي",
    name: "دينا عزت",
    company: "موجة إعلام",
    category: "عادي",
    status: "معلق",
    date: "2026-09-20",
  },
  {
    initials: "حس",
    name: "حسن جمال",
    company: "مدينة للتطوير العقاري",
    category: "مميز",
    status: "نشط",
    date: "2026-09-02",
  },
  {
    initials: "من",
    name: "منى فوزي",
    company: "الوادي الأخضر للتصدير",
    category: "محتمل",
    status: "نشط",
    date: "2026-08-14",
  },
  {
    initials: "هب",
    name: "هبة سمير",
    company: "مدارس المستقبل",
    category: "مميز",
    status: "نشط",
    date: "2026-07-07",
  },
];

const categoryStyles = {
  مميز: "bg-purple-50 text-purple-600",
  عادي: "bg-blue-50 text-blue-600",
  محتمل: "bg-amber-50 text-amber-600",
};

const statusStyles = {
  نشط: "bg-green-50 text-green-600",
  معلق: "bg-yellow-50 text-yellow-600",
};

const RecentCustomers = () => {
  const handleViewCustomer = (customer) => {
    console.log(`فتح صفحة العميل: ${customer.name}`);
  };

  return (
    <div dir="rtl" className="p-5 bg-white dash-card rounded-xl">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 mb-3">
        <h3 className="text-lg font-semibold text-slate-800">أحدث العملاء</h3>

        <button
          type="button"
          className="flex items-center gap-1 text-xs font-medium text-blue-600 transition group hover:text-blue-700"
        >
          عرض جميع العملاء
          <FiArrowLeft
            size={14}
            className="transition-transform duration-200 group-hover:-translate-x-1"
          />
        </button>
      </div>

      {/* Table Wrapper */}
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

              <th className="px-3 py-3 text-xs font-medium text-slate-400">
                #
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {recentCustomers.map((customer) => (
              <tr
                key={customer.name}
                className="transition border-b border-slate-50 hover:bg-slate-50"
              >
                {/* Customer */}
                <td className="px-3 py-3">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-8 h-8 text-xs font-semibold text-blue-600 rounded-full shrink-0 bg-blue-50">
                      {customer.initials}
                    </div>

                    <span className="text-sm font-medium text-slate-800">
                      {customer.name}
                    </span>
                  </div>
                </td>

                {/* Company */}
                <td className="px-3 py-3">
                  <span className="text-sm text-slate-600">
                    {customer.company}
                  </span>
                </td>

                {/* Category */}
                <td className="px-3 py-3">
                  <span
                    className={`rounded-md px-2 py-1 text-xs font-medium ${
                      categoryStyles[customer.category]
                    }`}
                  >
                    {customer.category}
                  </span>
                </td>

                {/* Status */}
                <td className="px-3 py-3">
                  <span
                    className={`rounded-md px-2 py-1 text-xs font-medium ${
                      statusStyles[customer.status]
                    }`}
                  >
                    {customer.status}
                  </span>
                </td>

                {/* Date */}
                <td className="px-3 py-3">
                  <span className="text-sm text-slate-500">
                    {customer.date}
                  </span>
                </td>

                {/* Action */}
                <td className="px-3 py-3">
                  <button
                    type="button"
                    onClick={() => handleViewCustomer(customer)}
                    className="text-sm font-medium text-blue-600 transition hover:text-blue-700 hover:underline"
                  >
                    عرض
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentCustomers;
