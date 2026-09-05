import React from "react";
import {
  FiFileText,
  FiCalendar,
  FiFile,
  FiImage,
  FiArrowUpRight,
} from "react-icons/fi";

const Cards = () => {
  const cards = [
    {
      title: "إجمالي المستندات",
      value: 10,
      description: "جميع مستندات العملاء",
      icon: FiFileText,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      title: "مستندات اليوم",
      value: 1,
      description: "تمت إضافتها اليوم",
      icon: FiCalendar,
      iconBg: "bg-indigo-50",
      iconColor: "text-indigo-600",
    },
    {
      title: "ملفات PDF",
      value: 3,
      description: "مستندات بصيغة PDF",
      icon: FiFile,
      iconBg: "bg-red-50",
      iconColor: "text-red-500",
    },
    {
      title: "الصور",
      value: 3,
      description: "صور مرفوعة للعملاء",
      icon: FiImage,
      iconBg: "bg-purple-50",
      iconColor: "text-purple-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 lg:grid-cols-4 md:gap-5">
      {cards.map((card, index) => {
        const Icon = card.icon;

        return (
          <div
            key={index}
            className="relative p-5 overflow-hidden transition-all duration-300 bg-white border shadow-sm border-slate-200 rounded-2xl hover:-translate-y-1 hover:shadow-md group"
          >
            {/* Top Accent */}
            <div
              className={`absolute top-0 left-0 right-0 h-1 ${
                index === 0
                  ? "bg-blue-500"
                  : index === 1
                    ? "bg-indigo-500"
                    : index === 2
                      ? "bg-red-500"
                      : "bg-purple-500"
              }`}
            />

            <div className="flex items-start justify-between gap-3">
              {/* Content */}
              <div className="flex-1">
                <p className="mb-2 text-sm font-medium text-slate-500">
                  {card.title}
                </p>

                <div className="flex items-end gap-2">
                  <p className="text-3xl font-bold leading-none text-slate-800">
                    {card.value}
                  </p>

                  <div className="flex items-center mb-1 text-xs font-medium text-emerald-600">
                    <FiArrowUpRight size={14} />
                  </div>
                </div>

                <p className="mt-2 text-xs text-slate-400">
                  {card.description}
                </p>
              </div>

              {/* Icon */}
              <div
                className={`flex items-center justify-center w-12 h-12 rounded-xl ${card.iconBg} ${card.iconColor} transition-transform duration-300 group-hover:scale-110`}
              >
                <Icon size={22} strokeWidth={2} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Cards;
