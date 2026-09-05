"use client";
import React, { useContext } from "react";
import { FiPlus } from "react-icons/fi";
import { userContext } from "../../../../../Providers/CustomerProvider/Customer.js";
import AddCustomer from "./AddCustomer.jsx";

const Header = () => {
  const { openAddCustomer, setOpenAddCustomer } = useContext(userContext);
  return (
    <>
      {openAddCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-[2px]">
          <div className="max-h-[calc(100vh-2rem)] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl ring-1 ring-slate-900/5">
            <AddCustomer />
          </div>
        </div>
      )}
      <div className="flex flex-col justify-between gap-4 border-b mb-4 border-slate-200/80 bg-slate-50/95 px-0 pb-5 pt-1 backdrop-blur sm:flex-row sm:items-center">
        {/* Title */}
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            العملاء
          </h2>

          <p className="text-sm text-slate-500">
            إدارة جميع العملاء ومعلومات التواصل الخاصة بهم
          </p>
        </div>

        {/* Add Customer */}
        <button
          type="button"
          onClick={() => {
            setOpenAddCustomer(true);
          }}
          className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-blue-600/30"
        >
          <FiPlus size={18} />
          إضافة عميل
        </button>
      </div>
    </>
  );
};

export default Header;
