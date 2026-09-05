"use client";

import React, { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  FiX,
  FiFolder,
  FiCheckCircle,
  FiSave,
  FiFileText,
} from "react-icons/fi";

import { userContext } from "../../../../../Providers/CustomerProvider/Customer.js";

const AddFileCategory = () => {
  const {
    handleAddFileCategoryFun,
    openAddCategoryFile,
    setOpenAddCategoryFile,
    loadding,
  } = useContext(userContext);

  const validationSchema = Yup.object({
    name: Yup.string()
      .trim()
      .required("اسم التصنيف مطلوب")
      .min(2, "اسم التصنيف يجب أن يكون حرفين على الأقل"),

    nameEn: Yup.string()
      .trim()
      .required("الاسم بالإنجليزية مطلوب")
      .min(2, "الاسم يجب أن يكون حرفين على الأقل"),

    description: Yup.string()
      .trim()
      .required("وصف التصنيف مطلوب")
      .min(3, "الوصف يجب أن يكون 3 أحرف على الأقل"),

    isActive: Yup.boolean(),
  });
  const initialValues = {
    name: "",
    nameEn: "",
    description: "",
    isActive: true,
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      {/* Overlay */}
      <div
        className="absolute inset-0"
        onClick={() => setOpenAddCategoryFile(false)}
      />

      {/* Modal */}
      <div className="relative flex flex-col w-full max-w-lg max-h-[90vh] overflow-hidden bg-white shadow-2xl rounded-2xl">
        {/* ================= HEADER ================= */}
        <div className="flex items-center justify-between flex-shrink-0 px-6 py-5 bg-white border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center text-blue-600 w-11 h-11 bg-blue-50 rounded-xl">
              <FiFolder className="w-5 h-5" />
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-800">
                إضافة تصنيف ملف
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                قم بإضافة تصنيف جديد لملفات ومرفقات العملاء
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setOpenAddCategoryFile(false)}
            className="flex items-center justify-center transition rounded-lg w-9 h-9 text-slate-500 hover:text-red-500 hover:bg-red-50"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* ================= FORM ================= */}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleAddFileCategoryFun}
        >
          {({ isSubmitting, values }) => (
            <Form className="flex flex-col min-h-0">
              {/* ================= SCROLLABLE CONTENT ================= */}
              <div className="flex-1 px-6 py-6 space-y-5 overflow-y-auto">
                {/* Arabic Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-slate-700"
                  >
                    اسم التصنيف
                    <span className="text-red-500"> *</span>
                  </label>

                  <div className="relative">
                    <FiFolder className="absolute w-4 h-4 -translate-y-1/2 right-3 top-1/2 text-slate-400" />

                    <Field
                      id="name"
                      name="name"
                      type="text"
                      placeholder="مثال: العقود"
                      className="w-full py-3 pl-4 pr-10 text-sm transition border rounded-xl border-slate-200 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                  </div>

                  <ErrorMessage
                    name="name"
                    component="p"
                    className="mt-1.5 text-xs text-red-500"
                  />
                </div>

                {/* English Name */}
                <div>
                  <label
                    htmlFor="nameEn"
                    className="block mb-2 text-sm font-medium text-slate-700"
                  >
                    اسم التصنيف بالإنجليزية
                    <span className="text-red-500"> *</span>
                  </label>

                  <div className="relative">
                    <FiFileText className="absolute w-4 h-4 -translate-y-1/2 right-3 top-1/2 text-slate-400" />

                    <Field
                      id="nameEn"
                      name="nameEn"
                      type="text"
                      dir="ltr"
                      placeholder="Example: Contracts"
                      className="w-full py-3 pl-4 pr-10 text-sm transition border rounded-xl border-slate-200 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                  </div>

                  <ErrorMessage
                    name="nameEn"
                    component="p"
                    className="mt-1.5 text-xs text-red-500"
                  />
                </div>

                {/* Description */}
                <div>
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-slate-700"
                  >
                    الوصف
                    <span className="text-red-500"> *</span>
                  </label>

                  <Field
                    as="textarea"
                    id="description"
                    name="description"
                    rows="5"
                    placeholder="اكتب وصفًا مختصرًا للتصنيف..."
                    className="w-full px-4 py-3 text-sm transition border resize-none rounded-xl border-slate-200 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />

                  <ErrorMessage
                    name="description"
                    component="p"
                    className="mt-1.5 text-xs text-red-500"
                  />
                </div>

                {/* Active Status */}
                <div className="flex items-center justify-between p-4 border bg-slate-50 border-slate-100 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center text-green-600 bg-green-100 rounded-lg w-9 h-9">
                      <FiCheckCircle className="w-4 h-4" />
                    </div>

                    <div>
                      <p className="text-sm font-medium text-slate-700">
                        حالة التصنيف
                      </p>

                      <p className="text-xs text-slate-500">
                        تحديد ما إذا كان التصنيف متاحًا للاستخدام
                      </p>
                    </div>
                  </div>

                  <label className="relative inline-flex items-center cursor-pointer">
                    <Field
                      type="checkbox"
                      name="isActive"
                      className="sr-only peer"
                    />

                    <div className="w-11 h-6 transition bg-slate-300 rounded-full peer peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:w-5 after:h-5 after:bg-white after:border after:border-slate-300 after:rounded-full after:transition-all peer-checked:after:-translate-x-5 peer-checked:after:border-white" />
                  </label>
                </div>
              </div>

              {/* ================= FOOTER ================= */}
              <div className="flex items-center justify-end flex-shrink-0 gap-3 px-6 py-4 bg-white border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setOpenAddCategoryFile(false)}
                  className="px-5 py-2.5 text-sm font-medium transition border rounded-xl text-slate-600 border-slate-200 hover:bg-slate-50 disabled:opacity-50"
                >
                  إلغاء
                </button>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white transition bg-blue-600 rounded-xl hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <FiSave className="w-4 h-4" />

                  {loadding ? "جاري الحفظ..." : "حفظ التصنيف"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddFileCategory;
