"use client";

import React, { useContext, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  FiUser,
  FiLock,
  FiEye,
  FiEyeOff,
  FiLogIn,
  FiShield,
} from "react-icons/fi";

import { authContext } from "../../../Providers/AuthProvider/Auth.js";

const Login = () => {
  const { handleLoginFun, loadding } = useContext(authContext);

  const [showPassword, setShowPassword] = useState(false);

  // =========================
  // Initial Values
  // =========================

  const initialValues = {
    userName: "",
    password: "",
  };

  // =========================
  // Validation
  // =========================

  const validationSchema = Yup.object({
    userName: Yup.string().trim().required("اسم المستخدم مطلوب"),

    password: Yup.string()
      .min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل")
      .required("كلمة المرور مطلوبة"),
  });

  // =========================
  // Submit
  // =========================

  return (
    <main
      dir="rtl"
      className="relative flex items-center justify-center min-h-screen px-4 py-6 overflow-hidden bg-slate-50"
    >
      {/* ================= Background ================= */}

      <div className="pointer-events-none absolute -right-40 -top-40 h-[420px] w-[420px] rounded-full bg-blue-200/40 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-40 -left-40 h-[420px] w-[420px] rounded-full bg-indigo-200/30 blur-3xl" />

      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-100/30 blur-3xl" />

      {/* ================= Container ================= */}

      <div className="relative z-10 w-full max-w-[430px]">
        {/* ================= Card ================= */}

        <div className="overflow-hidden border rounded-[28px] border-slate-200/80 bg-white shadow-[0_20px_60px_-15px_rgba(15,23,42,0.12)]">
          {/* Top Line */}

          <div className="w-full h-1 bg-primary" />

          <div className="p-6 sm:p-8">
            {/* ================= Header ================= */}

            <div className="mb-7">
              <div className="flex items-center gap-3 mb-5">
                <div className="flex items-center justify-center text-white bg-blue-600 shadow-lg w-11 h-11 rounded-xl shadow-blue-600/20">
                  <FiLogIn size={20} />
                </div>

                <div>
                  <h1 className="text-base font-bold text-slate-800">
                    نظام إدارة العملاء
                  </h1>

                  <p className="text-xs text-slate-400">CRM System</p>
                </div>
              </div>

              <h2 className="text-xl font-bold text-slate-800">
                مرحبًا بعودتك 👋
              </h2>

              <p className="mt-1.5 text-sm text-slate-400">
                سجل الدخول للوصول إلى لوحة التحكم
              </p>
            </div>

            {/* ================= Formik ================= */}

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleLoginFun}
            >
              {({ errors, touched }) => (
                <Form className="space-y-4">
                  {/* ================= Username ================= */}

                  <div>
                    <label
                      htmlFor="userName"
                      className="block mb-2 text-sm font-semibold text-slate-700"
                    >
                      اسم المستخدم
                    </label>

                    <div className="relative group">
                      <FiUser
                        className={`absolute right-4 top-1/2 -translate-y-1/2 transition-colors ${
                          errors.userName && touched.userName
                            ? "text-red-400"
                            : "text-slate-400 group-focus-within:text-primary"
                        }`}
                        size={18}
                      />

                      <Field
                        id="userName"
                        name="userName"
                        type="text"
                        autoComplete="username"
                        placeholder="أدخل اسم المستخدم"
                        className={`
                          h-[52px] w-full rounded-xl
                          border bg-slate-50/70
                          pr-11 pl-4
                          text-sm text-slate-800
                          outline-none
                          transition-all duration-200
                          placeholder:text-slate-400
                          hover:border-slate-300
                          focus:bg-white
                          focus:ring-4
                          ${
                            errors.userName && touched.userName
                              ? "border-red-400 focus:border-red-500 focus:ring-red-500/10"
                              : "border-slate-200 focus:border-primary focus:ring-primary/10"
                          }
                        `}
                      />
                    </div>

                    <ErrorMessage
                      name="userName"
                      component="p"
                      className="mt-1.5 text-xs font-medium text-red-500"
                    />
                  </div>

                  {/* ================= Password ================= */}

                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-semibold text-slate-700"
                    >
                      كلمة المرور
                    </label>

                    <div className="relative group">
                      <FiLock
                        className={`absolute right-4 top-1/2 -translate-y-1/2 transition-colors ${
                          errors.password && touched.password
                            ? "text-red-400"
                            : "text-slate-400 group-focus-within:text-primary"
                        }`}
                        size={18}
                      />

                      <Field
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        placeholder="أدخل كلمة المرور"
                        className={`
                          h-[52px] w-full rounded-xl
                          border bg-slate-50/70
                          pr-11 pl-12
                          text-sm text-slate-800
                          outline-none
                          transition-all duration-200
                          placeholder:text-slate-400
                          hover:border-slate-300
                          focus:bg-white
                          focus:ring-4
                          ${
                            errors.password && touched.password
                              ? "border-red-400 focus:border-red-500 focus:ring-red-500/10"
                              : "border-slate-200 focus:border-primary focus:ring-primary/10"
                          }
                        `}
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute transition-colors -translate-y-1/2 left-4 top-1/2 text-slate-400 hover:text-primary"
                        aria-label={
                          showPassword
                            ? "إخفاء كلمة المرور"
                            : "إظهار كلمة المرور"
                        }
                      >
                        {showPassword ? (
                          <FiEyeOff size={18} />
                        ) : (
                          <FiEye size={18} />
                        )}
                      </button>
                    </div>

                    <ErrorMessage
                      name="password"
                      component="p"
                      className="mt-1.5 text-xs font-medium text-red-500"
                    />
                  </div>

                  {/* ================= Submit ================= */}

                  <button
                    type="submit"
                    className="
                      group flex h-[52px] w-full
                      items-center justify-center
                      gap-2 rounded-xl
                      bg-blue-600
                      text-sm font-semibold
                      text-white
                      shadow-lg shadow-blue-600/20
                      transition-all duration-200
                      hover:bg-blue-600/90
                      hover:shadow-blue-600/30
                      active:scale-[0.98]
                      disabled:cursor-not-allowed
                      disabled:opacity-60
                    "
                  >
                    {loadding ? (
                      <>
                        <span className="w-5 h-5 border-2 border-white rounded-full border-t-transparent animate-spin" />
                        جاري تسجيل الدخول...
                      </>
                    ) : (
                      <>
                        <FiLogIn
                          size={18}
                          className="transition-transform duration-200 group-hover:-translate-x-1"
                        />
                        تسجيل الدخول
                      </>
                    )}
                  </button>
                </Form>
              )}
            </Formik>

            {/* ================= Security ================= */}

            <div className="pt-5 border-t mt-7 border-slate-100">
              <div className="flex items-center justify-center gap-2">
                <div className="flex items-center justify-center rounded-full h-7 w-7 bg-green-50">
                  <FiShield size={14} className="text-green-500" />
                </div>

                <span className="text-xs text-slate-400">
                  بياناتك محمية بتشفير آمن
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ================= Footer ================= */}

        <div className="mt-6 text-center">
          <p className="text-xs text-slate-400">© 2026 نظام إدارة العملاء</p>

          <p className="mt-1 text-[11px] text-slate-300">جميع الحقوق محفوظة</p>
        </div>
      </div>
    </main>
  );
};

export default Login;
