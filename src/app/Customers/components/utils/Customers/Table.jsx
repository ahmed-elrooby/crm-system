"use client";

import React, { useContext, useMemo, useState } from "react";
import {
  FiSearch,
  FiEdit2,
  FiTrash2,
  FiEye,
  FiGrid,
  FiList,
  FiChevronLeft,
  FiChevronRight,
  FiPhone,
  FiMail,
  FiMapPin,
  FiUser,
  FiRefreshCw,
} from "react-icons/fi";

import { userContext } from "../../../../../Providers/CustomerProvider/Customer.js";
import CustomerDetails from "./CustomerDetails.jsx";
import EditCustomer from "./EditCustomer.jsx";
import DeleteModel from "./DeleteModel.jsx";
import ChangeStatus from "./ChangeStatus.jsx";

/* =========================
   Customer Pipeline Status
========================= */

const STATUS_MAP = {
  // Numeric statuses
  1: {
    label: "عميل محتمل",
    color: "bg-slate-100 text-slate-700",
  },

  2: {
    label: "تم التواصل",
    color: "bg-blue-100 text-blue-700",
  },

  3: {
    label: "مهتم",
    color: "bg-cyan-100 text-cyan-700",
  },

  4: {
    label: "مؤهل",
    color: "bg-indigo-100 text-indigo-700",
  },

  5: {
    label: "تفاوض",
    color: "bg-violet-100 text-violet-700",
  },

  6: {
    label: "تم التعاقد",
    color: "bg-purple-100 text-purple-700",
  },

  7: {
    label: "قيد التنفيذ",
    color: "bg-amber-100 text-amber-700",
  },

  8: {
    label: "تم التسليم",
    color: "bg-teal-100 text-teal-700",
  },

  9: {
    label: "مدفوع جزئيًا",
    color: "bg-orange-100 text-orange-700",
  },

  10: {
    label: "مدفوع بالكامل",
    color: "bg-green-100 text-green-700",
  },

  11: {
    label: "ملغي",
    color: "bg-red-100 text-red-700",
  },

  // String statuses from API
  New: {
    label: "عميل محتمل",
    color: "bg-slate-100 text-slate-700",
  },

  Contacted: {
    label: "تم التواصل",
    color: "bg-blue-100 text-blue-700",
  },

  Interested: {
    label: "مهتم",
    color: "bg-cyan-100 text-cyan-700",
  },

  Qualified: {
    label: "مؤهل",
    color: "bg-indigo-100 text-indigo-700",
  },

  Negotiating: {
    label: "تفاوض",
    color: "bg-violet-100 text-violet-700",
  },

  Contracted: {
    label: "تم التعاقد",
    color: "bg-purple-100 text-purple-700",
  },

  InProgress: {
    label: "قيد التنفيذ",
    color: "bg-amber-100 text-amber-700",
  },

  Delivered: {
    label: "تم التسليم",
    color: "bg-teal-100 text-teal-700",
  },

  PartiallyPaid: {
    label: "مدفوع جزئيًا",
    color: "bg-orange-100 text-orange-700",
  },

  Paid: {
    label: "مدفوع بالكامل",
    color: "bg-green-100 text-green-700",
  },

  FullyPaid: {
    label: "مدفوع بالكامل",
    color: "bg-green-100 text-green-700",
  },

  Cancelled: {
    label: "ملغي",
    color: "bg-red-100 text-red-700",
  },

  Canceled: {
    label: "ملغي",
    color: "bg-red-100 text-red-700",
  },

  Lost: {
    label: "ملغي",
    color: "bg-red-100 text-red-700",
  },
};

/* =========================
   Status List
========================= */

const STATUS_LIST = [
  { id: 1, label: "عميل محتمل" },
  { id: 2, label: "تم التواصل" },
  { id: 3, label: "مهتم" },
  { id: 4, label: "مؤهل" },
  { id: 5, label: "تفاوض" },
  { id: 6, label: "تم التعاقد" },
  { id: 7, label: "قيد التنفيذ" },
  { id: 8, label: "تم التسليم" },
  { id: 9, label: "مدفوع جزئيًا" },
  { id: 10, label: "مدفوع بالكامل" },
  { id: 11, label: "ملغي" },
];

