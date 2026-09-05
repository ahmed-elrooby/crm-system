"use client";

import React, { useContext, useMemo, useState } from "react";
import { userContext } from "../../../../../Providers/CustomerProvider/Customer.js";
import {
  FiSearch,
  FiFilter,
  FiEdit2,
  FiTrash2,
  FiChevronRight,
  FiChevronLeft,
  FiLayers,
  FiUsers,
  FiRefreshCw,
  FiEye,
} from "react-icons/fi";
import UpdateCategory from "./UpdateCategory.jsx";
import Details from "./Details.jsx";

const Table = () => {
  const {
    customersCategories,
    isLoadingCustomersCategories,
    handleDeleteCategorySubmit,
    openEditCategory,
    setOpenEditCategory,
    handleEditCategorySubmit,
  } = useContext(userContext);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [openDetailsModal, setOpenDetailsModal] = useState(false);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  // Filter
  const filteredCategories = useMemo(() => {
    return (
      customersCategories?.filter((category) => {
        const matchesSearch =
          category.name?.toLowerCase().includes(search.toLowerCase()) ||
          category.description?.toLowerCase().includes(search.toLowerCase());

        const matchesStatus =
          statusFilter === "all" ||
          (statusFilter === "active" && category.isActive) ||
          (statusFilter === "inactive" && !category.isActive);

        return matchesSearch && matchesStatus;
      }) || []
    );
  }, [customersCategories, search, statusFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;

  const currentCategories = filteredCategories.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  // Reset page when filtering
  const handleSearchChange = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleStatusChange = (value) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  // Loading
  if (isLoadingCustomersCategories) {
    return (
      <div className="overflow-hidden bg-white border shadow-sm rounded-2xl border-slate-100">
        <div className="flex items-center justify-center h-64">
          <div className="flex flex-col items-center gap-3">
            <FiRefreshCw size={28} className="text-blue-600 animate-spin" />

            <p className="text-sm text-slate-500">جاري تحميل التصنيفات...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {openEditCategory && (
        <UpdateCategory selectedCategory={selectedCategory} />
      )}
      {openDetailsModal && (
        <Details
          selectedCategory={selectedCategory}
          openDetailsModal={openDetailsModal}
          setOpenDetailsModal={setOpenDetailsModal}
        />
      )}
      <div className="overflow-hidden bg-white border shadow-sm rounded-2xl border-slate-100">
        {/* Header / Filters */}
        <div className="p-5 border-b border-slate-100">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Title */}
            <div>
              <div className="flex items-center gap-2">
                <FiLayers className="text-blue-600" size={20} />

                <h2 className="text-lg font-bold text-slate-800">
                  تصنيفات العملاء
                </h2>
              </div>

              <p className="mt-1 text-sm text-slate-500">
                إدارة وتصنيف العملاء داخل النظام
              </p>
            </div>

            {/* Filters */}
            <div className="flex flex-col gap-3 sm:flex-row">
              {/* Search */}
              <div className="relative">
                <FiSearch
                  size={18}
                  className="absolute -translate-y-1/2 right-3 top-1/2 text-slate-400"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  placeholder="ابحث عن تصنيف..."
                  className="w-full py-2.5 pr-10 pl-4 text-sm border rounded-lg outline-none sm:w-64 border-slate-200 text-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Status Filter */}
              <div className="relative">
                <FiFilter
                  size={16}
                  className="absolute -translate-y-1/2 pointer-events-none right-3 top-1/2 text-slate-400"
                />

                <select
                  value={statusFilter}
                  onChange={(e) => handleStatusChange(e.target.value)}
                  className="w-full py-2.5 pr-9 pl-8 text-sm bg-white border rounded-lg outline-none appearance-none sm:w-40 border-slate-200 text-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="all">كل الحالات</option>
                  <option value="active">نشط</option>
                  <option value="inactive">غير نشط</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="text-right bg-slate-50">
                <th className="px-5 py-4 text-xs font-semibold text-slate-500">
                  #
                </th>

                <th className="px-5 py-4 text-xs font-semibold text-slate-500">
                  التصنيف
                </th>

                <th className="px-5 py-4 text-xs font-semibold text-slate-500">
                  الوصف
                </th>

                <th className="px-5 py-4 text-xs font-semibold text-slate-500">
                  اللون
                </th>

                <th className="px-5 py-4 text-xs font-semibold text-slate-500">
                  عدد العملاء
                </th>

                <th className="px-5 py-4 text-xs font-semibold text-slate-500">
                  الحالة
                </th>

                <th className="px-5 py-4 text-xs font-semibold text-slate-500">
                  الإجراءات
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {currentCategories.length > 0 ? (
                currentCategories.map((category, index) => (
                  <tr
                    key={category.id}
                    className="transition hover:bg-slate-50"
                  >
                    {/* Number */}
                    <td className="px-5 py-4 text-sm text-slate-500">
                      {startIndex + index + 1}
                    </td>

                    {/* Category */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="flex items-center justify-center w-10 h-10 rounded-xl"
                          style={{
                            backgroundColor: `${category.color}20`,
                          }}
                        >
                          <span
                            className="w-3 h-3 rounded-full"
                            style={{
                              backgroundColor: category.color,
                            }}
                          />
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-slate-800">
                            {category.name}
                          </p>

                          <p className="text-xs text-slate-400">
                            #{category.id}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Description */}
                    <td className="max-w-xs px-5 py-4">
                      <p className="text-sm truncate text-slate-500">
                        {category.description || "لا يوجد وصف"}
                      </p>
                    </td>

                    {/* Color */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <span
                          className="border rounded-full shadow-sm w-7 h-7"
                          style={{
                            backgroundColor: category.color,
                          }}
                        />

                        <span className="text-xs font-medium text-slate-500">
                          {category.color}
                        </span>
                      </div>
                    </td>

                    {/* Customers Count */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-50">
                          <FiUsers size={16} className="text-blue-600" />
                        </div>

                        <span className="text-sm font-semibold text-slate-700">
                          {category.customersCount || 0}
                        </span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${
                          category.isActive
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full ${
                            category.isActive ? "bg-green-500" : "bg-red-500"
                          }`}
                        />

                        {category.isActive ? "نشط" : "غير نشط"}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          className="flex items-center justify-center text-blue-600 transition rounded-lg w-9 h-9 bg-blue-50 hover:bg-blue-100"
                          title="تعديل"
                          onClick={() => {
                            setSelectedCategory(category);
                            setOpenEditCategory(true);
                          }}
                        >
                          <FiEdit2 size={16} />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleDeleteCategorySubmit(category.id)
                          }
                          className="flex items-center justify-center text-red-600 transition rounded-lg w-9 h-9 bg-red-50 hover:bg-red-100"
                          title="حذف"
                        >
                          <FiTrash2 size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedCategory(category);
                            setOpenDetailsModal(true);
                          }}
                          className="flex items-center justify-center text-purple-600 transition rounded-lg w-9 h-9 bg-purple-50 hover:bg-purple-100"
                          title="التفاصيل"
                        >
                          <FiEye size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-5 py-16 text-center">
                    <div className="flex flex-col items-center">
                      <div className="flex items-center justify-center rounded-full w-14 h-14 bg-slate-100">
                        <FiLayers size={24} className="text-slate-400" />
                      </div>

                      <h3 className="mt-4 text-sm font-semibold text-slate-700">
                        لا توجد تصنيفات
                      </h3>

                      <p className="mt-1 text-xs text-slate-400">
                        لم يتم العثور على تصنيفات مطابقة للبحث
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer / Pagination */}
        {filteredCategories.length > 0 && (
          <div className="flex flex-col gap-4 px-5 py-4 border-t border-slate-100 sm:flex-row sm:items-center sm:justify-between">
            {/* Results */}
            <p className="text-sm text-slate-500">
              عرض{" "}
              <span className="font-semibold text-slate-700">
                {startIndex + 1}
              </span>{" "}
              إلى{" "}
              <span className="font-semibold text-slate-700">
                {Math.min(startIndex + itemsPerPage, filteredCategories.length)}
              </span>{" "}
              من{" "}
              <span className="font-semibold text-slate-700">
                {filteredCategories.length}
              </span>{" "}
              تصنيف
            </p>

            {/* Pagination */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className="flex items-center justify-center transition border rounded-lg w-9 h-9 text-slate-600 border-slate-200 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <FiChevronRight size={18} />
              </button>

              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => setCurrentPage(page)}
                    className={`flex h-9 min-w-9 items-center justify-center rounded-lg border px-3 text-sm transition ${
                      currentPage === page
                        ? "border-blue-600 bg-blue-600 text-white"
                        : "border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {page}
                  </button>
                ),
              )}

              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className="flex items-center justify-center transition border rounded-lg w-9 h-9 text-slate-600 border-slate-200 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <FiChevronLeft size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Table;
