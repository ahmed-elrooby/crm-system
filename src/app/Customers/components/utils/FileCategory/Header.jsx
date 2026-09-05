"use client";
import React, { useContext } from "react";
import { FiPlus } from "react-icons/fi";
import { userContext } from "../../../../../Providers/CustomerProvider/Customer.js";
import AddFileCategory from "./AddFileCategory.jsx";

const Header = () => {
  const { openAddCategoryFile, setOpenAddCategoryFile } =
    useContext(userContext);
  return (
    <>
      {openAddCategoryFile && <AddFileCategory />}
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        {/* Header Left */}
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl">
            إدارة تصنيفات الملفات
          </h1>

          <p className="max-w-lg mt-1 text-sm text-slate-500">
            قم بإدارة وتنظيم تصنيفات ملفات ومرفقات العملاء داخل النظام.
          </p>
        </div>

        {/* Header Right */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => {
              setOpenAddCategoryFile(true);
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-xl shadow-sm transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <FiPlus className="w-4 h-4" />
            إضافة تصنيف
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;
