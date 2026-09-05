"use client";

import React from "react";
import {
  FiX,
  FiUser,
  FiPhone,
  FiMapPin,
  FiBriefcase,
  FiActivity,
  FiMail,
  FiGlobe,
  FiCalendar,
  FiFileText,
} from "react-icons/fi";

/* =========================================================
   Pipeline Status
========================================================= */

const STATUS_MAP = {
  1: {
    label: "عميل محتمل",
    className: "bg-slate-100 text-slate-700",
    dot: "bg-slate-500",
  },

  2: {
    label: "تم التواصل",
    className: "bg-blue-100 text-blue-700",
    dot: "bg-blue-500",
  },

  3: {
    label: "مهتم",
    className: "bg-cyan-100 text-cyan-700",
    dot: "bg-cyan-500",
  },

  4: {
    label: "مؤهل",
    className: "bg-indigo-100 text-indigo-700",
    dot: "bg-indigo-500",
  },

  5: {
    label: "تفاوض",
    className: "bg-amber-100 text-amber-700",
    dot: "bg-amber-500",
  },

  6: {
    label: "تم التعاقد",
    className: "bg-emerald-100 text-emerald-700",
    dot: "bg-emerald-500",
  },

  7: {
    label: "قيد التنفيذ",
    className: "bg-purple-100 text-purple-700",
    dot: "bg-purple-500",
  },

  8: {
    label: "تم التسليم",
    className: "bg-teal-100 text-teal-700",
    dot: "bg-teal-500",
  },

  9: {
    label: "مدفوع جزئيًا",
    className: "bg-orange-100 text-orange-700",
    dot: "bg-orange-500",
  },

  10: {
    label: "مدفوع بالكامل",
    className: "bg-green-100 text-green-700",
    dot: "bg-green-500",
  },

  11: {
    label: "ملغي",
    className: "bg-red-100 text-red-700",
    dot: "bg-red-500",
  },
};

/* =========================================================
   Status Enum Mapping
========================================================= */

const STATUS_VALUE_MAP = {
  New: 1,
  Contacted: 2,
  Interested: 3,
  Qualified: 4,
  Negotiating: 5,
  Contracted: 6,
  InProgress: 7,
  Delivered: 8,
  PartiallyPaid: 9,
  Paid: 10,
  Cancelled: 11,
};

/* =========================================================
   Normalize Status
========================================================= */

const normalizeStatus = (status) => {
  if (status === null || status === undefined || status === "") {
    return null;
  }

  // لو الـ API بيرجع رقم
  const numericStatus = Number(status);

  if (!Number.isNaN(numericStatus) && STATUS_MAP[numericStatus]) {
    return numericStatus;
  }

  // لو الـ API بيرجع Enum string
  return STATUS_VALUE_MAP[status] || null;
};

/* =========================================================
   Lead Source
========================================================= */

const LEAD_SOURCE_MAP = {
  Website: "الموقع الإلكتروني",
  Referral: "ترشيح",
  "Social Media": "وسائل التواصل الاجتماعي",
  Advertisement: "إعلان",
  Other: "أخرى",
};

/* =========================================================
   Customer Details
========================================================= */

