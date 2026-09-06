"use client";

import React, { useContext } from "react";

import {
  FiUsers,
  FiUserCheck,
  FiUserX,
  FiFileText,
  FiFile,
  FiDollarSign,
} from "react-icons/fi";
import { userContext } from "../../../../../../Providers/CustomerProvider/Customer.js";

const Cards = () => {
  const { analytics } = useContext(userContext);

  const general = analytics?.data?.general || {};

  const formatNumber = (value) => {
    return Number(value || 0).toLocaleString("en-US");
  };

  const formatMoney = (value) => {
    return `${Number(value || 0).toLocaleString("en-US")} EGP`;
  };

  const stats = [
    {
      label: "إجمالي العملاء",
      number: general.totalCustomers,
      sub: "إجمالي العملاء المسجلين",
      icon: FiUsers,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      label: "العملاء النشطون",
      number: general.totalActiveCustomers,
      sub: "العملاء النشطون حاليًا",
      icon: FiUserCheck,
      iconBg: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      label: "العملاء غير النشطين",
      number: general.totalInactiveCustomers,
      sub: "العملاء غير النشطين",
      icon: FiUserX,
      iconBg: "bg-red-50",
      iconColor: "text-red-600",
    },
    {
      label: "إجمالي عروض الأسعار",
      number: general.totalQuotations,
      sub: "عدد عروض الأسعار",
      icon: FiFileText,
      iconBg: "bg-amber-50",
      iconColor: "text-amber-600",
    },
    {
      label: "إجمالي الفواتير",
      number: general.totalInvoices,
      sub: "عدد الفواتير",
      icon: FiFile,
      iconBg: "bg-purple-50",
      iconColor: "text-purple-600",
    },
    {
      label: "إجمالي المبيعات",
      number: general.totalSales,
      sub: "إجمالي قيمة المبيعات",
      icon: FiDollarSign,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
      money: true,
    },
  ];

  return (
    <div
      dir="rtl"
      className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
    >
      {stats.map((stat, index) => {
        const Icon = stat.icon;

        return (
          <div
            key={index}
            className="relative p-5 transition-all duration-300 bg-white border shadow-sm  group rounded-2xl border-slate-200/70 hover:shadow-md hover:-translate-y-1 hover:border-primary/20"
          >
            <div className="flex items-start justify-between gap-4">
              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="mb-1.5 text-sm font-medium text-slate-500">
                  {stat.label}
                </p>

                <p className="text-3xl font-extrabold tracking-tight text-slate-800">
                  {stat.money
                    ? formatMoney(stat.number)
                    : formatNumber(stat.number)}
                </p>

                <p className="mt-3 text-xs text-slate-400">{stat.sub}</p>
              </div>

              {/* Icon */}
              <div
                className={`
                  w-12
                  h-12
                  rounded-xl
                  flex
                  items-center
                  justify-center
                  flex-shrink-0
                  ${stat.iconBg}
                  ${stat.iconColor}
                  transition-transform
                  duration-200
                  group-hover:scale-105
                `}
              >
                <Icon size={22} />
              </div>
            </div>

            {/* Bottom hover line */}
            <div
              className="
                absolute
                bottom-0
                left-0
                right-0
                h-0.5
                rounded-b-2xl
                bg-primary/0
                transition-colors
                duration-300
                group-hover:bg-primary/30
              "
            />
          </div>
        );
      })}
    </div>
  );
};

export default Cards;
