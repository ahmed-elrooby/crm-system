import React from "react";

const topCustomers = [
  {
    initials: "أح",
    name: "أحمد علي",
    company: "شركة النور للتجارة",
    type: "مميز",
    activities: "1 نشاط",
    badge: "bg-purple-50 text-purple-600",
  },
  {
    initials: "مح",
    name: "محمد حسن",
    company: "شركة المستقبل للاستثمار",
    type: "عادي",
    activities: "1 نشاط",
    badge: "bg-blue-50 text-blue-600",
  },
  {
    initials: "سر",
    name: "سارة خالد",
    company: "شركة التقنية المتقدمة",
    type: "محتمل",
    activities: "1 نشاط",
    badge: "bg-amber-50 text-amber-600",
  },
  {
    initials: "خا",
    name: "خالد يوسف",
    company: "مجموعة الدلتا",
    type: "مميز",
    activities: "1 نشاط",
    badge: "bg-purple-50 text-purple-600",
  },
];

const TopCustomers = () => {
  return (
    <div dir="rtl" className="p-5 bg-white dash-card rounded-xl">
      {/* Header */}
      <h3 className="mb-3 text-lg font-semibold text-slate-800">أهم العملاء</h3>

      {/* Customers */}
      <div className="space-y-2">
        {topCustomers.map((customer) => (
          <div
            key={customer.name}
            className="flex items-center justify-between gap-3 rounded-xl p-2.5 transition hover:bg-slate-50"
          >
            {/* Customer Info */}
            <div className="flex items-center min-w-0 gap-3">
              {/* Avatar */}
              <div className="flex items-center justify-center text-xs font-semibold text-blue-600 rounded-full h-9 w-9 shrink-0 bg-blue-50">
                {customer.initials}
              </div>

              {/* Name */}
              <div className="min-w-0">
                <p className="text-sm font-medium truncate text-slate-800">
                  {customer.name}
                </p>

                <p className="text-xs truncate text-slate-500">
                  {customer.company}
                </p>
              </div>
            </div>

            {/* Customer Type + Activities */}
            <div className="flex items-center gap-3 shrink-0">
              <span
                className={`rounded-md px-2 py-1 text-xs font-medium ${customer.badge}`}
              >
                {customer.type}
              </span>

              <span className="text-xs text-slate-500">
                {customer.activities}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopCustomers;
