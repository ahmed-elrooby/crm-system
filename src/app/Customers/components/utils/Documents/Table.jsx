"use client";

import React, { useMemo, useState } from "react";
import {
  FiFileText,
  FiFile,
  FiImage,
  FiEye,
  FiDownload,
  FiEdit2,
  FiTrash2,
  FiSearch,
  FiFilter,
  FiChevronLeft,
  FiChevronRight,
  FiFilePlus,
} from "react-icons/fi";

const Table = () => {
  const [search, setSearch] = useState("");
  const [fileType, setFileType] = useState("all");
  const [status, setStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  const documents = [
    {
      id: 1,
      name: "Contract.pdf",
      customer: "أحمد محمد",
      type: "PDF",
      size: "2.4 MB",
      date: "03 سبتمبر 2026",
      status: "نشط",
    },
    {
      id: 2,
      name: "Invoice-2026.pdf",
      customer: "شركة ABC",
      type: "PDF",
      size: "1.2 MB",
      date: "02 سبتمبر 2026",
      status: "نشط",
    },
    {
      id: 3,
      name: "Customer-ID.jpg",
      customer: "محمد علي",
      type: "Image",
      size: "800 KB",
      date: "01 سبتمبر 2026",
      status: "نشط",
    },
    {
      id: 4,
      name: "Agreement.docx",
      customer: "شركة XYZ",
      type: "Word",
      size: "540 KB",
      date: "30 أغسطس 2026",
      status: "نشط",
    },
    {
      id: 5,
      name: "Profile.png",
      customer: "محمود حسن",
      type: "Image",
      size: "1.8 MB",
      date: "28 أغسطس 2026",
      status: "نشط",
    },
    {
      id: 6,
      name: "Tax-Document.pdf",
      customer: "شركة Delta",
      type: "PDF",
      size: "3.1 MB",
      date: "27 أغسطس 2026",
      status: "نشط",
    },
    {
      id: 7,
      name: "License.jpg",
      customer: "علي حسن",
      type: "Image",
      size: "950 KB",
      date: "25 أغسطس 2026",
      status: "نشط",
    },
    {
      id: 8,
      name: "Proposal.docx",
      customer: "شركة Tech",
      type: "Word",
      size: "720 KB",
      date: "23 أغسطس 2026",
      status: "غير نشط",
    },
    {
      id: 9,
      name: "Receipt.pdf",
      customer: "محمد أحمد",
      type: "PDF",
      size: "600 KB",
      date: "20 أغسطس 2026",
      status: "نشط",
    },
    {
      id: 10,
      name: "Company-Logo.png",
      customer: "شركة JBR",
      type: "Image",
      size: "420 KB",
      date: "18 أغسطس 2026",
      status: "نشط",
    },
  ];

  // -----------------------------
  // Filter + Search
  // -----------------------------

  const filteredDocuments = useMemo(() => {
    return documents.filter((doc) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        doc.name.toLowerCase().includes(searchValue) ||
        doc.customer.toLowerCase().includes(searchValue);

      const matchesType = fileType === "all" || doc.type === fileType;

      const matchesStatus = status === "all" || doc.status === status;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [search, fileType, status]);

  // -----------------------------
  // Pagination
  // -----------------------------

  const totalPages = Math.ceil(filteredDocuments.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;

  const currentDocuments = filteredDocuments.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const startItem = filteredDocuments.length === 0 ? 0 : startIndex + 1;

  const endItem = Math.min(startIndex + itemsPerPage, filteredDocuments.length);

  // -----------------------------
  // Helpers
  // -----------------------------

  const getFileIcon = (type) => {
    if (type === "PDF") {
      return {
        icon: FiFileText,
        bg: "bg-red-50",
        color: "text-red-500",
      };
    }

    if (type === "Image") {
      return {
        icon: FiImage,
        bg: "bg-purple-50",
        color: "text-purple-600",
      };
    }

    return {
      icon: FiFile,
      bg: "bg-blue-50",
      color: "text-blue-600",
    };
  };

  const handleSearch = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleFileType = (value) => {
    setFileType(value);
    setCurrentPage(1);
  };

  const handleStatus = (value) => {
    setStatus(value);
    setCurrentPage(1);
  };

  return (
    <div className="overflow-hidden bg-white border shadow-sm rounded-2xl border-slate-200">
      {/* =========================
          Filters
      ========================= */}

      <div className="p-4 border-b border-slate-100">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          {/* Search */}

          <div className="relative w-full lg:max-w-md">
            <FiSearch
              size={18}
              className="absolute -translate-y-1/2 right-3 top-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="ابحث باسم المستند أو العميل..."
              className="w-full py-2.5 pr-10 pl-4 text-sm transition bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Filters */}

          <div className="flex flex-col gap-2 sm:flex-row">
            {/* File Type */}

            <div className="relative">
              <FiFilter
                size={16}
                className="absolute -translate-y-1/2 pointer-events-none right-3 top-1/2 text-slate-400"
              />

              <select
                value={fileType}
                onChange={(e) => handleFileType(e.target.value)}
                className="w-full sm:w-40 appearance-none bg-slate-50 border border-slate-200 rounded-xl py-2.5 pr-9 pl-8 text-sm text-slate-600 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="all">كل الملفات</option>
                <option value="PDF">PDF</option>
                <option value="Image">صور</option>
                <option value="Word">Word</option>
              </select>
            </div>

            {/* Status */}

            <select
              value={status}
              onChange={(e) => handleStatus(e.target.value)}
              className="w-full sm:w-36 bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-sm text-slate-600 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="all">كل الحالات</option>
              <option value="نشط">نشط</option>
              <option value="غير نشط">غير نشط</option>
            </select>
          </div>
        </div>
      </div>

      {/* =========================
          Table
      ========================= */}

      {currentDocuments.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            <thead>
              <tr className="border-b bg-slate-50/70 border-slate-100">
                <th className="px-4 py-3 text-xs font-semibold tracking-wide text-right uppercase text-slate-500">
                  #
                </th>

                <th className="px-4 py-3 text-xs font-semibold tracking-wide text-right uppercase text-slate-500">
                  المستند
                </th>

                <th className="px-4 py-3 text-xs font-semibold tracking-wide text-right uppercase text-slate-500">
                  العميل
                </th>

                <th className="px-4 py-3 text-xs font-semibold tracking-wide text-right uppercase text-slate-500">
                  نوع الملف
                </th>

                <th className="px-4 py-3 text-xs font-semibold tracking-wide text-right uppercase text-slate-500">
                  الحجم
                </th>

                <th className="px-4 py-3 text-xs font-semibold tracking-wide text-right uppercase text-slate-500">
                  تاريخ الرفع
                </th>

                <th className="px-4 py-3 text-xs font-semibold tracking-wide text-right uppercase text-slate-500">
                  الحالة
                </th>

                <th className="px-4 py-3 text-xs font-semibold tracking-wide text-right uppercase text-slate-500">
                  الإجراءات
                </th>
              </tr>
            </thead>

            <tbody>
              {currentDocuments.map((doc, index) => {
                const file = getFileIcon(doc.type);
                const Icon = file.icon;

                return (
                  <tr
                    key={doc.id}
                    className="transition border-b border-slate-100 last:border-0 hover:bg-slate-50/70"
                  >
                    {/* Number */}

                    <td className="px-4 py-4 text-sm text-slate-400">
                      {startIndex + index + 1}
                    </td>

                    {/* Document */}

                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex items-center justify-center w-10 h-10 rounded-xl ${file.bg} ${file.color}`}
                        >
                          <Icon size={19} />
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-slate-700">
                            {doc.name}
                          </p>

                          <p className="mt-0.5 text-xs text-slate-400">
                            مستند عميل
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Customer */}

                    <td className="px-4 py-4 text-sm font-medium text-slate-600">
                      {doc.customer}
                    </td>

                    {/* Type */}

                    <td className="px-4 py-4">
                      <span className="inline-flex px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-100 text-slate-600">
                        {doc.type}
                      </span>
                    </td>

                    {/* Size */}

                    <td className="px-4 py-4 text-sm text-slate-500">
                      {doc.size}
                    </td>

                    {/* Date */}

                    <td className="px-4 py-4 text-sm text-slate-500">
                      {doc.date}
                    </td>

                    {/* Status */}

                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                          doc.status === "نشط"
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            doc.status === "نشط"
                              ? "bg-emerald-500"
                              : "bg-slate-400"
                          }`}
                        />

                        {doc.status}
                      </span>
                    </td>

                    {/* Actions */}

                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1.5">
                        <button
                          title="عرض"
                          className="flex items-center justify-center w-8 h-8 text-purple-600 transition rounded-lg bg-purple-50 hover:bg-purple-100"
                        >
                          <FiEye size={16} />
                        </button>

                        <button
                          title="تحميل"
                          className="flex items-center justify-center w-8 h-8 transition rounded-lg text-emerald-600 bg-emerald-50 hover:bg-emerald-100"
                        >
                          <FiDownload size={16} />
                        </button>

                        <button
                          title="تعديل"
                          className="flex items-center justify-center w-8 h-8 text-blue-600 transition rounded-lg bg-blue-50 hover:bg-blue-100"
                        >
                          <FiEdit2 size={16} />
                        </button>

                        <button
                          title="حذف"
                          className="flex items-center justify-center w-8 h-8 text-red-500 transition rounded-lg bg-red-50 hover:bg-red-100"
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        /* =========================
            Empty State
        ========================= */

        <div className="flex flex-col items-center justify-center px-4 py-16 text-center">
          <div className="flex items-center justify-center w-20 h-20 mb-4 rounded-full bg-slate-100 text-slate-300">
            <FiFilePlus size={34} />
          </div>

          <h3 className="text-lg font-semibold text-slate-700">
            لا توجد مستندات
          </h3>

          <p className="max-w-sm mt-1 text-sm text-slate-400">
            لم يتم العثور على مستندات مطابقة لعملية البحث أو الفلترة.
          </p>
        </div>
      )}

      {/* =========================
          Pagination
      ========================= */}

      {filteredDocuments.length > 0 && (
        <div className="flex flex-col gap-3 px-4 py-4 border-t sm:flex-row sm:items-center sm:justify-between border-slate-100 bg-slate-50/30">
          {/* Info */}

          <p className="text-sm text-slate-500">
            عرض{" "}
            <span className="font-semibold text-slate-700">{startItem}</span>{" "}
            إلى <span className="font-semibold text-slate-700">{endItem}</span>{" "}
            من{" "}
            <span className="font-semibold text-slate-700">
              {filteredDocuments.length}
            </span>{" "}
            مستند
          </p>

          {/* Pages */}

          <div className="flex items-center gap-1">
            {/* Previous */}

            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="flex items-center justify-center transition border rounded-lg w-9 h-9 border-slate-200 text-slate-500 hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <FiChevronRight size={17} />
            </button>

            {/* Page Numbers */}

            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-9 h-9 rounded-lg text-sm font-medium transition ${
                    currentPage === page
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-slate-500 hover:bg-white border border-transparent hover:border-slate-200"
                  }`}
                >
                  {page}
                </button>
              ),
            )}

            {/* Next */}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="flex items-center justify-center transition border rounded-lg w-9 h-9 border-slate-200 text-slate-500 hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <FiChevronLeft size={17} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
