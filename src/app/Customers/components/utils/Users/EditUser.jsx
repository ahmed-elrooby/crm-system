"use client";

import React, { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import {
  FiX,
  FiUser,
  FiMail,
  FiPhone,
  FiLock,
  FiShield,
  FiEdit2,
  FiLoader,
} from "react-icons/fi";

import { userContext } from "../../../../../Providers/CustomerProvider/Customer.js";

const EditUser = ({ selectedUser }) => {
  const { openUpdateUser, setOpenUpdateUser, handleUpdateUserFun, loadding } =
    useContext(userContext);

  if (!openUpdateUser || !selectedUser) return null;

  // =========================
  // Validation
  // =========================

  const validationSchema = Yup.object({
    userName: Yup.string()
      .required("اسم المستخدم مطلوب")
      .min(3, "اسم المستخدم يجب أن يكون 3 أحرف على الأقل"),

    fullName: Yup.string()
      .required("الاسم الكامل مطلوب")
      .min(3, "الاسم يجب أن يكون 3 أحرف على الأقل"),

    email: Yup.string().email("البريد الإلكتروني غير صحيح"),

    phoneNumber: Yup.string().matches(
      /^01[0125][0-9]{8}$/,
      "رقم الهاتف المصري غير صحيح",
    ),

    password: Yup.string().min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),

    role: Yup.string().required("الدور مطلوب"),
  });

  // =========================
  // Initial Values
  // =========================

  const initialValues = {
    userName: selectedUser.userName || "",
    fullName: selectedUser.fullName || "",
    email: selectedUser.email || "",
    phoneNumber: selectedUser.phoneNumber || "",
    password: "",
    role: selectedUser.roles?.[0] || "User",
  };

  // =========================
  // Submit
  // =========================

  return (
    <div
      dir="rtl"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
    >
      <div className="flex flex-col w-full max-w-2xl max-h-[90vh] overflow-hidden bg-white shadow-2xl rounded-2xl">
        {/* ================= Header ================= */}
        <div className="flex items-center justify-between flex-shrink-0 px-6 py-5 bg-white border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center text-blue-600 w-11 h-11 bg-blue-50 rounded-xl">
              <FiEdit2 size={21} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-800">
                تعديل بيانات المستخدم
              </h2>

              <p className="mt-1 text-xs text-gray-400">
                تعديل بيانات وصلاحيات المستخدم
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setOpenUpdateUser(false)}
            className="flex items-center justify-center text-gray-400 transition rounded-lg w-9 h-9 hover:bg-gray-100 hover:text-gray-600"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* ================= Form ================= */}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          enableReinitialize
          onSubmit={(values) => {
            handleUpdateUserFun({
              id: selectedUser.id,
              values,
            });
          }}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col min-h-0">
              {/* ================= Scrollable Content ================= */}
              <div className="flex-1 min-h-0 p-6 space-y-5 overflow-y-auto">
                {/* ================= User Name ================= */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    اسم المستخدم
                  </label>

                  <div className="relative">
                    <FiUser
                      size={18}
                      className="absolute text-gray-400 -translate-y-1/2 right-3 top-1/2"
                    />

                    <Field
                      name="userName"
                      type="text"
                      placeholder="أدخل اسم المستخدم"
                      className="w-full pl-4 pr-10 text-sm text-gray-700 border border-gray-200 outline-none h-11 rounded-xl bg-gray-50 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  <ErrorMessage
                    name="userName"
                    component="p"
                    className="mt-1 text-xs text-red-500"
                  />
                </div>

                {/* ================= Full Name ================= */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    الاسم الكامل
                  </label>

                  <div className="relative">
                    <FiUser
                      size={18}
                      className="absolute text-gray-400 -translate-y-1/2 right-3 top-1/2"
                    />

                    <Field
                      name="fullName"
                      type="text"
                      placeholder="أدخل الاسم الكامل"
                      className="w-full pl-4 pr-10 text-sm text-gray-700 border border-gray-200 outline-none h-11 rounded-xl bg-gray-50 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  <ErrorMessage
                    name="fullName"
                    component="p"
                    className="mt-1 text-xs text-red-500"
                  />
                </div>

                {/* ================= Email + Phone ================= */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {/* Email */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      البريد الإلكتروني
                    </label>

                    <div className="relative">
                      <FiMail
                        size={18}
                        className="absolute text-gray-400 -translate-y-1/2 right-3 top-1/2"
                      />

                      <Field
                        name="email"
                        type="email"
                        placeholder="example@email.com"
                        className="w-full pl-4 pr-10 text-sm text-gray-700 border border-gray-200 outline-none h-11 rounded-xl bg-gray-50 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                      />
                    </div>

                    <ErrorMessage
                      name="email"
                      component="p"
                      className="mt-1 text-xs text-red-500"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      رقم الهاتف
                    </label>

                    <div className="relative">
                      <FiPhone
                        size={18}
                        className="absolute text-gray-400 -translate-y-1/2 right-3 top-1/2"
                      />

                      <Field
                        name="phoneNumber"
                        type="text"
                        placeholder="01xxxxxxxxx"
                        className="w-full pl-4 pr-10 text-sm text-gray-700 border border-gray-200 outline-none h-11 rounded-xl bg-gray-50 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                      />
                    </div>

                    <ErrorMessage
                      name="phoneNumber"
                      component="p"
                      className="mt-1 text-xs text-red-500"
                    />
                  </div>
                </div>

                {/* ================= Password ================= */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    كلمة المرور
                    <span className="mr-1 text-xs font-normal text-gray-400">
                      (اتركها فارغة إذا لم ترد تغييرها)
                    </span>
                  </label>

                  <div className="relative">
                    <FiLock
                      size={18}
                      className="absolute text-gray-400 -translate-y-1/2 right-3 top-1/2"
                    />

                    <Field
                      name="password"
                      type="password"
                      placeholder="أدخل كلمة المرور الجديدة"
                      className="w-full pl-4 pr-10 text-sm text-gray-700 border border-gray-200 outline-none h-11 rounded-xl bg-gray-50 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  <ErrorMessage
                    name="password"
                    component="p"
                    className="mt-1 text-xs text-red-500"
                  />
                </div>

                {/* ================= Role ================= */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    الدور
                  </label>

                  <div className="relative">
                    <FiShield
                      size={18}
                      className="absolute text-gray-400 -translate-y-1/2 right-3 top-1/2"
                    />

                    <Field
                      as="select"
                      name="role"
                      className="w-full pl-4 pr-10 text-sm text-gray-700 border border-gray-200 outline-none appearance-none h-11 rounded-xl bg-gray-50 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                    >
                      <option value="User">مستخدم</option>
                      <option value="Admin">مدير النظام</option>
                    </Field>
                  </div>

                  <ErrorMessage
                    name="role"
                    component="p"
                    className="mt-1 text-xs text-red-500"
                  />
                </div>
              </div>

              {/* ================= Footer ثابت ================= */}
              <div className="flex items-center justify-end flex-shrink-0 gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50/80">
                <button
                  type="button"
                  onClick={() => setOpenUpdateUser(false)}
                  disabled={isSubmitting || loadding}
                  className="px-5 text-sm font-medium text-gray-600 transition bg-white border border-gray-200 h-11 rounded-xl hover:bg-gray-50 disabled:opacity-50"
                >
                  إلغاء
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting || loadding}
                  className="flex items-center justify-center gap-2 px-6 text-sm font-semibold text-white transition bg-blue-600 h-11 rounded-xl hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loadding ? (
                    <>
                      <FiLoader size={17} className="animate-spin" />
                      جاري الحفظ...
                    </>
                  ) : (
                    <>
                      <FiEdit2 size={17} />
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
  );
};

export default EditUser;
