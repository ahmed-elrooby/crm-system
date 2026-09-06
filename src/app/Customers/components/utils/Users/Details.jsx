"use client";

import React from "react";
import {
  FiX,
  FiUser,
  FiMail,
  FiPhone,
  FiShield,
  FiHash,
  FiAtSign,
} from "react-icons/fi";

const UserDetails = ({ selectedUser, openDetailsUser, setOpenDetailsUser }) => {
  if (!openDetailsUser || !selectedUser) return null;

  const isAdmin = selectedUser.roles?.includes("Admin");

  const getInitial = () => {
    return (
      selectedUser.fullName?.charAt(0)?.toUpperCase() ||
      selectedUser.userName?.charAt(0)?.toUpperCase() ||
      "U"
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="flex flex-col w-full max-w-2xl max-h-[90vh] overflow-hidden bg-white shadow-2xl rounded-2xl">
        {/* Header */}
        <div className="flex items-center justify-between flex-shrink-0 px-6 py-5 bg-white border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center text-blue-600 w-11 h-11 bg-blue-50 rounded-xl">
              <FiUser size={22} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-900">
                تفاصيل المستخدم
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                عرض بيانات المستخدم بالتفصيل
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setOpenDetailsUser(false)}
            className="flex items-center justify-center text-gray-500 transition rounded-lg w-9 h-9 hover:bg-gray-100 hover:text-gray-700"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 min-h-0 p-6 overflow-y-auto">
          {/* User Profile */}
          <div className="flex flex-col items-center p-6 mb-6 border border-gray-100 bg-gray-50 rounded-2xl">
            <div className="flex items-center justify-center w-20 h-20 mb-4 text-2xl font-bold text-blue-600 bg-blue-100 rounded-full">
              {getInitial()}
            </div>

            <h3 className="text-xl font-bold text-gray-900">
              {selectedUser.fullName || "غير متوفر"}
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              @{selectedUser.userName || "غير متوفر"}
            </p>

            <div
              className={`flex items-center gap-2 px-3 py-1.5 mt-4 text-sm font-medium rounded-full ${
                isAdmin
                  ? "bg-purple-50 text-purple-700"
                  : "bg-blue-50 text-blue-700"
              }`}
            >
              {isAdmin ? <FiShield size={15} /> : <FiUser size={15} />}

              {isAdmin ? "مدير النظام" : "مستخدم"}
            </div>
          </div>

          {/* User Information */}
          <div className="mb-6">
            <h3 className="mb-4 text-base font-bold text-gray-900">
              المعلومات الأساسية
            </h3>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* Full Name */}
              <div className="p-4 border border-gray-100 rounded-xl">
                <div className="flex items-center gap-2 mb-2 text-gray-500">
                  <FiUser size={17} />
                  <span className="text-sm">الاسم الكامل</span>
                </div>

                <p className="font-semibold text-gray-900">
                  {selectedUser.fullName || "غير متوفر"}
                </p>
              </div>

              {/* Username */}
              <div className="p-4 border border-gray-100 rounded-xl">
                <div className="flex items-center gap-2 mb-2 text-gray-500">
                  <FiAtSign size={17} />
                  <span className="text-sm">اسم المستخدم</span>
                </div>

                <p className="font-semibold text-gray-900">
                  {selectedUser.userName || "غير متوفر"}
                </p>
              </div>

              {/* Email */}
              <div className="p-4 border border-gray-100 rounded-xl">
                <div className="flex items-center gap-2 mb-2 text-gray-500">
                  <FiMail size={17} />
                  <span className="text-sm">البريد الإلكتروني</span>
                </div>

                <p className="font-semibold text-gray-900 break-all">
                  {selectedUser.email || "غير متوفر"}
                </p>
              </div>

              {/* Phone */}
              <div className="p-4 border border-gray-100 rounded-xl">
                <div className="flex items-center gap-2 mb-2 text-gray-500">
                  <FiPhone size={17} />
                  <span className="text-sm">رقم الهاتف</span>
                </div>

                <p className="font-semibold text-gray-900">
                  {selectedUser.phoneNumber || "غير متوفر"}
                </p>
              </div>
            </div>
          </div>

          {/* Role */}
          <div className="mb-6">
            <h3 className="mb-4 text-base font-bold text-gray-900">
              الصلاحيات والدور
            </h3>

            <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl">
              <div className="flex items-center gap-3">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-lg ${
                    isAdmin
                      ? "bg-purple-50 text-purple-600"
                      : "bg-blue-50 text-blue-600"
                  }`}
                >
                  {isAdmin ? <FiShield size={20} /> : <FiUser size={20} />}
                </div>

                <div>
                  <p className="text-sm text-gray-500">الدور</p>

                  <p className="mt-1 font-semibold text-gray-900">
                    {isAdmin ? "مدير النظام" : "مستخدم"}
                  </p>
                </div>
              </div>

              <span
                className={`px-3 py-1.5 text-xs font-semibold rounded-full ${
                  isAdmin
                    ? "text-purple-700 bg-purple-50"
                    : "text-blue-700 bg-blue-50"
                }`}
              >
                {selectedUser.roles?.join(" / ") || "غير محدد"}
              </span>
            </div>
          </div>

          {/* User ID */}
          <div>
            <h3 className="mb-4 text-base font-bold text-gray-900">
              معلومات النظام
            </h3>

            <div className="p-4 border border-gray-100 rounded-xl">
              <div className="flex items-center gap-2 mb-2 text-gray-500">
                <FiHash size={17} />
                <span className="text-sm">معرف المستخدم</span>
              </div>

              <p className="font-mono text-sm text-gray-700 break-all">
                {selectedUser.id || "غير متوفر"}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end flex-shrink-0 px-6 py-4 border-t border-gray-100 bg-gray-50/80">
          <button
            type="button"
            onClick={() => setOpenDetailsUser(false)}
            className="px-5 py-2.5 text-sm font-semibold text-gray-700 transition bg-white border border-gray-200 rounded-xl hover:bg-gray-100"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