const CustomerDetails = ({ setOpenDetails, selectedCustomer }) => {
  if (!selectedCustomer) return null;

  /* =======================================================
     Active / Inactive
  ======================================================= */

  const isActive =
    selectedCustomer.isActive === true ||
    selectedCustomer.isActive === 1 ||
    selectedCustomer.isActive === "1" ||
    selectedCustomer.isActive === "true";

  /* =======================================================
     Pipeline Status

     Supports:
     9
     "9"
     "PartiallyPaid"
  ======================================================= */

  const currentStatus = normalizeStatus(selectedCustomer.status);

  const currentStatusInfo = STATUS_MAP[currentStatus] || {
    label: "غير معروف",
    className: "bg-slate-100 text-slate-600",
    dot: "bg-slate-400",
  };

  /* =======================================================
     Lead Source
  ======================================================= */

  const leadSource =
    LEAD_SOURCE_MAP[selectedCustomer.leadSource] ||
    selectedCustomer.leadSource ||
    "غير متوفر";

  /* =======================================================
     Date Formatter
  ======================================================= */

  const formatDate = (date) => {
    if (!date) return "غير متوفر";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "غير متوفر";
    }

    return parsedDate.toLocaleString("ar-EG", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div
      dir="rtl"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={() => setOpenDetails(false)}
    >
      <div
        className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* =================================================
            Header
        ================================================= */}

        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-white border-b">
          <div>
            <h2 className="text-xl font-bold text-slate-800">تفاصيل العميل</h2>

            <p className="mt-1 text-sm text-slate-500">
              عرض جميع بيانات العميل
            </p>
          </div>

          <button
            type="button"
            onClick={() => setOpenDetails(false)}
            className="flex items-center justify-center transition rounded-full h-9 w-9 bg-slate-100 text-slate-600 hover:bg-red-100 hover:text-red-500"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* =================================================
            Content
        ================================================= */}

        <div className="p-6 space-y-7">
          {/* =================================================
              Customer Header
          ================================================= */}

          <div className="flex flex-col gap-5 p-5 border rounded-2xl border-slate-200 bg-slate-50 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              {/* Avatar */}

              <div className="flex items-center justify-center w-16 h-16 text-blue-600 bg-blue-100 rounded-full shrink-0">
                <FiUser size={30} />
              </div>

              {/* Customer Name */}

              <div>
                <h3 className="text-xl font-bold text-slate-800">
                  {selectedCustomer.fullName || "غير متوفر"}
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  كود العميل:
                  <span className="mr-1 font-semibold text-slate-700">
                    {selectedCustomer.customerCode || "غير متوفر"}
                  </span>
                </p>
              </div>
            </div>

            {/* General Active Status */}

            <ActiveStatusBadge isActive={isActive} />
          </div>

          {/* =================================================
              Basic Information
          ================================================= */}

          <section>
            <SectionTitle icon={<FiUser />} title="البيانات الأساسية" />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <InfoItem label="اسم العميل" value={selectedCustomer.fullName} />

              <InfoItem
                label="كود العميل"
                value={selectedCustomer.customerCode}
              />

              <InfoItem
                label="تصنيف العميل"
                value={selectedCustomer.customerCategoryName}
              />

              <InfoItem label="مصدر العميل" value={leadSource} />

              <InfoItem label="حالة الـ Pipeline">
                <PipelineStatusBadge status={currentStatus} />
              </InfoItem>

              <InfoItem label="الشركة" value={selectedCustomer.companyName} />
            </div>
          </section>

          {/* =================================================
              Contact Information
          ================================================= */}

          <section>
            <SectionTitle icon={<FiPhone />} title="بيانات التواصل" />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <InfoItem
                label="رقم الهاتف"
                value={selectedCustomer.phoneNumber}
                icon={<FiPhone />}
              />

              <InfoItem
                label="رقم الهاتف الثاني"
                value={selectedCustomer.phoneNumber2}
                icon={<FiPhone />}
              />

              <InfoItem
                label="البريد الإلكتروني"
                value={selectedCustomer.email}
                icon={<FiMail />}
              />
            </div>
          </section>

          {/* =================================================
              Address
          ================================================= */}

          <section>
            <SectionTitle icon={<FiMapPin />} title="العنوان" />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <InfoItem
                label="الدولة"
                value={selectedCustomer.country}
                icon={<FiGlobe />}
              />

              <InfoItem
                label="المدينة"
                value={selectedCustomer.city}
                icon={<FiMapPin />}
              />

              <InfoItem
                label="العنوان بالتفصيل"
                value={selectedCustomer.address}
                full
                icon={<FiMapPin />}
              />
            </div>
          </section>

          {/* =================================================
              Additional Information
          ================================================= */}

          <section>
            <SectionTitle icon={<FiBriefcase />} title="معلومات إضافية" />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <InfoItem
                label="تاريخ الإضافة"
                value={formatDate(selectedCustomer.createdAt)}
                icon={<FiCalendar />}
              />

              <InfoItem
                label="آخر تواصل"
                value={
                  selectedCustomer.lastContactDate
                    ? formatDate(selectedCustomer.lastContactDate)
                    : "لم يتم التواصل بعد"
                }
                icon={<FiCalendar />}
              />

              <InfoItem
                label="آخر تحديث"
                value={formatDate(selectedCustomer.updatedAt)}
                icon={<FiCalendar />}
              />

              <InfoItem
                label="ملاحظات"
                value={selectedCustomer.notes || "لا توجد ملاحظات"}
                full
                icon={<FiFileText />}
              />
            </div>
          </section>

          {/* =================================================
              Pipeline
          ================================================= */}

          <section>
            <SectionTitle icon={<FiActivity />} title="مسار العميل" />

            {/* Current Status Card */}

            <div className="p-5 mb-5 border border-blue-100 rounded-2xl bg-blue-50">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-medium text-blue-600">
                    المرحلة الحالية للعميل
                  </p>

                  <h4 className="mt-1 text-xl font-bold text-slate-800">
                    {currentStatusInfo.label}
                  </h4>

                  <p className="mt-1 text-xs text-slate-500">
                    المرحلة رقم {currentStatus || "-"} من{" "}
                    {Object.keys(STATUS_MAP).length}
                  </p>
                </div>

                <PipelineStatusBadge status={currentStatus} />
              </div>
            </div>

            {/* Pipeline */}

            <div className="p-6 overflow-x-auto bg-white border rounded-2xl border-slate-200">
              <div className="flex min-w-[950px] items-start">
                {Object.entries(STATUS_MAP).map(([key, item], index) => {
                  const step = Number(key);

                  const isCurrent = currentStatus === step;

                  const isCompleted =
                    currentStatus !== null && currentStatus > step;

                  const isLast = index === Object.keys(STATUS_MAP).length - 1;

                  return (
                    <React.Fragment key={key}>
                      {/* Step */}

                      <div className="flex min-w-[80px] flex-col items-center">
                        {/* Circle */}

                        <div
                          className={`
                              flex items-center justify-center
                              rounded-full
                              font-bold
                              transition-all duration-300

                              ${
                                isCurrent
                                  ? `
                                    h-14 w-14
                                    ${item.className}
                                    ring-4 ring-blue-100
                                    shadow-lg
                                    scale-110
                                  `
                                  : isCompleted
                                    ? `
                                      h-9 w-9
                                      bg-blue-600
                                      text-white
                                    `
                                    : `
                                      h-9 w-9
                                      bg-slate-100
                                      text-slate-400
                                      border border-slate-200
                                    `
                              }
                            `}
                        >
                          {isCompleted ? "✓" : step}
                        </div>

                        {/* Label */}

                        <div
                          className={`
                              mt-3
                              max-w-[90px]
                              text-center
                              text-[11px]
                              leading-4
                              transition-all

                              ${
                                isCurrent
                                  ? `
                                    font-bold
                                    text-blue-700
                                  `
                                  : isCompleted
                                    ? `
                                      font-medium
                                      text-slate-600
                                    `
                                    : `
                                      font-medium
                                      text-slate-400
                                    `
                              }
                            `}
                        >
                          {item.label}
                        </div>

                        {/* Current indicator */}

                        {isCurrent && (
                          <span className="mt-2 rounded-full bg-blue-600 px-2.5 py-1 text-[9px] font-bold text-white">
                            الحالية
                          </span>
                        )}
                      </div>

                      {/* Connector */}

                      {!isLast && (
                        <div
                          className={`
                              mt-[18px]
                              h-[3px]
                              flex-1
                              rounded-full
                              transition-all duration-300

                              ${isCompleted ? "bg-blue-600" : "bg-slate-200"}
                            `}
                        />
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          </section>
        </div>

        {/* =================================================
            Footer
        ================================================= */}

        <div className="flex justify-start px-6 py-4 border-t bg-slate-50">
          <button
            type="button"
            onClick={() => setOpenDetails(false)}
            className="rounded-lg bg-slate-800 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-slate-700"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};

/* =========================================================
   Section Title
========================================================= */

const SectionTitle = ({ icon, title }) => {
  return (
    <h3 className="flex items-center gap-2 mb-4 text-lg font-bold text-slate-800">
      <span className="text-blue-600">{icon}</span>

      {title}
    </h3>
  );
};

/* =========================================================
   Active Status Badge
========================================================= */

const ActiveStatusBadge = ({ isActive }) => {
  return (
    <div
      className={`
        inline-flex items-center gap-2
        rounded-full px-4 py-2
        text-sm font-semibold
        ${
          isActive
            ? "bg-emerald-100 text-emerald-700"
            : "bg-red-100 text-red-700"
        }
      `}
    >
      <span
        className={`
          h-2.5 w-2.5 rounded-full
          ${isActive ? "bg-emerald-500" : "bg-red-500"}
        `}
      />

      {isActive ? "نشط" : "غير نشط"}
    </div>
  );
};

/* =========================================================
   Pipeline Status Badge
========================================================= */

const PipelineStatusBadge = ({ status }) => {
  const normalizedStatus = normalizeStatus(status);

  const statusInfo = STATUS_MAP[normalizedStatus] || {
    label: "غير معروف",
    className: "bg-slate-100 text-slate-600",
    dot: "bg-slate-400",
  };

  return (
    <span
      className={`
        inline-flex items-center gap-2
        rounded-full px-3 py-1.5
        text-xs font-semibold
        ${statusInfo.className}
      `}
    >
      <span
        className={`
          h-2 w-2 rounded-full
          ${statusInfo.dot}
        `}
      />

      {statusInfo.label}
    </span>
  );
};

/* =========================================================
   Info Item
========================================================= */

const InfoItem = ({ label, value, full = false, icon, children }) => {
  return (
    <div className={full ? "md:col-span-2" : ""}>
      {/* Label */}

      <p className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-slate-500">
        {icon && <span className="text-slate-400">{icon}</span>}

        {label}
      </p>

      {/* Value */}

      <div
        className="
          flex min-h-[44px]
          items-center
          rounded-lg
          border border-slate-200
          bg-white
          px-4 py-2.5
          text-sm
          font-medium
          text-slate-700
        "
      >
        {children || value || "غير متوفر"}
      </div>
    </div>
  );
};

export default CustomerDetails;
