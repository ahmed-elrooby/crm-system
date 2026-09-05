"use client";

import React, { useContext, useMemo } from "react";
import { FiUsers, FiUserPlus, FiTrendingUp, FiBriefcase } from "react-icons/fi";
import { userContext } from "../../../../../Providers/CustomerProvider/Customer.js";

const Cards = () => {
  const { customers = [] } = useContext(userContext);

  const stats = useMemo(() => {
    // إجمالي العملاء
    const totalCustomers = customers.length;

    // العملاء المحتملين
    const potentialCustomers = customers.filter(
      (customer) => Number(customer.status) === 1,
    ).length;

    // العملاء قيد المتابعة
    // Contacted = 2
    // Interested = 3
    // Qualified = 4
    // Negotiation = 5
    const followUpCustomers = customers.filter((customer) => {
      const status = Number(customer.status);

      return status >= 2 && status <= 5;
    }).length;

    // العملاء المتعاقد معهم
    const contractedCustomers = customers.filter(
      (customer) => Number(customer.status) === 6,
    ).length;

    // العملاء الجدد هذا الشهر
    const now = new Date();

    const newCustomers = customers.filter((customer) => {
      if (!customer.createdAt) return false;

      const createdDate = new Date(customer.createdAt);

      return (
        createdDate.getMonth() === now.getMonth() &&
        createdDate.getFullYear() === now.getFullYear()
      );
    }).length;

    return {
      totalCustomers,
      potentialCustomers,
      followUpCustomers,
      contractedCustomers,
      newCustomers,
    };
  }, [customers]);

  const cards = [
    {
      title: "إجمالي العملاء",
      value: stats.totalCustomers,
      description: "إجمالي العملاء المسجلين",
      icon: <FiUsers />,
      bgIcon: "bg-blue-50",
      iconColor: "text-blue-600",
      trend: "الكل",
      trendColor: "text-blue-600",
    },

    {
      title: "العملاء المحتملين",
      value: stats.potentialCustomers,
      description: "عملاء في مرحلة الاهتمام",
      icon: <FiTrendingUp />,
      bgIcon: "bg-amber-50",
      iconColor: "text-amber-600",
      trend: `${
        stats.totalCustomers > 0
          ? Math.round((stats.potentialCustomers / stats.totalCustomers) * 100)
          : 0
      }%`,
      trendColor: "text-amber-600",
    },

    {
      title: "قيد المتابعة",
      value: stats.followUpCustomers,
      description: "عملاء في مراحل المتابعة والتفاوض",
      icon: <FiUsers />,
      bgIcon: "bg-purple-50",
      iconColor: "text-purple-600",
      trend: `${
        stats.totalCustomers > 0
          ? Math.round((stats.followUpCustomers / stats.totalCustomers) * 100)
          : 0
      }%`,
      trendColor: "text-purple-600",
    },

    {
      title: "تم التعاقد",
      value: stats.contractedCustomers,
      description: "عملاء تم التعاقد معهم",
      icon: <FiBriefcase />,
      bgIcon: "bg-emerald-50",
      iconColor: "text-emerald-600",
      trend: `${
        stats.totalCustomers > 0
          ? Math.round((stats.contractedCustomers / stats.totalCustomers) * 100)
          : 0
      }%`,
      trendColor: "text-emerald-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card, index) => (
        <div
          key={index}
          className="relative p-5 overflow-hidden transition-all duration-300 bg-white border shadow-sm group rounded-2xl border-slate-100 hover:-translate-y-1 hover:shadow-lg"
        >
          {/* Top */}
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">{card.title}</p>

              <h3 className="mt-2 text-2xl font-bold text-slate-800">
                {card.value}
              </h3>
            </div>

            {/* Icon */}
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-xl text-xl ${card.bgIcon} ${card.iconColor}`}
            >
              {card.icon}
            </div>
          </div>

          {/* Bottom */}
          <div className="flex items-center justify-between gap-3 mt-5">
            <p className="text-xs text-slate-400">{card.description}</p>

            <span
              className={`shrink-0 text-xs font-semibold ${card.trendColor}`}
            >
              {card.trend}
            </span>
          </div>

          {/* Decorative */}
          <div className="absolute w-20 h-20 transition-opacity duration-300 rounded-full opacity-0 pointer-events-none -bottom-8 -left-8 bg-blue-50 group-hover:opacity-100" />
        </div>
      ))}
    </div>
  );
};

export default Cards;
