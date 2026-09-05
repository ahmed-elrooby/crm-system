"use client";

import React, { useContext } from "react";
import {
  FiFolder,
  FiCheckCircle,
  FiXCircle,
  FiFileText,
  FiArrowUpRight,
} from "react-icons/fi";

import { userContext } from "../../../../../Providers/CustomerProvider/Customer.js";

const Cards = () => {
  const { filesCategories } = useContext(userContext);
  console.log(filesCategories);
  const totalCategories = filesCategories?.length || 0;

  const activeCategories =
    filesCategories?.filter((category) => category?.isActive).length || 0;

  const inactiveCategories =
    filesCategories?.filter((category) => !category?.isActive).length || 0;

  const stats = [
    {
      title: "إجمالي التصنيفات",
      value: totalCategories,
      icon: FiFolder,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
      accent: "bg-blue-600",
      description: "جميع التصنيفات",
    },
    {
      title: "التصنيفات النشطة",
      value: activeCategories,
      icon: FiCheckCircle,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
      accent: "bg-emerald-500",
      description: "متاحة للاستخدام",
    },
    {
      title: "التصنيفات غير النشطة",
      value: inactiveCategories,
      icon: FiXCircle,
      iconBg: "bg-red-50",
      iconColor: "text-red-600",
      accent: "bg-red-500",
      description: "غير متاحة حاليًا",
    },
    {
      title: "نسبة النشاط",
      value:
        totalCategories > 0
          ? `${Math.round((activeCategories / totalCategories) * 100)}%`
          : "0%",
      icon: FiFileText,
      iconBg: "bg-violet-50",
      iconColor: "text-violet-600",
      accent: "bg-violet-600",
      description: "من التصنيفات نشطة",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 mt-4 mb-6 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;

        return (
          <div
            key={index}
            className="relative p-5 overflow-hidden transition-all duration-300 bg-white border border-slate-200 rounded-2xl hover:-translate-y-1 hover:shadow-lg group"
          >
            {/* Accent */}
            <div
              className={`absolute top-0 right-0 w-full h-1 ${stat.accent}`}
            />

            {/* Top */}
            <div className="flex items-start justify-between">
              <div
                className={`flex items-center justify-center w-12 h-12 rounded-2xl ${stat.iconBg} ${stat.iconColor} transition-transform duration-300 group-hover:scale-110`}
              >
                <Icon className="w-6 h-6" />
              </div>

              <div className="flex items-center justify-center w-8 h-8 transition-colors rounded-full bg-slate-50 text-slate-400 group-hover:bg-slate-100">
                <FiArrowUpRight className="w-4 h-4" />
              </div>
            </div>

            {/* Content */}
            <div className="mt-5">
              <p className="mb-1 text-sm font-medium text-slate-500">
                {stat.title}
              </p>

              <div className="flex items-end justify-between gap-3">
                <h3 className="text-3xl font-bold tracking-tight text-slate-800">
                  {stat.value}
                </h3>

                <span className="pb-1 text-xs text-slate-400">
                  {stat.description}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Cards;
