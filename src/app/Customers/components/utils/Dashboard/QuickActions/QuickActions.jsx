"use client";

import React from "react";
import {
  FiUserPlus,
  FiBookOpen,
  FiFileText,
  FiClock,
  FiLayers,
} from "react-icons/fi";

const quickActions = [
  {
    title: "إضافة عميل",
    icon: FiUserPlus,
    color: "blue",
  },
  {
    title: "إضافة جهة اتصال",
    icon: FiBookOpen,
    color: "green",
  },
  {
    title: "إضافة ملاحظة",
    icon: FiFileText,
    color: "amber",
  },
  {
    title: "إضافة نشاط",
    icon: FiClock,
    color: "purple",
  },
  {
    title: "إضافة مجموعة",
    icon: FiLayers,
    color: "rose",
  },
];

const colorStyles = {
  blue: {
    wrapper: "bg-blue-50",
    icon: "text-blue-600",
  },
  green: {
    wrapper: "bg-green-50",
    icon: "text-green-600",
  },
  amber: {
    wrapper: "bg-amber-50",
    icon: "text-amber-600",
  },
  purple: {
    wrapper: "bg-purple-50",
    icon: "text-purple-600",
  },
  rose: {
    wrapper: "bg-rose-50",
    icon: "text-rose-600",
  },
};

const QuickActions = () => {
  const handleAction = (action) => {
    console.log(`فتح نموذج: ${action.title}`);
  };

  return (
    <div className="p-5 bg-white border shadow-sm border-slate-100 rounded-xl">
      {/* Header */}
      <h3 className="mb-3 text-lg font-semibold text-slate-800">
        إجراءات سريعة
      </h3>

      {/* Actions */}
      <div className="grid items-center grid-cols-2 gap-3 md:grid-cols-5">
        {quickActions.map((action) => {
          const Icon = action.icon;
          const styles = colorStyles[action.color];

          return (
            <button
              key={action.title}
              type="button"
              onClick={() => handleAction(action)}
              className="group flex items-center gap-2 rounded-xl border border-slate-100 bg-white px-3 py-2.5 text-sm font-medium text-slate-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-200 hover:bg-slate-50 hover:shadow-sm"
            >
              {/* Icon */}
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-lg ${styles.wrapper}`}
              >
                <Icon size={18} className={styles.icon} />
              </span>

              {/* Title */}
              <span>{action.title}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;
