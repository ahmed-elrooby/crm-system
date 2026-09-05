"use client";

import React, { useContext, useState } from "react";
import { FiTrash2, FiX, FiAlertTriangle } from "react-icons/fi";

import { userContext } from "../../../../../Providers/CustomerProvider/Customer.js";

const DeleteModel = ({ selectedCustomer }) => {
  const { setOpenDeleteCustomer, handleDeleteCustomerSubmit } =
    useContext(userContext);

  const [loading, setLoading] = useState(false);

  // لو مفيش عميل متحدد
  if (!selectedCustomer) return null;

  // إغلاق المودال
  const handleClose = () => {
    if (loading) return;

    setOpenDeleteCustomer(false);
  };

  // حذف العميل
  const handleDelete = async () => {
    if (!selectedCustomer?.id) return;

    try {
      setLoading(true);

      await handleDeleteCustomerSubmit(selectedCustomer?.id);

      setOpenDeleteCustomer(false);
    } catch (error) {
      console.error("Delete customer error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        fixed
        inset-0
        z-[100]
        flex
        items-center
        justify-center
        p-4
        bg-black/50
        backdrop-blur-sm
      "
      onClick={handleClose}
    >
      <div
        className="w-full max-w-md overflow-hidden bg-white shadow-2xl rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative p-6 text-center">
          {/* Close */}
          <button
            onClick={handleClose}
            disabled={loading}
            className="absolute flex items-center justify-center transition rounded-lg top-4 left-4 w-9 h-9 text-slate-400 hover:bg-slate-100 hover:text-slate-700 disabled:opacity-50"
          >
            <FiX size={20} />
          </button>

          {/* Delete Icon */}
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 text-red-500 rounded-2xl bg-red-50">
            <FiTrash2 size={30} />
          </div>

          {/* Title */}
          <h2 className="text-xl font-bold text-slate-800">حذف العميل</h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            هل أنت متأكد أنك تريد حذف هذا العميل؟
          </p>
        </div>

        {/* Customer */}
        <div className="px-6">
          <div className="p-4 border rounded-xl bg-slate-50 border-slate-200">
            <div className="flex items-center gap-3">
              {/* Avatar */}
              <div className="flex items-center justify-center font-bold text-blue-600 w-11 h-11 rounded-xl bg-blue-50 shrink-0">
                {selectedCustomer?.fullName?.charAt(0)?.toUpperCase() || "؟"}
              </div>

              {/* Info */}
              <div className="min-w-0">
                <p className="font-bold truncate text-slate-800">
                  {selectedCustomer?.fullName || "عميل"}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  {selectedCustomer?.customerCode || "-"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Warning */}
        <div className="px-6 pt-4">
          <div className="flex items-start gap-3 p-4 border border-red-100 rounded-xl bg-red-50">
            <FiAlertTriangle
              size={20}
              className="
                text-red-500
                mt-0.5
                shrink-0
              "
            />

            <div>
              <p className="text-sm font-bold text-red-700">تنبيه</p>

              <p className="mt-1 text-xs leading-5 text-red-600">
                سيتم حذف بيانات العميل نهائيًا، ولا يمكن التراجع عن هذه العملية.
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 p-6 mt-2 ">
          {/* Cancel */}
          <button
            type="button"
            onClick={handleClose}
            disabled={loading}
            className="flex-1 text-sm font-semibold transition bg-white border h-11 rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            إلغاء
          </button>

          {/* Delete */}
          <button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            className="flex items-center justify-center flex-1 gap-2 text-sm font-semibold text-white transition bg-red-600 h-11 rounded-xl hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 rounded-full border-white/30 border-t-white animate-spin" />
                جاري الحذف...
              </>
            ) : (
              <>
                <FiTrash2 size={17} />
                حذف العميل
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModel;
