"use client";

import React, { useContext, useMemo } from "react";
import { FiUsers, FiUserCheck, FiUserX, FiShield } from "react-icons/fi";

import { userContext } from "../../../../../Providers/CustomerProvider/Customer.js";

const Cards = () => {
  const { users = [] } = useContext(userContext);

  const statistics = useMemo(() => {
    const totalUsers = users.length;

    // عدد الـ Admins
    const admins = users.filter((user) => user.roles?.includes("Admin")).length;

    // لو الـ API عنده status
    const activeUsers = users.filter(
      (user) => user.status === "Active" || user.isActive === true,
    ).length;

    const inactiveUsers = users.filter(
      (user) => user.status === "Inactive" || user.isActive === false,
    ).length;

    return {
      totalUsers,
      activeUsers,
      inactiveUsers,
      admins,
    };
  }, [users]);

  const cards = [
    {
      title: "إجمالي المستخدمين",
      value: statistics.totalUsers,
      description: "مستخدم في النظام",
      icon: <FiUsers size={22} />,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
      accent: "bg-blue-600",
    },
    {
      title: "المستخدمين النشطين",
      value: statistics.activeUsers,
      description: "حساب نشط",
      icon: <FiUserCheck size={22} />,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
      accent: "bg-emerald-500",
    },
    {
      title: "المستخدمين غير النشطين",
      value: statistics.inactiveUsers,
      description: "حساب غير نشط",
      icon: <FiUserX size={22} />,
      iconBg: "bg-red-50",
      iconColor: "text-red-600",
      accent: "bg-red-500",
    },
    {
      title: "المديرين",
      value: statistics.admins,
      description: "لديهم صلاحيات الإدارة",
      icon: <FiShield size={22} />,
      iconBg: "bg-purple-50",
      iconColor: "text-purple-600",
      accent: "bg-purple-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card, index) => (
        <div
          key={index}
          className="relative p-5 overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-sm group rounded-2xl hover:-translate-y-1 hover:shadow-lg"
        >
          <div className={`absolute right-0 top-0 h-full w-1 ${card.accent}`} />

          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">{card.title}</p>

              <div className="mt-2">
                <h2 className="text-3xl font-bold tracking-tight text-gray-800">
                  {card.value}
                </h2>
              </div>
            </div>

            <div
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${card.iconBg} ${card.iconColor} transition-transform duration-300 group-hover:scale-105`}
            >
              {card.icon}
            </div>
          </div>

          <div className="pt-3 mt-4 border-t border-gray-100">
            <p className="text-xs text-gray-400">{card.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cards;
