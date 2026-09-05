"use client";

import React, { useContext } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import {
  FiX,
  FiUser,
  FiPhone,
  FiMail,
  FiMapPin,
  FiBriefcase,
  FiTag,
  FiFileText,
  FiSave,
} from "react-icons/fi";

import { userContext } from "../../../../../Providers/CustomerProvider/Customer.js";

const EditCustomer = ({ selectedCustomer }) => {
  const {
    handleEditCustomerSubmit,
    openEditCustomer,
    setOpenEditCustomer,
    customersCategories,
    loadding,
  } = useContext(userContext);

  if (!openEditCustomer || !selectedCustomer) return null;

  // =========================
  // Customer Status Map
  // =========================
  const statusMap = {
    1: {
      label: "عميل محتمل",
      className: "bg-slate-100 text-slate-700",
    },
    2: {
      label: "تم التواصل",
      className: "bg-blue-100 text-blue-700",
    },
    3: {
      label: "مهتم",
      className: "bg-cyan-100 text-cyan-700",
    },
    4: {
      label: "مؤهل",
      className: "bg-indigo-100 text-indigo-700",
    },
    5: {
      label: "تفاوض",
      className: "bg-purple-100 text-purple-700",
    },
    6: {
      label: "تم التعاقد",
      className: "bg-green-100 text-green-700",
    },
    7: {
      label: "قيد التنفيذ",
      className: "bg-yellow-100 text-yellow-700",
    },
    8: {
      label: "تم التسليم",
      className: "bg-emerald-100 text-emerald-700",
    },
    9: {
      label: "مدفوع جزئيًا",
      className: "bg-orange-100 text-orange-700",
    },
    10: {
      label: "مدفوع بالكامل",
      className: "bg-green-100 text-green-700",
    },
    11: {
      label: "ملغي",
      className: "bg-red-100 text-red-700",
    },
  };

  // =========================
  // Validation
  // =========================
  const validationSchema = Yup.object({
    fullName: Yup.string()
      .required("اسم العميل مطلوب")
      .min(2, "اسم العميل قصير جدًا"),

    customerCode: Yup.string().required("كود العميل مطلوب"),

    companyName: Yup.string().required("اسم الشركة مطلوب"),

    phoneNumber: Yup.string().required("رقم الهاتف مطلوب"),

    phoneNumber2: Yup.string(),

    email: Yup.string()
      .email("البريد الإلكتروني غير صحيح")
      .required("البريد الإلكتروني مطلوب"),

    address: Yup.string().required("العنوان مطلوب"),

    city: Yup.string().required("المدينة مطلوبة"),

    country: Yup.string().required("الدولة مطلوبة"),

    customerCategoryId: Yup.number()
      .required("التصنيف مطلوب")
      .min(1, "يرجى اختيار تصنيف"),

    status: Yup.number()
      .required("حالة العميل مطلوبة")
      .min(1, "يرجى اختيار حالة العميل"),

    leadSource: Yup.string().required("مصدر العميل مطلوب"),

    notes: Yup.string(),
  });

  // =========================
  // Initial Values
  // =========================
  const initialValues = {
    fullName: selectedCustomer.fullName || "",

    customerCode: selectedCustomer.customerCode || "",

    companyName: selectedCustomer.companyName || "",

    phoneNumber: selectedCustomer.phoneNumber || "",

    phoneNumber2: selectedCustomer.phoneNumber2 || "",

    email: selectedCustomer.email || "",

    address: selectedCustomer.address || "",

    city: selectedCustomer.city || "",

    country: selectedCustomer.country || "",

    customerCategoryId: Number(selectedCustomer.customerCategoryId) || 0,

    status: Number(selectedCustomer.status) || 0,

    leadSource: selectedCustomer.leadSource || "",

    notes: selectedCustomer.notes || "",
  };

  // =========================
  // Submit
  // =========================

  return (
    <div
      dir="rtl"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
    >
      <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl">
        {/* ================= HEADER ================= */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-white border-b">
          <div>
            <h2 className="text-xl font-bold text-slate-800">
              تعديل بيانات العميل
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              تعديل بيانات العميل {selectedCustomer.fullName}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setOpenEditCustomer(false)}
            className="flex items-center justify-center w-10 h-10 transition rounded-xl text-slate-500 hover:bg-red-50 hover:text-red-500"
          >
            <FiX size={22} />
          </button>
        </div>

        {/* ================= FORM ================= */}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            handleEditCustomerSubmit({ id: selectedCustomer?.id, values });
          }}
          enableReinitialize
        >
          {({
            errors,
            touched,
            isSubmitting,
            values,
            handleChange,
            handleBlur,
          }) => (
            <Form className="p-6 space-y-6">
              {/* ================= BASIC INFO ================= */}
              <div className="p-5 border rounded-2xl border-slate-200">
                <div className="flex items-center gap-3 mb-5">
                  <div className="flex items-center justify-center w-10 h-10 text-blue-600 rounded-xl bg-blue-50">
                    <FiUser size={20} />
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-800">
                      البيانات الأساسية
                    </h3>

                    <p className="text-xs text-slate-500">
                      البيانات الأساسية للعميل
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {/* Full Name */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-slate-700">
                      اسم العميل
                    </label>

                    <Field
                      name="fullName"
                      type="text"
                      placeholder="أدخل اسم العميل"
                      className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition ${
                        errors.fullName && touched.fullName
                          ? "border-red-500 focus:ring-2 focus:ring-red-100"
                          : "border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      }`}
                    />

                    {errors.fullName && touched.fullName && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  {/* Customer Code */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-slate-700">
                      كود العميل
                    </label>

                    <Field
                      name="customerCode"
                      type="text"
                      placeholder="أدخل كود العميل"
                      className="w-full px-4 py-3 text-sm transition border outline-none rounded-xl border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />

                    {errors.customerCode && touched.customerCode && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.customerCode}
                      </p>
                    )}
                  </div>

                  {/* Company */}
                  <div className="md:col-span-2">
                    <label className="block mb-2 text-sm font-medium text-slate-700">
                      اسم الشركة
                    </label>

                    <div className="relative">
                      <FiBriefcase
                        className="absolute -translate-y-1/2 right-4 top-1/2 text-slate-400"
                        size={18}
                      />

                      <Field
                        name="companyName"
                        type="text"
                        placeholder="أدخل اسم الشركة"
                        className="w-full py-3 pr-10 text-sm transition border outline-none rounded-xl border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      />
                    </div>

                    {errors.companyName && touched.companyName && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.companyName}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* ================= CONTACT ================= */}
              <div className="p-5 border rounded-2xl border-slate-200">
                <div className="flex items-center gap-3 mb-5">
                  <div className="flex items-center justify-center w-10 h-10 text-green-600 rounded-xl bg-green-50">
                    <FiPhone size={20} />
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-800">بيانات التواصل</h3>

                    <p className="text-xs text-slate-500">
                      أرقام الهاتف والبريد الإلكتروني
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {/* Phone */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-slate-700">
                      رقم الهاتف
                    </label>

                    <Field
                      name="phoneNumber"
                      type="text"
                      placeholder="01xxxxxxxxx"
                      className="w-full px-4 py-3 text-sm transition border outline-none rounded-xl border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />

                    {errors.phoneNumber && touched.phoneNumber && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.phoneNumber}
                      </p>
                    )}
                  </div>

                  {/* Phone 2 */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-slate-700">
                      رقم هاتف إضافي
                    </label>

                    <Field
                      name="phoneNumber2"
                      type="text"
                      placeholder="رقم إضافي"
                      className="w-full px-4 py-3 text-sm transition border outline-none rounded-xl border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  {/* Email */}
                  <div className="md:col-span-2">
                    <label className="block mb-2 text-sm font-medium text-slate-700">
                      البريد الإلكتروني
                    </label>

                    <div className="relative">
                      <FiMail
                        className="absolute -translate-y-1/2 right-4 top-1/2 text-slate-400"
                        size={18}
                      />

                      <Field
                        name="email"
                        type="email"
                        placeholder="example@email.com"
                        className="w-full py-3 text-sm transition border outline-none pr-11 rounded-xl border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      />
                    </div>

                    {errors.email && touched.email && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* ================= ADDRESS ================= */}
              <div className="p-5 border rounded-2xl border-slate-200">
                <div className="flex items-center gap-3 mb-5">
                  <div className="flex items-center justify-center w-10 h-10 text-purple-600 rounded-xl bg-purple-50">
                    <FiMapPin size={20} />
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-800">العنوان</h3>

                    <p className="text-xs text-slate-500">
                      بيانات عنوان العميل
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {/* Address */}
                  <div className="md:col-span-2">
                    <label className="block mb-2 text-sm font-medium text-slate-700">
                      العنوان
                    </label>

                    <Field
                      name="address"
                      type="text"
                      placeholder="أدخل العنوان"
                      className="w-full px-4 py-3 text-sm transition border outline-none rounded-xl border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />

                    {errors.address && touched.address && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.address}
                      </p>
                    )}
                  </div>

                  {/* City */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-slate-700">
                      المدينة
                    </label>

                    <Field
                      name="city"
                      type="text"
                      placeholder="أدخل المدينة"
                      className="w-full px-4 py-3 text-sm transition border outline-none rounded-xl border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />

                    {errors.city && touched.city && (
                      <p className="mt-1 text-xs text-red-500">{errors.city}</p>
                    )}
                  </div>

                  {/* Country */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-slate-700">
                      الدولة
                    </label>

                    <Field
                      name="country"
                      type="text"
                      placeholder="أدخل الدولة"
                      className="w-full px-4 py-3 text-sm transition border outline-none rounded-xl border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />

                    {errors.country && touched.country && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.country}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* ================= CRM INFO ================= */}
              <div className="p-5 border rounded-2xl border-slate-200">
                <div className="flex items-center gap-3 mb-5">
                  <div className="flex items-center justify-center w-10 h-10 text-orange-600 rounded-xl bg-orange-50">
                    <FiTag size={20} />
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-800">بيانات CRM</h3>

                    <p className="text-xs text-slate-500">
                      تصنيف وحالة ومصدر العميل
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  {/* Category */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-slate-700">
                      تصنيف العميل
                    </label>

                    <select
                      name="customerCategoryId"
                      value={values.customerCategoryId}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none transition ${
                        errors.customerCategoryId && touched.customerCategoryId
                          ? "border-red-500"
                          : "border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      }`}
                    >
                      <option value={0}>اختر تصنيف العميل</option>

                      {customersCategories?.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>

                    {errors.customerCategoryId &&
                      touched.customerCategoryId && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.customerCategoryId}
                        </p>
                      )}
                  </div>

                  {/* Status */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-slate-700">
                      حالة العميل
                    </label>

                    <select
                      name="status"
                      value={values.status}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none transition ${
                        errors.status && touched.status
                          ? "border-red-500"
                          : "border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      }`}
                    >
                      <option value={0}>اختر حالة العميل</option>

                      {Object.entries(statusMap).map(([value, status]) => (
                        <option key={value} value={value}>
                          {status.label}
                        </option>
                      ))}
                    </select>

                    {errors.status && touched.status && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.status}
                      </p>
                    )}
                  </div>

                  {/* Lead Source */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-slate-700">
                      مصدر العميل
                    </label>

                    <select
                      name="leadSource"
                      value={values.leadSource}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none transition ${
                        errors.leadSource && touched.leadSource
                          ? "border-red-500"
                          : "border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      }`}
                    >
                      <option value="">اختر مصدر العميل</option>

                      <option value="Website">الموقع الإلكتروني</option>

                      <option value="Referral">إحالة</option>

                      <option value="Social Media">وسائل التواصل</option>

                      <option value="Advertisement">إعلان</option>

                      <option value="Other">أخرى</option>
                    </select>

                    {errors.leadSource && touched.leadSource && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.leadSource}
                      </p>
                    )}
                  </div>
                </div>

                {/* Current Status Preview */}
                {values.status > 0 && statusMap[Number(values.status)] && (
                  <div className="flex items-center gap-2 mt-4">
                    <span className="text-sm text-slate-500">
                      الحالة الحالية:
                    </span>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        statusMap[Number(values.status)].className
                      }`}
                    >
                      {statusMap[Number(values.status)].label}
                    </span>
                  </div>
                )}
              </div>

              {/* ================= NOTES ================= */}
              <div className="p-5 border rounded-2xl border-slate-200">
                <div className="flex items-center gap-3 mb-5">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-slate-100 text-slate-600">
                    <FiFileText size={20} />
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-800">ملاحظات</h3>

                    <p className="text-xs text-slate-500">
                      أضف أي ملاحظات خاصة بالعميل
                    </p>
                  </div>
                </div>

                <Field
                  as="textarea"
                  name="notes"
                  rows="4"
                  placeholder="اكتب ملاحظات عن العميل..."
                  className="w-full px-4 py-3 text-sm transition border outline-none resize-none rounded-xl border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* ================= ACTIONS ================= */}
              <div className="flex flex-col-reverse gap-3 pt-5 border-t sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setOpenEditCustomer(false)}
                  className="px-6 py-3 text-sm font-medium transition border rounded-xl border-slate-200 text-slate-700 hover:bg-slate-50"
                >
                  إلغاء
                </button>

                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-white transition bg-blue-600 rounded-xl hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <FiSave size={18} />

                  {loadding ? "جاري الحفظ..." : "حفظ التعديلات"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EditCustomer;
