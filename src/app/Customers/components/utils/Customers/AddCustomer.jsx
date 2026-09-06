"use client";

import React, { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  FiUser,
  FiX,
  FiSave,
  FiPhone,
  FiMail,
  FiMapPin,
  FiGlobe,
  FiBriefcase,
  FiTag,
  FiMessageSquare,
  FiUserPlus,
  FiActivity,
} from "react-icons/fi";

import { userContext } from "../../../../../Providers/CustomerProvider/Customer.js";

const CustomerSchema = Yup.object().shape({
  fullName: Yup.string().required("الاسم الكامل مطلوب"),
  customerCode: Yup.string().required("كود العميل مطلوب"),
  companyName: Yup.string(),

  phoneNumber: Yup.string()
    .required("رقم الهاتف مطلوب")
    .matches(/^[0-9+\-\s()]+$/, "رقم هاتف غير صحيح"),

  phoneNumber2: Yup.string().matches(/^[0-9+\-\s()]*$/, "رقم هاتف غير صحيح"),

  email: Yup.string()
    .email("بريد إلكتروني غير صحيح")
    .required("البريد الإلكتروني مطلوب"),

  address: Yup.string().required("العنوان مطلوب"),
  city: Yup.string().required("المدينة مطلوبة"),
  country: Yup.string().required("الدولة مطلوبة"),
  status: Yup.number()
    .required("حالة العميل مطلوبة")
    .min(1, "يرجى اختيار حالة العميل"),
  customerCategoryId: Yup.number()
    .required("التصنيف مطلوب")
    .min(1, "يرجى اختيار تصنيف"),

  leadSource: Yup.string().required("مصدر العميل مطلوب"),
  notes: Yup.string(),
});

