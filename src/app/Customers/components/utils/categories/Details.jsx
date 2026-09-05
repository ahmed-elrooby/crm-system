"use client";

import React, { useContext } from "react";
import {
  FiX,
  FiLayers,
  FiUsers,
  FiCalendar,
  FiHash,
  FiCheckCircle,
  FiXCircle,
} from "react-icons/fi";

import { userContext } from "../../../../../Providers/CustomerProvider/Customer.js";

const Details = ({
  selectedCategory,
  setOpenDetailsModal,
  openDetailsModal,
}) => {
  const formattedDate = selectedCategory.createdAt
    ? new Date(selectedCategory.createdAt).toLocaleDateString("ar-EG", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "غير محدد";

  return (
    <>
      <div
        dir="rtl"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
        onClick={() => setOpenDetailsModal(false)}
      >
        <div
          className="flex flex-col w-full max-w-lg max-h-[90vh] overflow-hidden bg-white shadow-2xl rounded-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header - Fixed */}
          <div className="flex items-center justify-between flex-shrink-0 px-6 py-5 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div
                className="flex items-center justify-center w-11 h-11 rounded-xl"
                style={{
                  backgroundColor: `${selectedCategory.color || "#2563EB"}20`,
                }}
              >
                <FiLayers
                  size={22}
                  style={{
                    color: selectedCategory.color || "#2563EB",
                  }}
                />
              </div>

              <div>
                <h2 className="text-lg font-bold text-slate-800">
                  تفاصيل التصنيف
                </h2>

                <p className="mt-1 text-xs text-slate-400">
                  عرض بيانات التصنيف بالكامل
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setOpenDetailsModal(false)}
              className="flex items-center justify-center transition rounded-lg w-9 h-9 bg-slate-100 text-slate-500 hover:bg-slate-200"
            >
              <FiX size={18} />
            </button>
          </div>

          {/* Content - Scroll */}
          <div className="flex-1 p-6 space-y-5 overflow-y-auto">
            {/* Category Name */}
            <div className="p-4 border rounded-xl border-slate-100 bg-slate-50">
              <p className="mb-2 text-xs font-medium text-slate-400">
                اسم التصنيف
              </p>

              <div className="flex items-center gap-3">
                <span
                  className="w-4 h-4 rounded-full"
                  style={{
                    backgroundColor: selectedCategory.color || "#2563EB",
                  }}
                />

                <h3 className="text-base font-bold text-slate-800">
                  {selectedCategory.name || "بدون اسم"}
                </h3>
              </div>
            </div>

            {/* Description */}
            <div>
              <p className="mb-2 text-xs font-medium text-slate-400">الوصف</p>

              <div className="p-4 border rounded-xl border-slate-100">
                <p className="text-sm leading-6 text-slate-600">
                  {selectedCategory.description || "لا يوجد وصف لهذا التصنيف"}
                </p>
              </div>
            </div>

            {/* Information Grid */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Customers Count */}
              <div className="flex items-center gap-3 p-4 border rounded-xl border-slate-100">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-50">
                  <FiUsers size={18} className="text-blue-600" />
                </div>

                <div>
                  <p className="text-xs text-slate-400">عدد العملاء</p>

                  <p className="mt-1 text-sm font-bold text-slate-700">
                    {selectedCategory.customersCount || 0} عميل
                  </p>
                </div>
              </div>

              {/* Status */}
              <div className="flex items-center gap-3 p-4 border rounded-xl border-slate-100">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-lg ${
                    selectedCategory.isActive ? "bg-green-50" : "bg-red-50"
                  }`}
                >
                  {selectedCategory.isActive ? (
                    <FiCheckCircle size={18} className="text-green-600" />
                  ) : (
                    <FiXCircle size={18} className="text-red-600" />
                  )}
                </div>

                <div>
                  <p className="text-xs text-slate-400">الحالة</p>

                  <p
                    className={`mt-1 text-sm font-bold ${
                      selectedCategory.isActive
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {selectedCategory.isActive ? "نشط" : "غير نشط"}
                  </p>
                </div>
              </div>

              {/* ID */}
              <div className="flex items-center gap-3 p-4 border rounded-xl border-slate-100">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-purple-50">
                  <FiHash size={18} className="text-purple-600" />
                </div>

                <div>
                  <p className="text-xs text-slate-400">رقم التصنيف</p>

                  <p className="mt-1 text-sm font-bold text-slate-700">
                    #{selectedCategory.id}
                  </p>
                </div>
              </div>

              {/* Created At */}
              <div className="flex items-center gap-3 p-4 border rounded-xl border-slate-100">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-orange-50">
                  <FiCalendar size={18} className="text-orange-600" />
                </div>

                <div>
                  <p className="text-xs text-slate-400">تاريخ الإنشاء</p>

                  <p className="mt-1 text-sm font-bold text-slate-700">
                    {formattedDate}
                  </p>
                </div>
              </div>
            </div>

            {/* Color */}
            <div>
              <p className="mb-2 text-xs font-medium text-slate-400">
                لون التصنيف
              </p>

              <div className="flex items-center gap-3 p-4 border rounded-xl border-slate-100">
                <span
                  className="w-10 h-10 border rounded-lg shadow-sm"
                  style={{
                    backgroundColor: selectedCategory.color || "#2563EB",
                  }}
                />

                <span className="text-sm font-semibold text-slate-600">
                  {selectedCategory.color || "غير محدد"}
                </span>
              </div>
            </div>
          </div>

          {/* Footer - Fixed */}
          <div className="flex items-center justify-end flex-shrink-0 px-6 py-4 border-t border-slate-100 bg-slate-50">
            <button
              type="button"
              onClick={() => setOpenDetailsModal(false)}
              className="px-5 py-2.5 text-sm font-medium text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              إغلاق
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
