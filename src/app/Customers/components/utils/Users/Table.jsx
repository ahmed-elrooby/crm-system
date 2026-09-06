"use client";

import React, { useContext, useMemo, useState } from "react";
import {
  FiSearch,
  FiRefreshCw,
  FiMoreVertical,
  FiEye,
  FiEdit2,
  FiTrash2,
  FiShield,
  FiUser,
  FiChevronLeft,
  FiChevronRight,
  FiChevronDown,
  FiUsers,
  FiMail,
  FiPhone,
} from "react-icons/fi";

import { userContext } from "../../../../../Providers/CustomerProvider/Customer.js";
import EditUser from "./EditUser.jsx";
import UserDetails from "./Details.jsx";

const Table = () => {
  const {
    users = [],
    isLoadingUsers,
    handleDeleteUserFun,
    openUpdateUser,
    setOpenUpdateUser,
  } = useContext(userContext);

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [openMenu, setOpenMenu] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openDetailsUser, setOpenDetailsUser] = useState(false);
  const usersPerPage = 6;

  // =========================
  // Filtering
  // =========================

  const filteredUsers = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return users.filter((user) => {
      const fullName = user.fullName?.toLowerCase() || "";
      const userName = user.userName?.toLowerCase() || "";
      const email = user.email?.toLowerCase() || "";

      const matchesSearch =
        fullName.includes(searchValue) ||
        userName.includes(searchValue) ||
        email.includes(searchValue);

      const matchesRole =
        roleFilter === "all" || user.roles?.includes(roleFilter);

      return matchesSearch && matchesRole;
    });
  }, [users, search, roleFilter]);

  // =========================
  // Pagination
  // =========================

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const startIndex = (currentPage - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;

  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  // =========================
  // Reset
  // =========================

  const handleReset = () => {
    setSearch("");
    setRoleFilter("all");
    setCurrentPage(1);
  };

  // =========================
  // Search
  // =========================

  const handleSearchChange = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  // =========================
  // Role
  // =========================

  const handleRoleChange = (value) => {
    setRoleFilter(value);
    setCurrentPage(1);
  };

  // =========================
  // Loading
  // =========================

  if (isLoadingUsers) {
    return (
      <div
        dir="rtl"
        className="flex items-center justify-center p-10 bg-white border border-gray-100 shadow-sm rounded-2xl"
      >
        <div className="flex items-center gap-3 text-sm text-gray-500">
          <FiRefreshCw className="animate-spin" size={18} />
          جاري تحميل المستخدمين...
        </div>
      </div>
    );
  }

  return (
    <>
      {openUpdateUser && <EditUser selectedUser={selectedUser} />}
      {openDetailsUser && (
        <UserDetails
          selectedUser={selectedUser}
          openDetailsUser={openDetailsUser}
          setOpenDetailsUser={setOpenDetailsUser}
        />
      )}
      <div className="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-2xl">
        {/* ================= Header ================= */}

        <div className="p-5 border-b border-gray-100">
          <div className="flex flex-col gap-2 mb-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-bold text-gray-800">
                قائمة المستخدمين
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                إدارة ومتابعة جميع مستخدمي النظام
              </p>
            </div>

            <div className="text-sm text-gray-500">
              إجمالي النتائج:
              <span className="mr-1 font-bold text-gray-800">
                {filteredUsers.length}
              </span>
            </div>
          </div>

          {/* ================= Filters ================= */}

          <div className="grid grid-cols-1 gap-3 lg:grid-cols-12">
            {/* Search */}

            <div className="relative lg:col-span-8">
              <FiSearch
                size={19}
                className="absolute text-gray-400 -translate-y-1/2 right-4 top-1/2"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="ابحث باسم المستخدم أو اسم الحساب أو البريد الإلكتروني..."
                className="w-full pl-4 text-sm text-gray-700 transition border border-gray-200 outline-none h-11 rounded-xl bg-gray-50 pr-11 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Role */}

            <div className="relative lg:col-span-2">
              <FiShield
                size={17}
                className="absolute text-gray-400 -translate-y-1/2 right-3 top-1/2"
              />

              <select
                value={roleFilter}
                onChange={(e) => handleRoleChange(e.target.value)}
                className="w-full text-sm text-gray-600 transition border border-gray-200 outline-none appearance-none h-11 rounded-xl bg-gray-50 px-9 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
              >
                <option value="all">كل الأدوار</option>
                <option value="Admin">مدير</option>
                <option value="User">مستخدم</option>
              </select>

              <FiChevronDown
                size={16}
                className="absolute text-gray-400 -translate-y-1/2 pointer-events-none left-3 top-1/2"
              />
            </div>

            {/* Reset */}

            <button
              onClick={handleReset}
              className="flex items-center justify-center gap-2 px-4 text-sm font-medium text-gray-600 transition bg-white border border-gray-200 h-11 rounded-xl hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 lg:col-span-2"
            >
              <FiRefreshCw size={16} />
              إعادة تعيين
            </button>
          </div>
        </div>

        {/* ================= Table ================= */}

        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-right">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/70">
                <th className="px-5 py-4 text-xs font-semibold text-gray-500">
                  المستخدم
                </th>

                <th className="px-5 py-4 text-xs font-semibold text-gray-500">
                  البريد الإلكتروني
                </th>

                <th className="px-5 py-4 text-xs font-semibold text-gray-500">
                  رقم الهاتف
                </th>

                <th className="px-5 py-4 text-xs font-semibold text-gray-500">
                  الدور
                </th>

                <th className="px-5 py-4 text-xs font-semibold text-gray-500">
                  الإجراءات
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {currentUsers.length > 0 ? (
                currentUsers.map((user) => {
                  const isAdmin = user.roles?.includes("Admin");

                  const firstLetter =
                    user.fullName?.charAt(0) || user.userName?.charAt(0) || "?";

                  return (
                    <tr
                      key={user.id}
                      className="transition hover:bg-gray-50/70"
                    >
                      {/* User */}

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex items-center justify-center w-10 h-10 font-bold rounded-full shrink-0 ${
                              isAdmin
                                ? "bg-purple-50 text-purple-600"
                                : "bg-blue-50 text-blue-600"
                            }`}
                          >
                            {firstLetter}
                          </div>

                          <div>
                            <p className="text-sm font-semibold text-gray-800">
                              {user.fullName || "بدون اسم"}
                            </p>

                            <p className="mt-0.5 text-xs text-gray-400">
                              @{user.userName}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Email */}

                      <td className="px-5 py-4">
                        {user.email ? (
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <FiMail size={15} className="text-gray-400" />

                            {user.email}
                          </div>
                        ) : (
                          <span className="text-xs text-gray-400">
                            غير متوفر
                          </span>
                        )}
                      </td>

                      {/* Phone */}

                      <td className="px-5 py-4">
                        {user.phoneNumber ? (
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <FiPhone size={15} className="text-gray-400" />

                            {user.phoneNumber}
                          </div>
                        ) : (
                          <span className="text-xs text-gray-400">
                            غير متوفر
                          </span>
                        )}
                      </td>

                      {/* Role */}

                      <td className="px-5 py-4">
                        <div className="flex flex-wrap gap-1.5">
                          {user.roles?.map((role) => (
                            <span
                              key={role}
                              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                                role === "Admin"
                                  ? "bg-purple-50 text-purple-600"
                                  : "bg-blue-50 text-blue-600"
                              }`}
                            >
                              {role === "Admin" ? (
                                <FiShield size={13} />
                              ) : (
                                <FiUser size={13} />
                              )}

                              {role === "Admin" ? "مدير" : "مستخدم"}
                            </span>
                          ))}
                        </div>
                      </td>

                      {/* Actions */}

                      <td className="relative px-5 py-4">
                        <button
                          onClick={() =>
                            setOpenMenu(openMenu === user.id ? null : user.id)
                          }
                          className="flex items-center justify-center text-gray-500 transition rounded-lg h-9 w-9 hover:bg-gray-100 hover:text-gray-700"
                        >
                          <FiMoreVertical size={18} />
                        </button>

                        {openMenu === user.id && (
                          <div className="absolute left-5 top-14 z-20 w-44 overflow-hidden rounded-xl border border-gray-100 bg-white p-1.5 shadow-xl">
                            <button
                              onClick={() => {
                                setOpenMenu(null);
                                setSelectedUser(user);
                                setOpenDetailsUser(true);
                              }}
                              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-600 transition hover:bg-blue-50 hover:text-blue-600"
                            >
                              <FiEye size={16} />
                              عرض التفاصيل
                            </button>

                            <button
                              onClick={() => {
                                setOpenMenu(null);
                                setSelectedUser(user);
                                setOpenUpdateUser(true);
                              }}
                              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-600 transition hover:bg-blue-50 hover:text-blue-600"
                            >
                              <FiEdit2 size={16} />
                              تعديل
                            </button>

                            <button
                              onClick={() => {
                                setOpenMenu(null);
                                handleDeleteUserFun(user.id);
                              }}
                              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-red-500 transition hover:bg-red-50"
                            >
                              <FiTrash2 size={16} />
                              حذف
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="5" className="px-5 py-16 text-center">
                    <div className="flex items-center justify-center mx-auto text-gray-400 bg-gray-100 rounded-full h-14 w-14">
                      <FiUsers size={25} />
                    </div>

                    <h3 className="mt-4 text-sm font-semibold text-gray-700">
                      لا توجد نتائج
                    </h3>

                    <p className="mt-1 text-xs text-gray-400">
                      لم نجد أي مستخدم يطابق معايير البحث أو الفلترة
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ================= Pagination ================= */}

        {filteredUsers.length > 0 && (
          <div className="flex flex-col gap-4 px-5 py-4 border-t border-gray-100 sm:flex-row sm:items-center sm:justify-between">
            {/* Results */}

            <p className="text-xs text-gray-500">
              عرض{" "}
              <span className="font-semibold text-gray-700">
                {startIndex + 1}
              </span>{" "}
              إلى{" "}
              <span className="font-semibold text-gray-700">
                {Math.min(endIndex, filteredUsers.length)}
              </span>{" "}
              من{" "}
              <span className="font-semibold text-gray-700">
                {filteredUsers.length}
              </span>{" "}
              مستخدم
            </p>

            {/* Pagination */}

            <div className="flex items-center gap-1">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className="flex items-center justify-center text-gray-500 transition border border-gray-200 rounded-lg h-9 w-9 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <FiChevronRight size={17} />
              </button>

              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`flex h-9 min-w-9 items-center justify-center rounded-lg px-2 text-sm font-medium transition ${
                      currentPage === page
                        ? "bg-blue-600 text-white shadow-sm"
                        : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {page}
                  </button>
                ),
              )}

              <button
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                className="flex items-center justify-center text-gray-500 transition border border-gray-200 rounded-lg h-9 w-9 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <FiChevronLeft size={17} />
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Table;