const AddCustomer = () => {
  const {
    handleAddCustomerSubmit,
    openAddCustomer,
    setOpenAddCustomer,
    customersCategories,
    loadding,
  } = useContext(userContext);

  const initialValues = {
    fullName: "",
    customerCode: "",
    companyName: "",
    phoneNumber: "",
    phoneNumber2: "",
    email: "",
    address: "",
    city: "",
    country: "",
    status: 0,
    customerCategoryId: 0,
    leadSource: "",
    notes: "",
  };

  return (
    <div
      dir="rtl"
      className="fixed inset-0 z-[999] flex items-center justify-center p-4"
    >
      {/* Overlay */}
      <div
        onClick={() => setOpenAddCustomer(false)}
        className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm"
      />

      {/* Modal */}
      <div className="relative flex w-full max-w-3xl max-h-[92vh] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
        {/* ================= HEADER ================= */}
        <div className="flex items-center justify-between px-6 py-5 bg-white border-b shrink-0 border-slate-100">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 text-blue-600 rounded-2xl bg-blue-50">
              <FiUserPlus size={22} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-800">
                إضافة عميل جديد
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                أضف بيانات العميل ومعلومات التواصل الخاصة به
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setOpenAddCustomer(false)}
            className="flex items-center justify-center transition h-9 w-9 rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* ================= FORM ================= */}
        <Formik
          initialValues={initialValues}
          validationSchema={CustomerSchema}
          onSubmit={handleAddCustomerSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className="flex flex-col flex-1 min-h-0">
              {/* ================= SCROLL AREA ================= */}
              <div className="flex-1 px-6 py-6 overflow-y-auto">
                <div className="space-y-7">
                  {/* ================= BASIC INFO ================= */}
                  <section>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-1 bg-blue-600 rounded-full h-7" />

                      <h3 className="text-sm font-bold text-slate-800">
                        البيانات الأساسية
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      {/* Full Name */}
                      <InputField
                        name="fullName"
                        label="الاسم الكامل"
                        placeholder="مثال: أحمد محمد"
                        icon={<FiUser />}
                        required
                        error={errors.fullName}
                        touched={touched.fullName}
                      />

                      {/* Customer Code */}
                      <InputField
                        name="customerCode"
                        label="كود العميل"
                        placeholder="مثال: CUS-001"
                        icon={<FiTag />}
                        required
                        error={errors.customerCode}
                        touched={touched.customerCode}
                      />

                      {/* Company */}
                      <InputField
                        name="companyName"
                        label="اسم الشركة"
                        placeholder="مثال: شركة النور للتجارة"
                        icon={<FiBriefcase />}
                      />

                      {/* Email */}
                      <InputField
                        name="email"
                        label="البريد الإلكتروني"
                        placeholder="example@email.com"
                        icon={<FiMail />}
                        type="email"
                        required
                        error={errors.email}
                        touched={touched.email}
                      />
                    </div>
                  </section>

                  {/* ================= CONTACT ================= */}
                  <section>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-1 rounded-full h-7 bg-emerald-500" />

                      <h3 className="text-sm font-bold text-slate-800">
                        معلومات التواصل
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <InputField
                        name="phoneNumber"
                        label="رقم الهاتف"
                        placeholder="01xxxxxxxxx"
                        icon={<FiPhone />}
                        required
                        error={errors.phoneNumber}
                        touched={touched.phoneNumber}
                      />

                      <InputField
                        name="phoneNumber2"
                        label="هاتف بديل"
                        placeholder="01xxxxxxxxx"
                        icon={<FiPhone />}
                        error={errors.phoneNumber2}
                        touched={touched.phoneNumber2}
                      />
                    </div>
                  </section>

                  {/* ================= ADDRESS ================= */}
                  <section>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-1 rounded-full h-7 bg-violet-500" />

                      <h3 className="text-sm font-bold text-slate-800">
                        بيانات العنوان
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <InputField
                        name="address"
                        label="العنوان"
                        placeholder="أدخل العنوان بالتفصيل"
                        icon={<FiMapPin />}
                        required
                        error={errors.address}
                        touched={touched.address}
                      />

                      <InputField
                        name="city"
                        label="المدينة"
                        placeholder="مثال: بني سويف"
                        icon={<FiMapPin />}
                        required
                        error={errors.city}
                        touched={touched.city}
                      />

                      {/* Country */}
                      <InputField
                        name="country"
                        label="الدولة"
                        placeholder="مثال: مصر"
                        icon={<FiGlobe />}
                        required
                        error={errors.country}
                        touched={touched.country}
                      />
                    </div>
                  </section>

                  {/* ================= CRM INFO ================= */}
                  <section>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-1 rounded-full h-7 bg-amber-500" />

                      <h3 className="text-sm font-bold text-slate-800">
                        بيانات العميل
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      {/* Status */}
                      <SelectField
                        name="status"
                        label="حالة العميل"
                        icon={<FiActivity />}
                        required
                        error={errors.status}
                        touched={touched.status}
                      >
                        <option value={0}>اختر حالة العميل</option>

                        <option value={1}>عميل محتمل</option>
                        <option value={2}>تم التواصل</option>
                        <option value={3}>مهتم</option>
                        <option value={4}>مؤهل</option>
                        <option value={5}>تفاوض</option>
                        <option value={6}>تم التعاقد</option>
                        <option value={7}>قيد التنفيذ</option>
                        <option value={8}>تم التسليم</option>
                        <option value={9}>مدفوع جزئيًا</option>
                        <option value={10}>مدفوع بالكامل</option>
                        <option value={11}>ملغي</option>
                      </SelectField>

                      {/* Category */}
                      <SelectField
                        name="customerCategoryId"
                        label="تصنيف العميل"
                        icon={<FiTag />}
                        required
                        error={errors.customerCategoryId}
                        touched={touched.customerCategoryId}
                      >
                        <option value={0}>اختر التصنيف</option>

                        {customersCategories?.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </SelectField>

                      {/* Lead Source */}
                      <SelectField
                        name="leadSource"
                        label="مصدر العميل"
                        icon={<FiBriefcase />}
                        required
                        error={errors.leadSource}
                        touched={touched.leadSource}
                      >
                        <option value="">اختر المصدر</option>
                        <option value="Website">الموقع الإلكتروني</option>
                        <option value="Referral">إحالة</option>
                        <option value="Social Media">وسائل التواصل</option>
                        <option value="Advertisement">إعلان</option>
                        <option value="Other">أخرى</option>
                      </SelectField>
                    </div>
                  </section>

                  {/* ================= NOTES ================= */}
                  <section>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-1 rounded-full h-7 bg-slate-400" />

                      <h3 className="text-sm font-bold text-slate-800">
                        ملاحظات إضافية
                      </h3>
                    </div>

                    <div className="relative">
                      <FiMessageSquare className="absolute right-4 top-4 text-slate-400" />

                      <Field
                        as="textarea"
                        name="notes"
                        rows={4}
                        placeholder="اكتب أي ملاحظات إضافية عن العميل..."
                        className="w-full px-4 py-3 text-sm transition border outline-none resize-none rounded-xl border-slate-200 bg-slate-50 pr-11 text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                      />
                    </div>
                  </section>
                </div>
              </div>

              {/* ================= FOOTER ================= */}
              <div className="px-6 py-4 bg-white border-t shrink-0 border-slate-100">
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setOpenAddCustomer(false)}
                    className="flex items-center justify-center flex-1 text-sm font-semibold transition bg-white border h-11 rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50"
                  >
                    إلغاء
                  </button>

                  <button
                    type="submit"
                    className="flex items-center justify-center flex-1 gap-2 text-sm font-semibold text-white transition bg-blue-600 shadow-lg h-11 rounded-xl shadow-blue-600/20 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <FiSave size={17} />

                    {loadding ? "جاري الإضافة..." : "إضافة العميل"}
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

/* ========================================================= */
/* Input Component */
/* ========================================================= */

const InputField = ({
  name,
  label,
  placeholder,
  icon,
  type = "text",
  required = false,
  error,
  touched,
}) => {
  const hasError = error && touched;

  return (
    <div>
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-semibold text-slate-700"
      >
        {label}

        {required && <span className="mr-1 text-red-500">*</span>}
      </label>

      <div className="relative">
        <span
          className={`absolute right-4 top-1/2 -translate-y-1/2 ${
            hasError ? "text-red-400" : "text-slate-400"
          }`}
        >
          {icon}
        </span>

        <Field
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          className={`h-12 w-full rounded-xl border bg-slate-50 px-4 pr-11 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 ${
            hasError
              ? "border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
              : "border-slate-200 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
          }`}
        />
      </div>

      <ErrorMessage
        name={name}
        component="p"
        className="mt-1.5 text-xs font-medium text-red-500"
      />
    </div>
  );
};

/* ========================================================= */
/* Select Component */
/* ========================================================= */

const SelectField = ({
  name,
  label,
  icon,
  children,
  required = false,
  error,
  touched,
}) => {
  const hasError = error && touched;

  return (
    <div>
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-semibold text-slate-700"
      >
        {label}

        {required && <span className="mr-1 text-red-500">*</span>}
      </label>

      <div className="relative">
        <span
          className={`pointer-events-none absolute right-4 top-1/2 z-10 -translate-y-1/2 ${
            hasError ? "text-red-400" : "text-slate-400"
          }`}
        >
          {icon}
        </span>

        <Field
          as="select"
          id={name}
          name={name}
          className={`h-12 w-full cursor-pointer appearance-none rounded-xl border bg-slate-50 px-4 pr-11 text-sm text-slate-800 outline-none transition ${
            hasError
              ? "border-red-400"
              : "border-slate-200 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
          }`}
        >
          {children}
        </Field>
      </div>

      <ErrorMessage
        name={name}
        component="p"
        className="mt-1.5 text-xs font-medium text-red-500"
      />
    </div>
  );
};

export default AddCustomer;
