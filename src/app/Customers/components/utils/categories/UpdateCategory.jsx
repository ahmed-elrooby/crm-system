"use client";

import React, { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FiX, FiLayers, FiSave, FiCheckCircle } from "react-icons/fi";

import { userContext } from "../../../../../Providers/CustomerProvider/Customer.js";

const UpdateCategory = ({ selectedCategory }) => {
  const {
    openEditCategory,
    setOpenEditCategory,
    handleEditCategorySubmit,
    loadding,
  } = useContext(userContext);

  if (!openEditCategory || !selectedCategory) return null;

  const initialValues = {
    name: selectedCategory.name || "",
    description: selectedCategory.description || "",
    color: selectedCategory.color || "#2563EB",
    isActive: selectedCategory.isActive ?? true,
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("اسم التصنيف مطلوب")
      .min(2, "اسم التصنيف يجب أن يكون حرفين على الأقل"),

    description: Yup.string().max(300, "الوصف يجب ألا يزيد عن 300 حرف"),

    color: Yup.string().required("لون التصنيف مطلوب"),

    isActive: Yup.boolean(),
  });

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={() => setOpenEditCategory(false)}
    >
      <div
        className="flex flex-col w-full max-w-lg max-h-[90vh] overflow-hidden bg-white shadow-2xl rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between flex-shrink-0 px-6 py-5 bg-white border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center bg-blue-100 w-11 h-11 rounded-xl">
              <FiLayers size={22} className="text-blue-600" />
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-800">
                تعديل التصنيف
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                قم بتعديل بيانات التصنيف ثم احفظ التغييرات
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setOpenEditCategory(false)}
            className="flex items-center justify-center transition rounded-full w-9 h-9 bg-slate-100 text-slate-500 hover:bg-red-100 hover:text-red-500"
          >
            <FiX size={19} />
          </button>
        </div>

        {/* Form */}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          enableReinitialize
          onSubmit={(values) => {
            handleEditCategorySubmit({ id: selectedCategory?.id, values });
          }}
        >
          {({ isSubmitting, values, setFieldValue }) => (
            <Form className="flex flex-col flex-1 min-h-0">
              {/* Scroll Area */}
              <div className="flex-1 p-6 space-y-5 overflow-y-auto">
                {/* Name */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-slate-700">
                    اسم التصنيف
                  </label>

                  <Field
                    type="text"
                    name="name"
                    placeholder="مثال: VIP"
                    className="w-full px-4 py-3 text-sm transition border outline-none rounded-xl border-slate-200 text-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />

                  <ErrorMessage
                    name="name"
                    component="p"
                    className="mt-1.5 text-xs text-red-500"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-slate-700">
                    الوصف
                  </label>

                  <Field
                    as="textarea"
                    name="description"
                    rows="4"
                    placeholder="اكتب وصفًا مختصرًا للتصنيف..."
                    className="w-full px-4 py-3 text-sm transition border outline-none resize-none rounded-xl border-slate-200 text-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />

                  <ErrorMessage
                    name="description"
                    component="p"
                    className="mt-1.5 text-xs text-red-500"
                  />
                </div>

                {/* Color */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-slate-700">
                    لون التصنيف
                  </label>

                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={values.color}
                      onChange={(e) => setFieldValue("color", e.target.value)}
                      className="w-12 h-12 p-1 bg-white border rounded-lg cursor-pointer border-slate-200"
                    />

                    <div className="flex-1">
                      <Field
                        type="text"
                        name="color"
                        placeholder="#2563EB"
                        className="w-full px-4 py-3 text-sm font-medium uppercase transition border outline-none rounded-xl border-slate-200 text-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      />
                    </div>

                    <div
                      className="w-12 h-12 shadow-sm rounded-xl"
                      style={{
                        backgroundColor: values.color,
                      }}
                    />
                  </div>

                  <ErrorMessage
                    name="color"
                    component="p"
                    className="mt-1.5 text-xs text-red-500"
                  />
                </div>

                {/* Status */}
                <div className="flex items-center justify-between p-4 border rounded-xl border-slate-200 bg-slate-50">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center bg-green-100 rounded-lg w-9 h-9">
                      <FiCheckCircle size={18} className="text-green-600" />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-slate-700">
                        حالة التصنيف
                      </p>

                      <p className="text-xs text-slate-400">
                        تفعيل أو تعطيل التصنيف
                      </p>
                    </div>
                  </div>

                  <label className="relative inline-flex items-center cursor-pointer">
                    <Field
                      type="checkbox"
                      name="isActive"
                      className="sr-only peer"
                    />

                    <div className="w-11 h-6 transition rounded-full bg-slate-300 peer-checked:bg-green-500 after:absolute after:top-[2px] after:right-[2px] after:w-5 after:h-5 after:transition-all after:bg-white after:rounded-full peer-checked:after:-translate-x-5" />
                  </label>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center flex-shrink-0 gap-3 px-6 py-4 border-t bg-slate-50 border-slate-100">
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-white transition bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiSave size={17} />

                  {loadding ? "جاري الحفظ..." : "حفظ التعديلات"}
                </button>

                <button
                  type="button"
                  onClick={() => setOpenEditCategory(false)}
                  className="px-6 py-2.5 text-sm font-medium transition bg-white border rounded-lg border-slate-200 text-slate-700 hover:bg-slate-100"
                >
                  إلغاء
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default UpdateCategory;
