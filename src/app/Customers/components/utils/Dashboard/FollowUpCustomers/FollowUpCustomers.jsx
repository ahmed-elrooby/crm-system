"use client";

import React from "react";
import { FiArrowLeft } from "react-icons/fi";

const customers = [
  {
    initials: "يا",
    name: "ياسر منصور",
    company: "النيل الأزرق للشحن",
    days: "منذ 42 يومًا",
    urgent: true,
  },
  {
    initials: "نا",
    name: "نادية إبراهيم",
    company: "شركة النيل للأدوية",
    days: "منذ 16 يومًا",
    urgent: true,
  },
  {
    initials: "سر",
    name: "سارة خالد",
    company: "شركة التقنية المتقدمة",
    days: "اليوم",
    urgent: false,
  },
  {
    initials: "لي",
    name: "ليلى أحمد",
    company: "شركة سمارت لتقنية المعلومات",
    days: "اليوم",
    urgent: false,
  },
];

const FollowUpCustomers = () => {
  const handleFollowUp = (customer) => {
    console.log(`فتح صفحة العميل: ${customer.name}`);
  };

  return (
    <div dir="rtl" className="p-5 bg-white dash-card rounded-xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-slate-800">
          عملاء يحتاجون متابعة
        </h3>

        <span className="text-xs text-slate-400">الأكثر تأخرًا</span>
      </div>

      {/* Customers */}
      <div className="space-y-2">
        {customers.map((customer) => (
          <div
            key={customer.name}
            className="p-3 transition-all duration-200 bg-white border rounded-xl border-slate-100 hover:border-slate-200 hover:bg-slate-50"
          >
            {/* Customer Info */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center min-w-0 gap-2">
                {/* Avatar */}
                <div className="flex items-center justify-center text-xs font-semibold text-blue-600 rounded-full h-9 w-9 shrink-0 bg-blue-50">
                  {customer.initials}
                </div>

                {/* Name & Company */}
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate text-slate-800">
                    {customer.name}
                  </p>

                  <p className="text-xs truncate text-slate-500">
                    {customer.company}
                  </p>
                </div>
              </div>

              {/* Days Badge */}
              <span
                className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-medium ${
                  customer.urgent
                    ? "bg-red-50 text-red-500"
                    : "bg-green-50 text-green-600"
                }`}
              >
                {customer.days}
              </span>
            </div>

            {/* Action */}
            <div className="flex justify-end mt-2">
              <button
                type="button"
                onClick={() => handleFollowUp(customer)}
                className="flex items-center gap-1 text-xs font-medium text-blue-600 transition-colors group hover:text-blue-700"
              >
                متابعة
                <FiArrowLeft
                  size={13}
                  className="transition-transform duration-200 group-hover:-translate-x-1"
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FollowUpCustomers;
