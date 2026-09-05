import React from "react";
import {
  FiUsers,
  FiUserCheck,
  FiUserPlus,
  FiActivity,
  FiArrowUp,
} from "react-icons/fi";

const Cards = () => {
  const stats = [
    {
      label: "إجمالي العملاء",
      number: 15,
      trend: "+12.5%",
      sub: "مقارنة بالشهر الماضي",
      icon: FiUsers,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      label: "العملاء النشطون",
      number: 10,
      trend: "+8.2%",
      sub: "مقارنة بالشهر الماضي",
      icon: FiUserCheck,
      iconBg: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      label: "العملاء الجدد",
      number: 1,
      trend: "+15.4%",
      sub: "هذا الشهر",
      icon: FiUserPlus,
      iconBg: "bg-amber-50",
      iconColor: "text-amber-600",
    },
    {
      label: "إجمالي النشاطات",
      number: 6,
      trend: "+10.8%",
      sub: "هذا الشهر",
      icon: FiActivity,
      iconBg: "bg-purple-50",
      iconColor: "text-purple-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="relative p-5 transition-all duration-300 bg-white border shadow-sm group rounded-2xl border-slate-200/70 hover:shadow-md hover:-translate-y-1 hover:border-primary/20"
          >
            <div className="flex items-start justify-between gap-4">
              {/* النص */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-500 mb-1.5">
                  {stat.label}
                </p>
                <p className="text-3xl font-extrabold tracking-tight text-slate-800">
                  {stat.number}
                </p>
                <div className="flex flex-wrap items-center gap-2 mt-3">
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    <FiArrowUp size={12} />
                    {stat.trend}
                  </span>
                  <span className="text-xs text-slate-400">{stat.sub}</span>
                </div>
              </div>

              {/* الأيقونة */}
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${stat.iconBg} ${stat.iconColor} transition-transform duration-200 group-hover:scale-105`}
              >
                <Icon size={22} />
              </div>
            </div>

            {/* خط سفلي خفيف عند hover (تأثير بصري) */}
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary/0 rounded-b-2xl transition-colors duration-300 group-hover:bg-primary/30" />
          </div>
        );
      })}
    </div>
  );
};

export default Cards;
