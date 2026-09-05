"use client";

import React, { useContext } from "react";
import { userContext } from "../../../../../Providers/CustomerProvider/Customer.js";
import { FiLayers, FiCheckCircle, FiXCircle, FiUsers } from "react-icons/fi";

const Cards = () => {
  const { customersCategories } = useContext(userContext);

  const totalCategories = customersCategories?.length || 0;

  const activeCategories =
    customersCategories?.filter((category) => category.isActive).length || 0;

  const inactiveCategories =
    customersCategories?.filter((category) => !category.isActive).length || 0;

  const totalCustomers =
    customersCategories?.reduce(
      (total, category) => total + (category.customersCount || 0),
      0,
    ) || 0;

  const cards = [
    {
      title: "إجمالي التصنيفات",
      value: totalCategories,
      icon: FiLayers,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "التصنيفات النشطة",
      value: activeCategories,
      icon: FiCheckCircle,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "التصنيفات غير النشطة",
      value: inactiveCategories,
      icon: FiXCircle,
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
    },
    {
      title: "إجمالي العملاء المصنفين",
      value: totalCustomers,
      icon: FiUsers,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
  ];

  return (
    <div
      dir="rtl"
      className="grid grid-cols-1 gap-4 my-8 sm:grid-cols-2 lg:grid-cols-4"
    >
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="p-5 transition duration-300 bg-white border shadow-sm rounded-2xl border-slate-100 hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  {card.title}
                </p>

                <h3 className="mt-2 text-3xl font-bold text-slate-800">
                  {card.value}
                </h3>
              </div>

              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${card.iconBg}`}
              >
                <Icon size={24} className={card.iconColor} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Cards;
