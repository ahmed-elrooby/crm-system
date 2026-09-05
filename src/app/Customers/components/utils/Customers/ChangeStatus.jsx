"use client";

import React, { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import {
  FiX,
  FiRefreshCw,
  FiCheckCircle,
  FiUser,
  FiAlertCircle,
} from "react-icons/fi";

import { userContext } from "../../../../../Providers/CustomerProvider/Customer.js";

/* =========================
   Status List
========================= */

const STATUS_LIST = [
  {
    value: 1,
    label: "عميل محتمل",
    apiValue: "New",
  },
  {
    value: 2,
    label: "تم التواصل",
    apiValue: "Contacted",
  },
  {
    value: 3,
    label: "مهتم",
    apiValue: "Interested",
  },
  {
    value: 4,
    label: "مؤهل",
    apiValue: "Qualified",
  },
  {
    value: 5,
    label: "تفاوض",
    apiValue: "Negotiating",
  },
  {
    value: 6,
    label: "تم التعاقد",
    apiValue: "Contracted",
  },
  {
    value: 7,
    label: "قيد التنفيذ",
    apiValue: "InProgress",
  },
  {
    value: 8,
    label: "تم التسليم",
    apiValue: "Delivered",
  },
  {
    value: 9,
    label: "مدفوع جزئيًا",
    apiValue: "PartiallyPaid",
  },
  {
    value: 10,
    label: "مدفوع بالكامل",
    apiValue: "Paid",
  },
  {
    value: 11,
    label: "ملغي",
    apiValue: "Cancelled",
  },
];

/* =========================
   Convert API Status
   To Select Value
========================= */

const getStatusValue = (status) => {
  if (status === null || status === undefined || status === "") {
    return "";
  }

  /*
    لو الـ API بيرجع رقم:
    1 / 2 / 3 ...
  */

  const numericStatus = Number(status);

  if (
    !Number.isNaN(numericStatus) &&
    STATUS_LIST.some((item) => item.value === numericStatus)
  ) {
    return String(numericStatus);
  }

  /*
    لو الـ API بيرجع String:
    PartiallyPaid
    Paid
    New
    ...
  */

  const statusItem = STATUS_LIST.find((item) => item.apiValue === status);

  return statusItem ? String(statusItem.value) : "";
};

/* =========================
   Component
========================= */

const ChangeStatus = ({ selectedCustomer }) => {
  const { setOpenChangeStatus, handleChangeStatusSubmit, loadding } =
    useContext(userContext);

  /* =========================
     Validation
  ========================= */

  const validationSchema = Yup.object({
    status: Yup.string().required("من فضلك اختر حالة العميل"),
  });

  /* =========================
     Current Status
  ========================= */

  const currentStatusValue = getStatusValue(selectedCustomer?.status);

  return (
    <div
      className="
        fixed
        inset-0
        z-[100]
        flex
        items-center
        justify-center
        p-4
        bg-black/50
        backdrop-blur-sm
      "
      onClick={() => setOpenChangeStatus(false)}
    >
      <div
        className="w-full max-w-lg overflow-hidden bg-white shadow-2xl  rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ================= Header ================= */}

        <div className="relative px-6 py-5 border-b border-slate-100">
          {/* Close */}

          <button
            type="button"
            onClick={() => setOpenChangeStatus(false)}
            className="absolute flex items-center justify-center transition rounded-lg  top-4 left-4 w-9 h-9 text-slate-400 hover:bg-slate-100 hover:text-slate-700 disabled:opacity-50"
          >
            <FiX size={20} />
          </button>

          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center text-blue-600  w-11 h-11 rounded-xl bg-blue-50">
              <FiRefreshCw size={22} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-800">
                تغيير حالة العميل
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                قم باختيار المرحلة الجديدة للعميل
              </p>
            </div>
          </div>
        </div>

        {/* ================= Customer ================= */}

        <div className="px-6 pt-5">
          <div className="flex items-center gap-3 p-4 border  rounded-xl bg-slate-50 border-slate-200">
            {/* Avatar */}

            <div className="flex items-center justify-center font-bold text-blue-600 bg-blue-100  w-11 h-11 rounded-xl shrink-0">
              {selectedCustomer?.fullName?.charAt(0)?.toUpperCase() || "؟"}
            </div>

            {/* Customer Info */}

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <FiUser size={14} className="text-slate-400" />

                <p className="font-bold truncate text-slate-800">
                  {selectedCustomer?.fullName || "عميل"}
                </p>
              </div>

              <p className="mt-1 text-xs text-slate-400">
                {selectedCustomer?.customerCode || "-"}
              </p>
            </div>
          </div>
        </div>

        {/* ================= Form ================= */}

        <Formik
          enableReinitialize
          initialValues={{
            status: currentStatusValue,
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            const statusValue = Number(values.status);

            handleChangeStatusSubmit({
              id: selectedCustomer?.id,

              values: {
                status: statusValue,
              },
            });
          }}
        >
          {({ values }) => {
            const selectedStatus = STATUS_LIST.find(
              (item) => String(item.value) === String(values.status),
            );

            return (
              <Form className="p-6">
                {/* Label */}

                <label
                  htmlFor="status"
                  className="block mb-2 text-sm font-semibold  text-slate-700"
                >
                  حالة العميل الجديدة
                </label>

                {/* Select */}

                <div className="relative">
                  <Field
                    as="select"
                    id="status"
                    name="status"
                    disabled={loadding}
                    className="w-full h-12 px-4 text-sm transition bg-white border outline-none  rounded-xl border-slate-200 text-slate-700 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 disabled:bg-slate-50 disabled:cursor-not-allowed"
                  >
                    <option value="">اختر حالة العميل</option>

                    {STATUS_LIST.map((status) => (
                      <option key={status.value} value={status.value}>
                        {status.label}
                      </option>
                    ))}
                  </Field>
                </div>

                {/* Error */}

                <ErrorMessage name="status">
                  {(message) => (
                    <div
                      className="
                        flex
                        items-center
                        gap-1.5
                        mt-2
                        text-xs
                        text-red-500
                      "
                    >
                      <FiAlertCircle size={14} />

                      <span>{message}</span>
                    </div>
                  )}
                </ErrorMessage>

                {/* ================= Current Status ================= */}

                {currentStatusValue && (
                  <div className="flex items-center gap-2 p-3 mt-4 border  text-slate-600 border-slate-200 rounded-xl bg-slate-50">
                    <FiRefreshCw size={16} />

                    <span className="text-sm">الحالة الحالية:</span>

                    <strong className="text-slate-800">
                      {
                        STATUS_LIST.find(
                          (item) =>
                            String(item.value) === String(currentStatusValue),
                        )?.label
                      }
                    </strong>
                  </div>
                )}

                {/* ================= Selected Status ================= */}

                {values.status && values.status !== currentStatusValue && (
                  <div className="flex items-center gap-2 p-3 mt-3 text-blue-700 border border-blue-100  rounded-xl bg-blue-50">
                    <FiCheckCircle size={17} />

                    <span className="text-sm font-medium">
                      سيتم تغيير حالة العميل إلى:
                      <strong className="mr-1">{selectedStatus?.label}</strong>
                    </span>
                  </div>
                )}

                {/* ================= Same Status ================= */}

                {values.status && values.status === currentStatusValue && (
                  <div className="flex items-center gap-2 p-3 mt-3 border  text-amber-700 border-amber-100 rounded-xl bg-amber-50">
                    <FiAlertCircle size={17} />

                    <span className="text-sm">
                      هذه هي الحالة الحالية للعميل بالفعل.
                    </span>
                  </div>
                )}

                {/* ================= Actions ================= */}

                <div className="flex items-center gap-3 mt-6">
                  {/* Cancel */}

                  <button
                    type="button"
                    disabled={loadding}
                    onClick={() => setOpenChangeStatus(false)}
                    className="flex-1 text-sm font-semibold transition bg-white border  h-11 rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    إلغاء
                  </button>

                  {/* Submit */}

                  <button
                    type="submit"
                    disabled={
                      loadding ||
                      !values.status ||
                      values.status === currentStatusValue
                    }
                    className="flex items-center justify-center flex-1 gap-2 text-sm font-semibold text-white transition bg-blue-600  h-11 rounded-xl hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loadding ? (
                      <>
                        <span className="w-4 h-4 border-2 rounded-full  border-white/30 border-t-white animate-spin" />
                        جاري التحديث...
                      </>
                    ) : (
                      <>
                        <FiRefreshCw size={17} />
                        تحديث الحالة
                      </>
                    )}
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default ChangeStatus;
