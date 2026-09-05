"use client";

import React from "react";
import {
  FiX,
  FiFolder,
  FiCheckCircle,
  FiXCircle,
  FiGlobe,
  FiFileText,
  FiCalendar,
  FiHash,
} from "react-icons/fi";

const Details = ({ selectedFileCategoy, openDetails, setOpenDetails }) => {
  if (!openDetails || !selectedFileCategoy) return null;

  const isActive = selectedFileCategoy?.isActive;

  const formatDate = (date) => {
    if (!date) return "غير متوفر";

    return new Date(date).toLocaleDateString("ar-EG", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div
      dir="rtl"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm"
    >
      <div className="relative flex flex-col w-full max-w-2xl max-h-[90vh] overflow-hidden bg-white shadow-2xl rounded-3xl">
        {/* ================= HEADER ================= */}
        <div className="flex items-center justify-between flex-shrink-0 px-6 py-5 bg-white border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-blue-50">
              <FiFolder className="w-5 h-5 text-blue-600" />
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-800">
                تفاصيل تصنيف الملف
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                عرض جميع بيانات تصنيف الملف
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setOpenDetails(false)}
            className="flex items-center justify-center transition-all w-9 h-9 rounded-xl text-slate-400 hover:bg-red-50 hover:text-red-500"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* ================= BODY ================= */}
        <div className="flex-1 min-h-0 p-6 overflow-y-auto">
          {/* Category Header */}
          <div className="flex flex-col items-center p-6 mb-5 border rounded-2xl bg-slate-50 border-slate-200">
            <div className="flex items-center justify-center w-16 h-16 mb-3 bg-blue-100 rounded-2xl">
              <FiFolder className="w-8 h-8 text-blue-600" />
            </div>

            <h3 className="text-xl font-bold text-slate-800">
              {selectedFileCategoy?.name || "بدون اسم"}
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              {selectedFileCategoy?.nameEn || "No English Name"}
            </p>

            {/* Status */}
            <div
              className={`mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold ${
                isActive
                  ? "bg-emerald-50 text-emerald-600"
                  : "bg-red-50 text-red-600"
              }`}
            >
              {isActive ? (
                <FiCheckCircle className="w-4 h-4" />
              ) : (
                <FiXCircle className="w-4 h-4" />
              )}

              {isActive ? "نشط" : "غير نشط"}
            </div>
          </div>

          {/* ================= INFO ================= */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Arabic Name */}
            <div className="p-4 bg-white border rounded-2xl border-slate-200">
              <div className="flex items-center gap-2 mb-2">
                <FiFolder className="w-4 h-4 text-blue-500" />

                <span className="text-xs font-medium text-slate-500">
                  اسم التصنيف
                </span>
              </div>

              <p className="font-semibold text-slate-800">
                {selectedFileCategoy?.name || "غير متوفر"}
              </p>
            </div>

            {/* English Name */}
            <div className="p-4 bg-white border rounded-2xl border-slate-200">
              <div className="flex items-center gap-2 mb-2">
                <FiGlobe className="w-4 h-4 text-indigo-500" />

                <span className="text-xs font-medium text-slate-500">
                  الاسم بالإنجليزية
                </span>
              </div>

              <p dir="ltr" className="font-semibold text-left text-slate-800">
                {selectedFileCategoy?.nameEn || "Not Available"}
              </p>
            </div>

            {/* ID */}
            <div className="p-4 bg-white border rounded-2xl border-slate-200">
              <div className="flex items-center gap-2 mb-2">
                <FiHash className="w-4 h-4 text-purple-500" />

                <span className="text-xs font-medium text-slate-500">
                  رقم التصنيف
                </span>
              </div>

              <p className="font-semibold text-slate-800">
                #{selectedFileCategoy?.id ?? "غير متوفر"}
              </p>
            </div>

            {/* Created At */}
            <div className="p-4 bg-white border rounded-2xl border-slate-200">
              <div className="flex items-center gap-2 mb-2">
                <FiCalendar className="w-4 h-4 text-orange-500" />

                <span className="text-xs font-medium text-slate-500">
                  تاريخ الإنشاء
                </span>
              </div>

              <p className="font-semibold text-slate-800">
                {formatDate(selectedFileCategoy?.createdAt)}
              </p>
            </div>
          </div>

          {/* ================= DESCRIPTION ================= */}
          <div className="p-5 mt-4 bg-white border rounded-2xl border-slate-200">
            <div className="flex items-center gap-2 mb-3">
              <FiFileText className="w-4 h-4 text-blue-500" />

              <h4 className="text-sm font-bold text-slate-700">وصف التصنيف</h4>
            </div>

            <div className="p-4 text-sm leading-7 rounded-xl bg-slate-50 text-slate-600">
              {selectedFileCategoy?.description || "لا يوجد وصف لهذا التصنيف"}
            </div>
          </div>
        </div>

        {/* ================= FOOTER ================= */}
        <div className="flex items-center justify-end flex-shrink-0 gap-3 px-6 py-4 border-t border-slate-200 bg-slate-50/70">
          <button
            type="button"
            onClick={() => setOpenDetails(false)}
            className="px-5 py-2.5 text-sm font-semibold transition-all bg-white border rounded-xl border-slate-200 text-slate-600 hover:bg-slate-100"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};

export default Details;
