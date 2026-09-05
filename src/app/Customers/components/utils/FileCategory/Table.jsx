"use client";

import React, { useContext, useMemo, useState } from "react";
import {
  FiSearch,
  FiFilter,
  FiEye,
  FiEdit2,
  FiPower,
  FiTrash2,
  FiFileText,
  FiFolder,
  FiChevronLeft,
  FiChevronRight,
  FiX,
  FiRefreshCw,
} from "react-icons/fi";

import { userContext } from "../../../../../Providers/CustomerProvider/Customer.js";
import EditFileCategory from "./EditFileCategory.jsx";
import Details from "./Details.jsx";

const Table = () => {
  const {
    isLoadingFilesCategories,
    filesCategories,
    handleDeleteFileCategorySubmit,
    handleInActiveFileCategorySubmit,
    openEditFileCategory,
    setOpenEditFileCategory,
  } = useContext(userContext);
  const [selectedFileCategoy, setSelectedFileCategoy] = useState(null);
  const [openDetails, setOpenDetails] = useState(false);
  /* =========================
      Normalize API Response
  ========================= */

  const categories = useMemo(() => {
    if (Array.isArray(filesCategories)) {
      return filesCategories;
    }

    if (Array.isArray(filesCategories?.data)) {
      return filesCategories.data;
    }

    if (Array.isArray(filesCategories?.items)) {
      return filesCategories.items;
    }

    return [];
  }, [filesCategories]);

  /* =========================
      States
  ========================= */

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  /* =========================
      Filter
  ========================= */

  const filteredCategories = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return categories.filter((category) => {
      const matchesSearch =
        !searchValue ||
        category?.name?.toLowerCase().includes(searchValue) ||
        category?.nameEn?.toLowerCase().includes(searchValue) ||
        category?.description?.toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && category?.isActive === true) ||
        (statusFilter === "inactive" && category?.isActive === false);

      return matchesSearch && matchesStatus;
    });
  }, [categories, search, statusFilter]);

  /* =========================
      Pagination
  ========================= */

  const totalItems = filteredCategories.length;

  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  const safeCurrentPage = Math.min(currentPage, totalPages);

  const startIndex = (safeCurrentPage - 1) * itemsPerPage;

  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

  const currentCategories = filteredCategories.slice(startIndex, endIndex);

  /* =========================
      Handlers
  ========================= */

  const handleSearch = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleStatusFilter = (value) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  const handleItemsPerPage = (value) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("all");
    setCurrentPage(1);
  };

  const hasFilters = search.trim() !== "" || statusFilter !== "all";

  /* =========================
      Pagination Numbers
  ========================= */

  const getPaginationPages = () => {
    const pages = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }

      return pages;
    }

    if (safeCurrentPage <= 3) {
      return [1, 2, 3, 4, "...", totalPages];
    }

    if (safeCurrentPage >= totalPages - 2) {
      return [
        1,
        "...",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [
      1,
      "...",
      safeCurrentPage - 1,
      safeCurrentPage,
      safeCurrentPage + 1,
      "...",
      totalPages,
    ];
  };

  /* =========================
      Loading
  ========================= */

  if (isLoadingFilesCategories) {
    return (
      <div className="overflow-hidden bg-white border shadow-sm rounded-2xl border-slate-200">
        {/* Header Skeleton */}
        <div className="flex flex-col gap-4 p-5 border-b border-slate-200 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="w-40 h-5 rounded-lg bg-slate-200 animate-pulse" />
            <div className="w-56 h-3 mt-2 rounded-lg bg-slate-100 animate-pulse" />
          </div>

          <div className="w-full h-11 rounded-xl bg-slate-100 animate-pulse lg:w-72" />
        </div>

        {/* Rows Skeleton */}
        <div className="divide-y divide-slate-100">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex items-center gap-4 px-5 py-5">
              <div className="w-8 h-8 rounded-lg bg-slate-100 animate-pulse" />
              <div className="flex-1">
                <div className="w-32 h-4 rounded bg-slate-200 animate-pulse" />
                <div className="w-24 h-3 mt-2 rounded bg-slate-100 animate-pulse" />
              </div>

              <div className="hidden w-20 h-4 rounded bg-slate-100 animate-pulse sm:block" />
              <div className="w-16 h-6 rounded-full bg-slate-100 animate-pulse" />
              <div className="w-24 h-8 rounded-lg bg-slate-100 animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden bg-white border shadow-sm rounded-2xl border-slate-200">
      {/* =========================
          Header
      ========================= */}

      <div className="p-5 border-b border-slate-200">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Title */}
          <div>
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-50">
                <FiFolder className="w-5 h-5 text-blue-600" />
              </div>

              <div>
                <h2 className="text-lg font-bold text-slate-800">
                  تصنيفات الملفات
                </h2>

                <p className="mt-0.5 text-xs text-slate-500">
                  إدارة وتنظيم تصنيفات ملفات العملاء
                </p>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="relative w-full lg:w-80">
            <FiSearch className="absolute w-5 h-5 -translate-y-1/2 right-3 top-1/2 text-slate-400" />

            <input
              type="text"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="ابحث عن تصنيف..."
              className="w-full pl-10 pr-10 text-sm transition-all border outline-none h-11 bg-slate-50 border-slate-200 rounded-xl text-slate-700 placeholder:text-slate-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
            />

            {search && (
              <button
                type="button"
                onClick={() => handleSearch("")}
                className="absolute flex items-center justify-center w-6 h-6 -translate-y-1/2 rounded-full left-3 top-1/2 hover:bg-slate-200 text-slate-400"
              >
                <FiX className="w-4 h-4 ml-auto" />
              </button>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-3 mt-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
              <FiFilter className="w-4 h-4" />
              <span>الحالة:</span>
            </div>

            <button
              onClick={() => handleStatusFilter("all")}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all ${
                statusFilter === "all"
                  ? "bg-blue-600 text-white shadow-sm shadow-blue-600/20"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              الكل
            </button>

            <button
              onClick={() => handleStatusFilter("active")}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all ${
                statusFilter === "active"
                  ? "bg-emerald-500 text-white shadow-sm shadow-emerald-500/20"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              نشط
            </button>

            <button
              onClick={() => handleStatusFilter("inactive")}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all ${
                statusFilter === "inactive"
                  ? "bg-red-500 text-white shadow-sm shadow-red-500/20"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              غير نشط
            </button>

            {hasFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium transition-colors rounded-lg text-slate-500 hover:text-red-600 hover:bg-red-50"
              >
                <FiX className="w-3.5 h-3.5" />
                مسح الفلاتر
              </button>
            )}
          </div>

          {/* Results */}
          <div className="text-xs font-medium text-slate-400">
            {totalItems} تصنيف
          </div>
        </div>
      </div>

      {/* =========================
          Table
      ========================= */}
      {openEditFileCategory && (
        <EditFileCategory selectedFileCategoy={selectedFileCategoy} />
      )}
      {openDetails && (
        <Details
          selectedFileCategoy={selectedFileCategoy}
          openDetails={openDetails}
          setOpenDetails={setOpenDetails}
        />
      )}
      {currentCategories.length > 0 ? (
        <>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-sm">
              <thead>
                <tr className="border-b bg-slate-50/70 border-slate-200">
                  <th className="px-5 py-4 text-xs font-bold text-right text-slate-500">
                    #
                  </th>

                  <th className="px-5 py-4 text-xs font-bold text-right text-slate-500">
                    التصنيف
                  </th>

                  <th className="px-5 py-4 text-xs font-bold text-right text-slate-500">
                    الاسم بالإنجليزية
                  </th>

                  <th className="px-5 py-4 text-xs font-bold text-right text-slate-500">
                    الوصف
                  </th>

                  <th className="px-5 py-4 text-xs font-bold text-center text-slate-500">
                    الملفات
                  </th>

                  <th className="px-5 py-4 text-xs font-bold text-center text-slate-500">
                    الحالة
                  </th>

                  <th className="px-5 py-4 text-xs font-bold text-right text-slate-500">
                    تاريخ الإنشاء
                  </th>

                  <th className="px-5 py-4 text-xs font-bold text-center text-slate-500">
                    الإجراءات
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {currentCategories.map((category, index) => {
                  const rowNumber = startIndex + index + 1;

                  const isActive = category?.isActive === true;

                  return (
                    <tr
                      key={category?.id || index}
                      className="transition-colors group hover:bg-slate-50/70"
                    >
                      {/* Number */}
                      <td className="px-5 py-4 text-xs font-semibold text-slate-400">
                        {rowNumber}
                      </td>

                      {/* Category */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 text-blue-600 rounded-xl bg-blue-50">
                            <FiFileText className="w-5 h-5" />
                          </div>

                          <div>
                            <p className="font-semibold text-slate-800">
                              {category?.name || "بدون اسم"}
                            </p>

                            <p className="mt-0.5 text-[11px] text-slate-400">
                              #{category?.id || "—"}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* English */}
                      <td className="px-5 py-4">
                        <span className="text-xs font-medium text-slate-600">
                          {category?.nameEn || "—"}
                        </span>
                      </td>

                      {/* Description */}
                      <td className="max-w-[220px] px-5 py-4">
                        <p
                          title={category?.description || ""}
                          className="text-xs truncate text-slate-500"
                        >
                          {category?.description || "لا يوجد وصف"}
                        </p>
                      </td>

                      {/* Files */}
                      <td className="px-5 py-4 text-center">
                        <div className="inline-flex items-center justify-center min-w-[42px] px-2.5 py-1.5 text-xs font-bold rounded-lg bg-slate-100 text-slate-700">
                          {category?.filesCount ??
                            category?.attachmentsCount ??
                            0}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-5 py-4 text-center">
                        {isActive ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-full bg-emerald-50 text-emerald-700">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            نشط
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-full bg-red-50 text-red-700">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                            غير نشط
                          </span>
                        )}
                      </td>

                      {/* Date */}
                      <td className="px-5 py-4">
                        <span className="text-xs text-slate-500">
                          {category?.createdAt
                            ? new Date(category.createdAt).toLocaleDateString(
                                "ar-EG",
                                {
                                  day: "2-digit",
                                  month: "long",
                                  year: "numeric",
                                },
                              )
                            : "—"}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-center gap-1">
                          {/* View */}
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedFileCategoy(category);
                              setOpenDetails(true);
                            }}
                            title="عرض"
                            className="flex items-center justify-center transition-all rounded-lg w-9 h-9 text-slate-500 hover:bg-blue-50 hover:text-blue-600"
                          >
                            <FiEye className="w-4 h-4" />
                          </button>

                          {/* Edit */}
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedFileCategoy(category);
                              setOpenEditFileCategory(true);
                            }}
                            title="تعديل"
                            className="flex items-center justify-center transition-all rounded-lg w-9 h-9 text-slate-500 hover:bg-amber-50 hover:text-amber-600"
                          >
                            <FiEdit2 className="w-4 h-4" />
                          </button>

                          {/* Toggle */}
                          {category?.isActive === true && (
                            <button
                              type="button"
                              title="تعطيل"
                              onClick={() => {
                                handleInActiveFileCategorySubmit(category?.id);
                              }}
                              className={`flex items-center justify-center w-9 h-9 transition-all rounded-lg ${
                                isActive
                                  ? "text-emerald-600 hover:bg-emerald-50"
                                  : "text-slate-400 hover:bg-slate-100"
                              }`}
                            >
                              <FiPower className="w-4 h-4" />
                            </button>
                          )}

                          {/* Delete */}
                          <button
                            type="button"
                            title="حذف"
                            onClick={() => {
                              handleDeleteFileCategorySubmit(category?.id);
                            }}
                            className="flex items-center justify-center text-red-500 transition-all rounded-lg w-9 h-9 hover:bg-red-50"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* =========================
              Pagination
          ========================= */}

          <div className="flex flex-col gap-4 px-5 py-4 border-t bg-slate-50/40 border-slate-200 sm:flex-row sm:items-center sm:justify-between">
            {/* Info */}
            <div className="text-xs font-medium text-slate-500">
              عرض{" "}
              <span className="font-bold text-slate-700">{startIndex + 1}</span>{" "}
              - <span className="font-bold text-slate-700">{endIndex}</span> من{" "}
              <span className="font-bold text-slate-700">{totalItems}</span>{" "}
              تصنيف
            </div>

            <div className="flex items-center gap-3">
              {/* Items Per Page */}
              <div className="flex items-center gap-2">
                <span className="hidden text-xs text-slate-400 sm:block">
                  عرض
                </span>

                <select
                  value={itemsPerPage}
                  onChange={(e) => handleItemsPerPage(e.target.value)}
                  className="px-2 text-xs font-medium bg-white border rounded-lg outline-none cursor-pointer h-9 border-slate-200 text-slate-600 focus:border-blue-500"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
              </div>

              {/* Pagination */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  disabled={safeCurrentPage === 1}
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(1, prev - 1))
                  }
                  className="flex items-center justify-center transition-all bg-white border rounded-lg w-9 h-9 border-slate-200 text-slate-500 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <FiChevronRight className="w-4 h-4" />
                </button>

                {getPaginationPages().map((page, index) => {
                  if (page === "...") {
                    return (
                      <span
                        key={`dots-${index}`}
                        className="flex items-center justify-center w-8 text-xs h-9 text-slate-400"
                      >
                        ...
                      </span>
                    );
                  }

                  return (
                    <button
                      key={page}
                      type="button"
                      onClick={() => setCurrentPage(page)}
                      className={`flex items-center justify-center w-9 h-9 rounded-lg text-xs font-semibold transition-all ${
                        safeCurrentPage === page
                          ? "bg-blue-600 text-white shadow-sm shadow-blue-600/20"
                          : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}

                <button
                  type="button"
                  disabled={safeCurrentPage === totalPages}
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                  }
                  className="flex items-center justify-center transition-all bg-white border rounded-lg w-9 h-9 border-slate-200 text-slate-500 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <FiChevronLeft className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        /* =========================
            Empty State
        ========================= */

        <div className="flex flex-col items-center justify-center px-5 py-20 text-center">
          <div className="flex items-center justify-center w-20 h-20 mb-5 rounded-3xl bg-slate-100">
            <FiFolder className="w-10 h-10 text-slate-400" />
          </div>

          <h3 className="text-lg font-bold text-slate-700">
            {hasFilters ? "لا توجد نتائج" : "لا توجد تصنيفات ملفات"}
          </h3>

          <p className="max-w-md mt-2 text-sm leading-6 text-slate-400">
            {hasFilters
              ? "لم يتم العثور على تصنيفات تطابق البحث أو الفلاتر المحددة."
              : "لم يتم إنشاء أي تصنيفات ملفات حتى الآن. ابدأ بإضافة أول تصنيف لتنظيم ملفات العملاء."}
          </p>

          {hasFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="flex items-center gap-2 px-4 py-2.5 mt-5 text-sm font-semibold text-blue-600 transition-all rounded-xl bg-blue-50 hover:bg-blue-100"
            >
              <FiRefreshCw className="w-4 h-4" />
              إعادة ضبط البحث والفلاتر
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Table;
