"use client";

import React from "react";
import { FaBars, FaBell } from "react-icons/fa";
import Cookies from "js-cookie";

const Header = () => {
  const user = JSON.parse(Cookies.get("user"));
  const getRoleName = (role) => {
    switch (role?.toLowerCase()) {
      case "admin":
        return "مدير النظام";

      case "user":
        return "مستخدم";

      default:
        return "غير محدد";
    }
  };
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 border-b border-gray-200 bg-white/95 backdrop-blur sm:px-6 ">
      {/* Right Side */}
      <div className="flex items-center min-w-0 gap-3">
        {/* Mobile Menu */}
        <button
          onClick={() => window.dispatchEvent(new Event("open-sidebar"))}
          className="flex items-center justify-center w-10 h-10 text-gray-600 transition rounded-lg hover:bg-gray-100 hover:text-blue-600 md:hidden"
        >
          <FaBars />
        </button>

        {/* Page Title */}
        <div className="min-w-0">
          <h1 className="text-base font-bold text-gray-800 truncate sm:text-lg">
            العملاء
          </h1>

          <p className="hidden text-xs text-gray-400 sm:block">
            إدارة ومتابعة العملاء
          </p>
        </div>
      </div>

      {/* Left Side */}
      <div className="flex items-center gap-1 sm:gap-2">
        {/* Search */}

        {/* Notifications */}
        <button
          title="الإشعارات"
          className="relative flex items-center justify-center w-10 h-10 text-gray-500 transition rounded-lg hover:bg-gray-100 hover:text-blue-600"
        >
          <FaBell />

          <span className="absolute w-2 h-2 bg-red-500 rounded-full right-2 top-2 ring-2 ring-white" />
        </button>

        {/* Divider */}
        <div className="hidden w-px h-8 mx-1 bg-gray-200 sm:block" />

        {/* User */}
        <div className="relative">
          <button
            className="
              flex items-center gap-2
              rounded-xl
              p-1.5
              transition
              hover:bg-gray-100
            "
          >
            {/* Avatar */}
            <div className="flex items-center justify-center font-bold text-blue-600 bg-blue-100 rounded-full h-9 w-9">
              {user?.fullName?.charAt(0)}
            </div>

            {/* User Info */}
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold text-gray-800">
                {user?.fullName || user?.userName}
              </p>

              <p className="text-[11px] text-gray-400">
                {getRoleName(user?.roles?.[0])}
              </p>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
