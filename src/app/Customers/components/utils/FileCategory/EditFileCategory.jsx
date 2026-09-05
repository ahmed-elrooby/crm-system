"use client";

import React, { useContext, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  FiX,
  FiFolder,
  FiCheckCircle,
  FiAlertCircle,
  FiSave,
  FiLoader,
} from "react-icons/fi";

import { userContext } from "../../../../../Providers/CustomerProvider/Customer.js";

const EditFileCategory = ({ selectedFileCategoy }) => {
  const {
    openEditFileCategory,
    setOpenEditFileCategory,
    handleEditFileCategorySubmit,
    loadding,
  } = useContext(userContext);

  // =========================
  // Validation
  // =========================
  const validationSchema = Yup.object({
    name: Yup.string()
      .trim()
      .required("اسم التصنيف مطلوب")
      .min(2, "اسم التصنيف يجب أن يكون حرفين على الأقل")
      .max(100, "اسم التصنيف لا يمكن أن يتجاوز 100 حرف"),

    nameEn: Yup.string()
      .trim()
      .required("الاسم بالإنجليزية مطلوب")
      .min(2, "الاسم يجب أن يكون حرفين على الأقل")
      .max(100, "الاسم لا يمكن أن يتجاوز 100 حرف"),

    description: Yup.string()
      .trim()
      .max(500, "الوصف لا يمكن أن يتجاوز 500 حرف"),

    isActive: Yup.boolean(),
  });
  const initialValues = {
    name: selectedFileCategoy?.name || "",
    nameEn: selectedFileCategoy?.nameEn || "",
    description: selectedFileCategoy?.description || "",
    isActive: selectedFileCategoy?.isActive ?? true,
  };
  // لو الـ selected category اتغير والمودال مفتوح
  useEffect(() => {
    if (!selectedFileCategoy) return;
  }, [selectedFileCategoy]);

  if (!openEditFileCategory || !selectedFileCategoy) {
    return null;
  }

  return (
    <>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
        {/* Modal */}
        <div className="relative flex flex-col w-full max-w-2xl max-h-[90vh] overflow-hidden bg-white shadow-2xl rounded-3xl">
          {/* ================= Header ثابت ================= */}
          <div className="flex items-center justify-between flex-shrink-0 px-6 py-5 bg-white border-b border-slate-200">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-blue-50">
                <FiFolder className="w-5 h-5 text-blue-600" />
              </div>

              <div>
                <h2 className="text-lg font-bold text-slate-800">
                  تعديل تصنيف الملف
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  قم بتعديل بيانات تصنيف الملف
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setOpenEditFileCategory(false)}
              className="flex items-center justify-center transition-all w-9 h-9 rounded-xl text-slate-400 hover:bg-red-50 hover:text-red-500"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>

          {/* ================= Body Scroll ================= */}
          <div className="flex-1 min-h-0 overflow-y-auto">
            <Formik
              enableReinitialize
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                handleEditFileCategorySubmit({
                  id: selectedFileCategoy.id,
                  values,
                });
              }}
            >
              {({ errors, touched, values }) => (
                <Form>
                  <div className="p-6 space-y-5">
                    {/* Name */}
                    <div>
                      <label className="block mb-2 text-sm font-semibold text-slate-700">
                        اسم التصنيف
                        <span className="mr-1 text-red-500">*</span>
                      </label>

                      <Field
                        name="name"
                        type="text"
                        placeholder="مثال: عقد، فاتورة، بطاقة شخصية..."
                        className={`w-full h-12 px-4 text-sm transition-all bg-white border rounded-xl outline-none text-slate-700 placeholder:text-slate-400 ${
                          errors.name && touched.name
                            ? "border-red-400 focus:ring-4 focus:ring-red-500/10"
                            : "border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                        }`}
                      />

                      <ErrorMessage
                        name="name"
                        component="div"
                        className="mt-1.5 text-xs font-medium text-red-500"
                      />
                    </div>

                    {/* Name En */}
                    <div>
                      <label className="block mb-2 text-sm font-semibold text-slate-700">
                        اسم التصنيف بالإنجليزية
                        <span className="mr-1 text-red-500">*</span>
                      </label>

                      <Field
                        name="nameEn"
                        type="text"
                        dir="ltr"
                        placeholder="Example: Contract"
                        className={`w-full h-12 px-4 text-sm transition-all bg-white border rounded-xl outline-none text-slate-700 placeholder:text-slate-400 ${
                          errors.nameEn && touched.nameEn
                            ? "border-red-400 focus:ring-4 focus:ring-red-500/10"
                            : "border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                        }`}
                      />

                      <ErrorMessage
                        name="nameEn"
                        component="div"
                        className="mt-1.5 text-xs font-medium text-red-500"
                      />
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block mb-2 text-sm font-semibold text-slate-700">
                        الوصف
                      </label>

                      <Field
                        as="textarea"
                        name="description"
                        rows="5"
                        placeholder="اكتب وصفًا مختصرًا للتصنيف..."
                        className={`w-full px-4 py-3 text-sm transition-all bg-white border rounded-xl outline-none resize-none text-slate-700 placeholder:text-slate-400 ${
                          errors.description && touched.description
                            ? "border-red-400 focus:ring-4 focus:ring-red-500/10"
                            : "border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                        }`}
                      />

                      <div className="flex items-center justify-between mt-1.5">
                        <ErrorMessage
                          name="description"
                          component="div"
                          className="text-xs font-medium text-red-500"
                        />

                        <span className="text-[11px] text-slate-400">
                          {values.description?.length || 0}/500
                        </span>
                      </div>
                    </div>

                    {/* Status */}
                    <div className="p-4 border bg-slate-50/70 border-slate-200 rounded-2xl">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex items-center justify-center w-10 h-10 rounded-xl ${
                              values.isActive
                                ? "bg-emerald-50 text-emerald-600"
                                : "bg-red-50 text-red-500"
                            }`}
                          >
                            {values.isActive ? (
                              <FiCheckCircle className="w-5 h-5" />
                            ) : (
                              <FiAlertCircle className="w-5 h-5" />
                            )}
                          </div>

                          <div>
                            <p className="text-sm font-semibold text-slate-700">
                              حالة التصنيف
                            </p>

                            <p className="mt-0.5 text-xs text-slate-400">
                              {values.isActive
                                ? "التصنيف متاح للاستخدام"
                                : "التصنيف غير متاح للاستخدام"}
                            </p>
                          </div>
                        </div>

                        <label className="relative inline-flex items-center cursor-pointer">
                          <Field
                            type="checkbox"
                            name="isActive"
                            className="sr-only peer"
                          />

                          <div className="w-11 h-6 transition-colors rounded-full bg-slate-300 peer-checked:bg-emerald-500 peer-focus:ring-4 peer-focus:ring-emerald-500/20 after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:w-5 after:h-5 after:bg-white after:rounded-full after:transition-all peer-checked:after:-translate-x-5" />
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* ================= Footer ثابت ================= */}
                  <div className="flex items-center justify-end gap-3 px-6 py-4 border-t bg-slate-50/50 border-slate-200">
                    <button
                      type="button"
                      onClick={() => setOpenEditFileCategory(false)}
                      disabled={loadding}
                      className="px-5 py-2.5 text-sm font-semibold transition-all bg-white border rounded-xl border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-50"
                    >
                      إلغاء
                    </button>

                    <button
                      type="submit"
                      disabled={loadding}
                      className="flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-semibold text-white transition-all bg-blue-600 shadow-sm rounded-xl hover:bg-blue-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {loadding ? (
                        <>
                          <FiLoader className="w-4 h-4 animate-spin" />
                          جاري الحفظ...
                        </>
                      ) : (
                        <>
                          <FiSave className="w-4 h-4" />
                          حفظ التعديلات
                        </>
                      )}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditFileCategory;
