"use client";
import React, { useContext } from "react";
import { FiPlus, FiUsers } from "react-icons/fi";
import AddUser from "./AddUser.jsx";
import { userContext } from "../../../../../Providers/CustomerProvider/Customer.js";

const Header = () => {
  const { openAddUser, setOpenAddUser } = useContext(userContext);
  return (
    <>
      {openAddUser && <AddUser />}
      <div className="flex flex-col gap-4 p-5 mb-6 bg-white border border-gray-100 shadow-sm rounded-2xl sm:flex-row sm:items-center sm:justify-between">
        {/* Title */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-12 h-12 text-blue-600 rounded-xl bg-blue-50">
            <FiUsers size={24} />
          </div>

          <div>
            <h1 className="text-xl font-bold text-gray-800">المستخدمين</h1>

            <p className="mt-1 text-sm text-gray-500">
              إدارة مستخدمي النظام والصلاحيات الخاصة بهم
            </p>
          </div>
        </div>

        {/* Add User */}
        <button
          onClick={() => {
            setOpenAddUser(true);
          }}
          className="flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white transition bg-blue-600 rounded-xl hover:bg-blue-700 active:scale-95"
        >
          <FiPlus size={19} />
          إضافة مستخدم
        </button>
      </div>
    </>
  );
};

export default Header;
