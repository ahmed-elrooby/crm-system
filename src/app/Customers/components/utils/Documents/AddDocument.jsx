"use client";

import React, { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import {
  FiX,
  FiUploadCloud,
  FiUser,
  FiFolder,
  FiFileText,
  FiMessageSquare,
  FiSave,
  FiLoader,
} from "react-icons/fi";

import { userContext } from "../../../../../Providers/CustomerProvider/Customer.js";

const AddDocument = () => {
  const {
    openAddDocument,
    customers,
    setOpenAddDocument,
    handleAddDocumentSubmit,
    filesCategories,
    loadding,
  } = useContext(userContext);

  const validationSchema = Yup.object({
    customerId: Yup.number()
      .required("العميل مطلوب")
      .positive("اختر عميل صحيح"),

    file: Yup.mixed()
      .required("الملف مطلوب")
      .test("fileSize", "حجم الملف يجب ألا يتجاوز 10 ميجابايت", (value) => {
        if (!value) return true;
        return value.size <= 10 * 1024 * 1024;
      }),

    documentType: Yup.string()
      .trim()
      .max(100, "نوع المستند لا يمكن أن يتجاوز 100 حرف"),

    notes: Yup.string().trim().max(500, "الملاحظات لا يمكن أن تتجاوز 500 حرف"),

    fileCategoryId: Yup.number().nullable().positive("اختر تصنيف صحيح"),
  });

  if (!openAddDocument) return null;

  return (
    <div
      dir="rtl"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm"
    >
      <div className="relative flex flex-col w-full max-w-2xl max-h-[90vh] overflow-hidden bg-white shadow-2xl rounded-3xl">
        {/* ================= HEADER ================= */}
        <div className="flex items-center justify-between flex-shrink-0 px-6 py-5 bg-white border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-blue-50">
              <FiFileText className="w-5 h-5 text-blue-600" />
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-800">
                إضافة مستند جديد
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                قم بإضافة مستند وربطه بأحد العملاء
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setOpenAddDocument(false)}
            className="flex items-center justify-center transition-all w-9 h-9 rounded-xl text-slate-400 hover:bg-red-50 hover:text-red-500"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* ================= FORMIK ================= */}
        <Formik
          initialValues={{
            customerId: "",
            file: null,
            documentType: "",
            notes: "",
            fileCategoryId: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            handleAddDocumentSubmit(values);
          }}
        >
          {({ setFieldValue, values, errors, touched }) => (
            <Form className="flex flex-col flex-1 min-h-0">
              {/* ================= BODY ================= */}
              <div className="flex-1 min-h-0 p-6 space-y-5 overflow-y-auto">
                {/* Customer */}
                <div>
                  <label className="flex items-center gap-2 mb-2 text-sm font-semibold text-slate-700">
                    <FiUser className="w-4 h-4 text-blue-500" />
                    العميل
                    <span className="text-red-500">*</span>
                  </label>

                  <Field
                    as="select"
                    name="customerId"
                    className={`w-full px-4 py-3 text-sm transition-all bg-white border rounded-xl outline-none ${
                      errors.customerId && touched.customerId
                        ? "border-red-400 focus:ring-2 focus:ring-red-100"
                        : "border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    }`}
                  >
                    <option value="">اختر العميل</option>

                    {customers?.map((customer) => (
                      <option key={customer.id} value={customer.id}>
                        {customer.fullName ||
                          customer.name ||
                          customer.companyName ||
                          `العميل #${customer.id}`}
                      </option>
                    ))}
                  </Field>

                  <ErrorMessage
                    name="customerId"
                    component="p"
                    className="mt-1.5 text-xs text-red-500"
                  />
                </div>

                {/* File Upload */}
                <div>
                  <label className="flex items-center gap-2 mb-2 text-sm font-semibold text-slate-700">
                    <FiUploadCloud className="w-4 h-4 text-blue-500" />
                    الملف
                    <span className="text-red-500">*</span>
                  </label>

                  <label
                    className={`flex flex-col items-center justify-center w-full p-6 transition-all border-2 border-dashed cursor-pointer rounded-2xl ${
                      errors.file && touched.file
                        ? "border-red-400 bg-red-50/30"
                        : "border-slate-300 bg-slate-50 hover:border-blue-400 hover:bg-blue-50/30"
                    }`}
                  >
                    <FiUploadCloud className="w-8 h-8 mb-2 text-slate-400" />

                    <span className="text-sm font-semibold text-slate-700">
                      {values.file ? values.file.name : "اضغط لاختيار الملف"}
                    </span>

                    <span className="mt-1 text-xs text-slate-400">
                      الحد الأقصى لحجم الملف 10 ميجابايت
                    </span>

                    <input
                      type="file"
                      name="file"
                      className="hidden"
                      onChange={(event) => {
                        const file = event.currentTarget.files?.[0] || null;
                        setFieldValue("file", file);
                      }}
                    />
                  </label>

                  <ErrorMessage
                    name="file"
                    component="p"
                    className="mt-1.5 text-xs text-red-500"
                  />
                </div>

                {/* File Category */}
                <div>
                  <label className="flex items-center gap-2 mb-2 text-sm font-semibold text-slate-700">
                    <FiFolder className="w-4 h-4 text-blue-500" />
                    تصنيف الملف
                  </label>

                  <Field
                    as="select"
                    name="fileCategoryId"
                    className={`w-full px-4 py-3 text-sm transition-all bg-white border rounded-xl outline-none ${
                      errors.fileCategoryId && touched.fileCategoryId
                        ? "border-red-400 focus:ring-2 focus:ring-red-100"
                        : "border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    }`}
                  >
                    <option value="">اختر تصنيف الملف</option>

                    {filesCategories?.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </Field>

                  <ErrorMessage
                    name="fileCategoryId"
                    component="p"
                    className="mt-1.5 text-xs text-red-500"
                  />
                </div>

                {/* Document Type */}
                <div>
                  <label className="flex items-center gap-2 mb-2 text-sm font-semibold text-slate-700">
                    <FiFileText className="w-4 h-4 text-blue-500" />
                    نوع المستند
                  </label>

                  <Field
                    type="text"
                    name="documentType"
                    placeholder="مثال: عقد، فاتورة، بطاقة شخصية..."
                    className={`w-full px-4 py-3 text-sm transition-all border rounded-xl outline-none ${
                      errors.documentType && touched.documentType
                        ? "border-red-400 focus:ring-2 focus:ring-red-100"
                        : "border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    }`}
                  />

                  <ErrorMessage
                    name="documentType"
                    component="p"
                    className="mt-1.5 text-xs text-red-500"
                  />
                </div>

                {/* Notes */}
                <div>
                  <label className="flex items-center gap-2 mb-2 text-sm font-semibold text-slate-700">
                    <FiMessageSquare className="w-4 h-4 text-blue-500" />
                    ملاحظات
                  </label>

                  <Field
                    as="textarea"
                    name="notes"
                    rows="4"
                    placeholder="اكتب أي ملاحظات خاصة بالمستند..."
                    className={`w-full px-4 py-3 text-sm transition-all border rounded-xl outline-none resize-none ${
                      errors.notes && touched.notes
                        ? "border-red-400 focus:ring-2 focus:ring-red-100"
                        : "border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    }`}
                  />

                  <ErrorMessage
                    name="notes"
                    component="p"
                    className="mt-1.5 text-xs text-red-500"
                  />
                </div>
              </div>

              {/* ================= FOOTER ================= */}
              <div className="flex items-center justify-end flex-shrink-0 gap-3 px-6 py-4 border-t border-slate-200 bg-slate-50/70">
                <button
                  type="button"
                  onClick={() => setOpenAddDocument(false)}
                  className="px-5 py-2.5 text-sm font-semibold transition-all bg-white border rounded-xl border-slate-200 text-slate-600 hover:bg-slate-100"
                >
                  إلغاء
                </button>

                <button
                  type="submit"
                  disabled={loadding}
                  className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white transition-all bg-blue-600 rounded-xl hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loadding ? (
                    <>
                      <FiLoader className="w-4 h-4 animate-spin" />
                      جاري الحفظ...
                    </>
                  ) : (
                    <>
                      <FiSave className="w-4 h-4" />
                      حفظ المستند
                    </>
                  )}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddDocument;
