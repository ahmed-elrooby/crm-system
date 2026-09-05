"use client";
import React, { useContext } from "react";
import { FaUpload } from "react-icons/fa";
import { userContext } from "../../../../../Providers/CustomerProvider/Customer.js";
import AddDocument from "./AddDocument.jsx";

const Header = () => {
  const { openAddDocument, setOpenAddDocument } = useContext(userContext);
  return (
    <>
      {openAddDocument && <AddDocument />}
      <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold md:text-3xl text-slate-800">
            مستندات العملاء
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            إدارة وتنظيم مستندات وملفات العملاء داخل النظام
          </p>
        </div>
        <button
          onClick={() => {
            setOpenAddDocument(true);
          }}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2.5 rounded-xl shadow-sm hover:shadow transition-all duration-200"
        >
          <FaUpload className="text-sm" />
          <span>رفع مستند</span>
        </button>
      </div>
    </>
  );
};

export default Header;
