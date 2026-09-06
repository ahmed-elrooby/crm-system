"use client";

import React, { useContext } from "react";
import { FaFileExport, FaPlus } from "react-icons/fa";
import { userContext } from "../../../../../../Providers/CustomerProvider/Customer.js";
import AddCustomer from "../../Customers/AddCustomer.jsx";

const DashboardHeader = () => {
  const { setOpenAddCustomer, openAddCustomer } = useContext(userContext);
  return (
    <>
      {openAddCustomer && <AddCustomer />}

      <div className="flex flex-col justify-between gap-4 mb-6 sm:flex-row sm:items-center">
        {/* Welcome */}
        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            مرحبًا بك، أحمد 👋
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            إليك نظرة سريعة على أداء العملاء والنشاطات الأخيرة.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            className="
            flex items-center justify-center gap-2
            px-4 py-2.5
            text-sm font-medium
            text-slate-600
            bg-white
            border border-slate-200
            rounded-xl
            transition
            hover:bg-slate-50
            hover:border-slate-300
          "
          >
            <FaFileExport className="text-slate-400" />
            تصدير التقرير
          </button>

          <button
            type="button"
            onClick={() => setOpenAddCustomer(true)}
            className="
            flex items-center justify-center gap-2
            px-5 py-2.5
            text-sm font-medium
            text-white
            bg-blue-600
            rounded-xl
            shadow-sm
            transition
            hover:bg-blue-700
            active:scale-[0.98]
          "
          >
            <FaPlus />
            إضافة عميل
          </button>
        </div>
      </div>
    </>
  );
};

export default DashboardHeader;