/* =========================
   Helpers
========================= */

const isCustomerActive = (customer) => {
  return (
    customer?.isActive === true ||
    customer?.isActive === 1 ||
    customer?.isActive === "1" ||
    customer?.isActive === "true"
  );
};

/* =========================
   Get Customer Status
========================= */

const getStatus = (status) => {
  if (status === null || status === undefined || status === "") {
    return {
      label: "غير محدد",
      color: "bg-gray-100 text-gray-600",
    };
  }

  // لو الـ API بيرجع رقم
  if (STATUS_MAP[Number(status)]) {
    return STATUS_MAP[Number(status)];
  }

  // لو الـ API بيرجع String
  if (STATUS_MAP[status]) {
    return STATUS_MAP[status];
  }

  return {
    label: status,
    color: "bg-gray-100 text-gray-600",
  };
};

/* =========================
   Lead Source
========================= */

const getLeadSource = (source) => {
  const sources = {
    Website: "الموقع الإلكتروني",
    Referral: "ترشيح",
    "Social Media": "وسائل التواصل الاجتماعي",
    Advertisement: "إعلان",
    Other: "أخرى",
  };

  return sources[source] || source || "غير محدد";
};

/* =========================
   Component
========================= */

const Table = () => {
  const {
    customers,
    openEditCustomer,
    setOpenEditCustomer,
    openDeleteCustomer,
    setOpenDeleteCustomer,
    openChangeStatus,
    setOpenChangeStatus,
  } = useContext(userContext);

  const [openDetails, setOpenDetails] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState("table");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  /* =========================
     Search
  ========================= */

  const filteredCustomers = useMemo(() => {
    if (!customers) return [];

    const searchValue = search.toLowerCase().trim();

    return customers.filter((customer) => {
      return (
        customer.fullName?.toLowerCase().includes(searchValue) ||
        customer.customerCode?.toLowerCase().includes(searchValue) ||
        customer.companyName?.toLowerCase().includes(searchValue) ||
        customer.phoneNumber?.toLowerCase().includes(searchValue) ||
        customer.email?.toLowerCase().includes(searchValue)
      );
    });
  }, [customers, search]);

  /* =========================
     Pagination
  ========================= */

  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;

  const currentCustomers = filteredCustomers.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  /* =========================
     Handlers
  ========================= */

  const handleSearch = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleOpenDetails = (customer) => {
    setSelectedCustomer(customer);
    setOpenDetails(true);
  };

  const handleEdit = (customer) => {
    setSelectedCustomer(customer);
    setOpenEditCustomer(true);
  };

  const handleChangeStatus = (customer) => {
    setSelectedCustomer(customer);
    setOpenChangeStatus(true);
  };

  const handleDelete = (customer) => {
    setSelectedCustomer(customer);
    setOpenDeleteCustomer(true);
  };

  return (
    <div className="w-full mt-8" dir="rtl">
      {/* =========================
          Header / Search
      ========================= */}

      <div className="p-4 mb-5 bg-white border shadow-sm border-slate-200 rounded-2xl">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          {/* Search */}

          <div className="relative flex-1 max-w-xl">
            <FiSearch
              size={20}
              className="absolute -translate-y-1/2 right-4 top-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="ابحث باسم العميل، الكود، الشركة، الهاتف أو البريد..."
              className="w-full h-12 pl-4 pr-12 text-sm transition border outline-none rounded-xl border-slate-200 bg-slate-50 text-slate-700 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
            />
          </div>

          {/* View Controls */}

          <div className="flex items-center gap-3">
            <div className="flex items-center p-1 bg-slate-100 rounded-xl">
              <button
                onClick={() => setViewMode("table")}
                className={`
                  w-10
                  h-10
                  rounded-lg
                  flex
                  items-center
                  justify-center
                  transition
                  ${
                    viewMode === "table"
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-slate-500 hover:text-slate-700"
                  }
                `}
                title="عرض الجدول"
              >
                <FiList size={19} />
              </button>

              <button
                onClick={() => setViewMode("grid")}
                className={`
                  w-10
                  h-10
                  rounded-lg
                  flex
                  items-center
                  justify-center
                  transition
                  ${
                    viewMode === "grid"
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-slate-500 hover:text-slate-700"
                  }
                `}
                title="عرض البطاقات"
              >
                <FiGrid size={19} />
              </button>
            </div>
          </div>
        </div>

        {/* Results */}

        <div className="mt-4 text-sm text-slate-500">
          إجمالي العملاء:
          <span className="mr-1 font-bold text-slate-800">
            {filteredCustomers.length}
          </span>
        </div>
      </div>

      {/* =========================
          TABLE VIEW
      ========================= */}

      {viewMode === "table" && (
        <div className="overflow-hidden bg-white border shadow-sm border-slate-200 rounded-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead className="border-b bg-slate-50 border-slate-200">
                <tr>
                  <th className="px-5 py-4 text-xs font-bold text-slate-500 whitespace-nowrap">
                    العميل
                  </th>

                  <th className="px-5 py-4 text-xs font-bold text-slate-500 whitespace-nowrap">
                    الكود
                  </th>

                  <th className="px-5 py-4 text-xs font-bold text-slate-500 whitespace-nowrap">
                    الشركة
                  </th>

                  <th className="px-5 py-4 text-xs font-bold text-slate-500 whitespace-nowrap">
                    التواصل
                  </th>

                  <th className="px-5 py-4 text-xs font-bold text-slate-500 whitespace-nowrap">
                    الحالة العامة
                  </th>

                  <th className="px-5 py-4 text-xs font-bold text-slate-500 whitespace-nowrap">
                    حالة العميل
                  </th>

                  <th className="px-5 py-4 text-xs font-bold text-slate-500 whitespace-nowrap">
                    المصدر
                  </th>

                  <th className="px-5 py-4 text-xs font-bold text-slate-500 whitespace-nowrap">
                    الإجراءات
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {currentCustomers.length > 0 ? (
                  currentCustomers.map((customer) => {
                    const active = isCustomerActive(customer);

                    const pipelineStatus = getStatus(customer.status);

                    return (
                      <tr
                        key={customer.id}
                        className="transition hover:bg-slate-50/70"
                      >
                        {/* Customer */}

                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center font-bold text-blue-600 w-11 h-11 rounded-xl bg-blue-50 shrink-0">
                              {customer.fullName?.charAt(0)?.toUpperCase() || (
                                <FiUser />
                              )}
                            </div>

                            <div className="min-w-0">
                              <p className="font-bold truncate text-slate-800">
                                {customer.fullName || "بدون اسم"}
                              </p>

                              <p className="mt-1 text-xs text-slate-400">
                                ID: {customer.id}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Code */}

                        <td className="px-5 py-4">
                          <span className="inline-flex px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold">
                            {customer.customerCode || "-"}
                          </span>
                        </td>

                        {/* Company */}

                        <td className="px-5 py-4">
                          <span className="text-sm text-slate-700">
                            {customer.companyName || "-"}
                          </span>
                        </td>

                        {/* Contact */}

                        <td className="px-5 py-4">
                          <div className="space-y-1">
                            {customer.phoneNumber && (
                              <div className="flex items-center gap-2 text-xs text-slate-600">
                                <FiPhone className="text-slate-400" />
                                <span dir="ltr">{customer.phoneNumber}</span>
                              </div>
                            )}

                            {customer.email && (
                              <div className="flex items-center gap-2 text-xs text-slate-600">
                                <FiMail className="text-slate-400" />
                                <span>{customer.email}</span>
                              </div>
                            )}
                          </div>
                        </td>

                        {/* Active Status */}

                        <td className="px-5 py-4">
                          <span
                            className={`
                              inline-flex
                              items-center
                              gap-2
                              px-3
                              py-1.5
                              rounded-full
                              text-xs
                              font-bold
                              ${
                                active
                                  ? "bg-green-50 text-green-700"
                                  : "bg-red-50 text-red-700"
                              }
                            `}
                          >
                            <span
                              className={`
                                w-2
                                h-2
                                rounded-full
                                ${active ? "bg-green-500" : "bg-red-500"}
                              `}
                            />

                            {active ? "نشط" : "غير نشط"}
                          </span>
                        </td>

                        {/* Pipeline Status */}

                        <td className="px-5 py-4">
                          <span
                            className={`
                              inline-flex
                              items-center
                              px-3
                              py-1.5
                              rounded-full
                              text-xs
                              font-bold
                              whitespace-nowrap
                              ${pipelineStatus.color}
                            `}
                          >
                            {pipelineStatus.label}
                          </span>
                        </td>

                        {/* Lead Source */}

                        <td className="px-5 py-4">
                          <span className="text-sm text-slate-600">
                            {getLeadSource(customer.leadSource)}
                          </span>
                        </td>

                        {/* Actions */}

                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            {/* Details */}

                            <button
                              onClick={() => handleOpenDetails(customer)}
                              className="flex items-center justify-center text-blue-600 transition rounded-lg w-9 h-9 bg-blue-50 hover:bg-blue-600 hover:text-white"
                              title="عرض التفاصيل"
                            >
                              <FiEye size={17} />
                            </button>

                            {/* Edit */}

                            <button
                              onClick={() => handleEdit(customer)}
                              className="flex items-center justify-center transition rounded-lg w-9 h-9 bg-amber-50 text-amber-600 hover:bg-amber-500 hover:text-white"
                              title="تعديل العميل"
                            >
                              <FiEdit2 size={17} />
                            </button>

                            {/* Change Status */}

                            <button
                              onClick={() => handleChangeStatus(customer)}
                              className="flex items-center justify-center transition rounded-lg w-9 h-9 bg-violet-50 text-violet-600 hover:bg-violet-600 hover:text-white"
                              title="تغيير حالة العميل"
                            >
                              <FiRefreshCw size={17} />
                            </button>

                            {/* Delete */}

                            <button
                              onClick={() => handleDelete(customer)}
                              className="flex items-center justify-center text-red-600 transition rounded-lg w-9 h-9 bg-red-50 hover:bg-red-600 hover:text-white"
                              title="حذف العميل"
                            >
                              <FiTrash2 size={17} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="8" className="px-5 py-16 text-center">
                      <div className="flex flex-col items-center">
                        <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-2xl bg-slate-100 text-slate-400">
                          <FiUser size={28} />
                        </div>

                        <h3 className="font-bold text-slate-700">
                          لا يوجد عملاء
                        </h3>

                        <p className="mt-1 text-sm text-slate-400">
                          لم يتم العثور على أي عميل مطابق للبحث
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* =========================
          GRID VIEW
      ========================= */}

      {viewMode === "grid" && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {currentCustomers.map((customer) => {
            const active = isCustomerActive(customer);

            const pipelineStatus = getStatus(customer.status);

            return (
              <div
                key={customer.id}
                className="p-5 transition bg-white border shadow-sm border-slate-200 rounded-2xl hover:shadow-md"
              >
                {/* Card Header */}

                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center min-w-0 gap-3">
                    <div className="flex items-center justify-center w-12 h-12 text-lg font-bold text-blue-600 rounded-xl bg-blue-50 shrink-0">
                      {customer.fullName?.charAt(0)?.toUpperCase() || (
                        <FiUser />
                      )}
                    </div>

                    <div className="min-w-0">
                      <h3 className="font-bold truncate text-slate-800">
                        {customer.fullName || "بدون اسم"}
                      </h3>

                      <p className="mt-1 text-xs text-slate-400">
                        {customer.customerCode || "-"}
                      </p>
                    </div>
                  </div>

                  {/* Active Status */}

                  <span
                    className={`
                      px-2.5
                      py-1
                      rounded-full
                      text-[11px]
                      font-bold
                      whitespace-nowrap
                      ${
                        active
                          ? "bg-green-50 text-green-700"
                          : "bg-red-50 text-red-700"
                      }
                    `}
                  >
                    {active ? "نشط" : "غير نشط"}
                  </span>
                </div>

                {/* Pipeline Status */}

                <div className="mt-5">
                  <p className="mb-2 text-xs text-slate-400">حالة العميل</p>

                  <span
                    className={`
                      inline-flex
                      items-center
                      px-3
                      py-1.5
                      rounded-full
                      text-xs
                      font-bold
                      ${pipelineStatus.color}
                    `}
                  >
                    {pipelineStatus.label}
                  </span>
                </div>

                {/* Info */}

                <div className="mt-5 space-y-3">
                  {customer.companyName && (
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <FiUser className="text-slate-400 shrink-0" />
                      <span className="truncate">{customer.companyName}</span>
                    </div>
                  )}

                  {customer.phoneNumber && (
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <FiPhone className="text-slate-400 shrink-0" />

                      <span dir="ltr">{customer.phoneNumber}</span>
                    </div>
                  )}

                  {customer.email && (
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <FiMail className="text-slate-400 shrink-0" />

                      <span className="truncate">{customer.email}</span>
                    </div>
                  )}

                  {customer.city && (
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <FiMapPin className="text-slate-400 shrink-0" />

                      <span>{customer.city}</span>
                    </div>
                  )}
                </div>

                {/* Actions */}

                <div className="flex items-center justify-between pt-4 mt-5 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    {/* Details */}

                    <button
                      onClick={() => handleOpenDetails(customer)}
                      className="flex items-center justify-center text-blue-600 transition rounded-lg w-9 h-9 bg-blue-50 hover:bg-blue-600 hover:text-white"
                      title="التفاصيل"
                    >
                      <FiEye size={17} />
                    </button>

                    {/* Edit */}

                    <button
                      onClick={() => handleEdit(customer)}
                      className="flex items-center justify-center transition rounded-lg w-9 h-9 bg-amber-50 text-amber-600 hover:bg-amber-500 hover:text-white"
                      title="تعديل"
                    >
                      <FiEdit2 size={17} />
                    </button>

                    {/* Change Status */}

                    <button
                      onClick={() => handleChangeStatus(customer)}
                      className="flex items-center justify-center transition rounded-lg w-9 h-9 bg-violet-50 text-violet-600 hover:bg-violet-600 hover:text-white"
                      title="تغيير حالة العميل"
                    >
                      <FiRefreshCw size={17} />
                    </button>

                    {/* Delete */}

                    <button
                      onClick={() => handleDelete(customer)}
                      className="flex items-center justify-center text-red-600 transition rounded-lg w-9 h-9 bg-red-50 hover:bg-red-600 hover:text-white"
                      title="حذف"
                    >
                      <FiTrash2 size={17} />
                    </button>
                  </div>

                  <span className="text-xs text-slate-400">
                    {getLeadSource(customer.leadSource)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* =========================
          Pagination
      ========================= */}

      {totalPages > 1 && (
        <div className="flex items-center justify-between p-4 mt-5 bg-white border border-slate-200 rounded-2xl">
          <p className="text-sm text-slate-500">
            صفحة <span className="font-bold text-slate-700">{currentPage}</span>{" "}
            من <span className="font-bold text-slate-700">{totalPages}</span>
          </p>

          <div className="flex items-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="flex items-center justify-center border rounded-lg w-9 h-9 border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <FiChevronRight />
            </button>

            <button
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              className="flex items-center justify-center border rounded-lg w-9 h-9 border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <FiChevronLeft />
            </button>
          </div>
        </div>
      )}

      {/* =========================
          Customer Details
      ========================= */}

      {openDetails && (
        <CustomerDetails
          setOpenDetails={setOpenDetails}
          selectedCustomer={selectedCustomer}
        />
      )}

      {/* =========================
          Edit Customer
      ========================= */}

      {openEditCustomer && <EditCustomer selectedCustomer={selectedCustomer} />}

      {/* =========================
          Delete Customer
      ========================= */}

      {openDeleteCustomer && (
        <DeleteModel selectedCustomer={selectedCustomer} />
      )}

      {/* =========================
          Change Status
      ========================= */}

      {openChangeStatus && <ChangeStatus selectedCustomer={selectedCustomer} />}
    </div>
  );
};

export default Table;
