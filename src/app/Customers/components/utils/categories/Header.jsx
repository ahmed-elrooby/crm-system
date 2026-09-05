"use client";
import React, { useContext } from "react";
import { FaPlus } from "react-icons/fa";
import { userContext } from "../../../../../Providers/CustomerProvider/Customer.js";
import AddCategory from "./AddCategory.jsx";

const Header = () => {
  const { openAddCategory, setOpenAddCategory } = useContext(userContext);
  return (
    <>
      {openAddCategory && <AddCategory />}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-xl font-bold text-slate-800">تصنيفات العملاء</h2>
          <p className="text-sm text-slate-500">إدارة تصنيفات العملاء</p>
        </div>
        <button
          onClick={() => {
            setOpenAddCategory(true);
          }}
          className="bg-[#2563eb] text-white px-5 py-2.5 rounded-xl font-medium text-sm hover:bg-blue-600 transition flex items-center gap-2"
        >
          <FaPlus /> إضافة تصنيف
        </button>
      </div>
    </>
  );
};

export default Header;
