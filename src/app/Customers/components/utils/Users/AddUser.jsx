"use client";

import React, { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import {
  FiX,
  FiUser,
  FiLock,
  FiMail,
  FiPhone,
  FiShield,
  FiUserPlus,
} from "react-icons/fi";

import { userContext } from "../../../../../Providers/CustomerProvider/Customer.js";

const AddUser = () => {
  const { openAddUser, setOpenAddUser, handleAddUserFun, loadding } =
    useContext(userContext);

  if (!openAddUser) return null;

  const initialValues = {
    userName: "",
    password: "",
    fullName: "",
    email: "",
    phoneNumber: "",
    role: "User",
  };

  const validationSchema = Yup.object({
    userName: Yup.string()
      .required("اسم المستخدم مطلوب")
      .min(3, "اسم المستخدم يجب أن يكون 3 أحرف على الأقل"),

    password: Yup.string()
      .required("كلمة المرور مطلوبة")
      .min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),

    fullName: Yup.string()
      .required("الاسم الكامل مطلوب")
      .min(3, "الاسم الكامل يجب أن يكون 3 أحرف على الأقل"),

    email: Yup.string()
      .required("البريد الإلكتروني مطلوب")
      .email("البريد الإلكتروني غير صحيح"),

    phoneNumber: Yup.string()
      .required("رقم الهاتف مطلوب")
      .matches(/^01[0125][0-9]{8}$/, "يرجى إدخال رقم هاتف مصري صحيح"),

    role: Yup.string().required("يرجى اختيار دور المستخدم"),
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-2xl overflow-hidden bg-white shadow-2xl rounded-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center text-blue-600 h-11 w-11 rounded-xl bg-blue-50">
              <FiUserPlus size={22} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-800">
                إضافة مستخدم جديد
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                قم بإضافة مستخدم جديد إلى النظام
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setOpenAddUser(false)}
            className="flex items-center justify-center text-gray-400 transition rounded-lg h-9 w-9 hover:bg-gray-100 hover:text-gray-700"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Form */}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleAddUserFun}
        >
          {({ isSubmitting }) => (
            <Form className="p-6">
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {/* Full Name */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    الاسم الكامل
                  </label>

                  <div className="relative">
                    <FiUser
                      className="absolute text-gray-400 -translate-y-1/2 right-3 top-1/2"
                      size={18}
                    />

                    <Field
                      name="fullName"
                      type="text"
                      placeholder="مثال: أحمد محمد"
                      className="w-full py-3 pl-4 pr-10 text-sm transition border border-gray-200 outline-none rounded-xl bg-gray-50 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  <ErrorMessage
                    name="fullName"
                    component="p"
                    className="mt-1.5 text-xs text-red-500"
                  />
                </div>

                {/* Username */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    اسم المستخدم
                  </label>

                  <div className="relative">
                    <FiUser
                      className="absolute text-gray-400 -translate-y-1/2 right-3 top-1/2"
                      size={18}
                    />

                    <Field
                      name="userName"
                      type="text"
                      placeholder="مثال: ahmed123"
                      className="w-full py-3 pl-4 pr-10 text-sm transition border border-gray-200 outline-none rounded-xl bg-gray-50 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  <ErrorMessage
                    name="userName"
                    component="p"
                    className="mt-1.5 text-xs text-red-500"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    البريد الإلكتروني
                  </label>

                  <div className="relative">
                    <FiMail
                      className="absolute text-gray-400 -translate-y-1/2 right-3 top-1/2"
                      size={18}
                    />

                    <Field
                      name="email"
                      type="email"
                      placeholder="example@email.com"
                      className="w-full py-3 pl-4 pr-10 text-sm transition border border-gray-200 outline-none rounded-xl bg-gray-50 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  <ErrorMessage
                    name="email"
                    component="p"
                    className="mt-1.5 text-xs text-red-500"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    رقم الهاتف
                  </label>

                  <div className="relative">
                    <FiPhone
                      className="absolute text-gray-400 -translate-y-1/2 right-3 top-1/2"
                      size={18}
                    />

                    <Field
                      name="phoneNumber"
                      type="tel"
                      placeholder="01xxxxxxxxx"
                      className="w-full py-3 pl-4 pr-10 text-sm transition border border-gray-200 outline-none rounded-xl bg-gray-50 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  <ErrorMessage
                    name="phoneNumber"
                    component="p"
                    className="mt-1.5 text-xs text-red-500"
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    كلمة المرور
                  </label>

                  <div className="relative">
                    <FiLock
                      className="absolute text-gray-400 -translate-y-1/2 right-3 top-1/2"
                      size={18}
                    />

                    <Field
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      className="w-full py-3 pl-4 pr-10 text-sm transition border border-gray-200 outline-none rounded-xl bg-gray-50 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  <ErrorMessage
                    name="password"
                    component="p"
                    className="mt-1.5 text-xs text-red-500"
                  />
                </div>

                {/* Role */}
                <div className="hidden">
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    دور المستخدم
                  </label>

                  <div className="relative">
                    <FiShield
                      className="absolute z-10 text-gray-400 -translate-y-1/2 right-3 top-1/2"
                      size={18}
                    />

                    <Field
                      as="select"
                      name="role"
                      className="w-full py-3 pl-4 pr-10 text-sm transition border border-gray-200 outline-none appearance-none  rounded-xl bg-gray-50 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                    >
                      <option value="">اختر دور المستخدم</option>

                      <option value="Admin">مدير النظام</option>

                      <option value="User">مستخدم</option>
                    </Field>
                  </div>

                  <ErrorMessage
                    name="role"
                    component="p"
                    className="mt-1.5 text-xs text-red-500"
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end gap-3 pt-5 border-t border-gray-100 mt-7">
                <button
                  type="button"
                  onClick={() => setOpenAddUser(false)}
                  className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
                >
                  إلغاء
                </button>

                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <FiUserPlus size={18} />

                  {loadding ? "جاري الإضافة..." : "إضافة المستخدم"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddUser;
