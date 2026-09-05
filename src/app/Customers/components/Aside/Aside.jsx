"use client";

import Link from "next/link";
import { usePathname } from "next/navigation.js";
import { useEffect, useState } from "react";
import {
  FaChartBar,
  FaUsers,
  FaTags,
  FaLayerGroup,
  FaHashtag,
  FaCog,
  FaSignOutAlt,
  FaThLarge,
  FaTimes,
} from "react-icons/fa";
import Cookies from "js-cookie";
import { FiFileText } from "react-icons/fi";

const links = [
  {
    name: "لوحة التحكم",
    link: "/Customers",
    icon: <FaThLarge />,
    section: "الرئيسية",
  },
  {
    name: "جميع العملاء",
    link: "/Customers/Customer",
    icon: <FaUsers />,
    section: "العملاء",
  },
  {
    name: "التصنيفات",
    link: "/Customers/Categories",
    icon: <FaTags />,
  },
  {
    name: " تصنيفات الملفات",
    link: "/Customers/FileCategory",
    icon: <FaLayerGroup />,
  },
  {
    name: "مستندات العملاء",
    link: "/Customers/Document",
    icon: <FiFileText />,
  },
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const user = JSON.parse(Cookies.get("user"));
  const getRoleName = (role) => {
    switch (role?.toLowerCase()) {
      case "admin":
        return "مدير النظام";

      case "user":
        return "مستخدم";

      default:
        return "غير محدد";
    }
  };
  useEffect(() => {
    const handleOpenSidebar = () => {
      setOpen(true);
    };

    window.addEventListener("open-sidebar", handleOpenSidebar);

    return () => {
      window.removeEventListener("open-sidebar", handleOpenSidebar);
    };
  }, []);

  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed right-0 top-0 z-50
          flex h-screen w-72 flex-col
          border-l border-gray-200
          bg-white shadow-xl
          transition-transform duration-300

          md:w-64
          md:translate-x-0

          ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-20 px-5 border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center text-lg font-bold text-white bg-blue-600 shadow-sm h-11 w-11 rounded-xl">
              ج
            </div>

            <div>
              <h2 className="text-sm font-bold text-gray-900">
                نظام إدارة العملاء
              </h2>

              <p className="mt-0.5 text-xs text-gray-400">CRM System</p>
            </div>
          </div>

          {/* Close */}
          <button
            onClick={() => setOpen(false)}
            className="flex items-center justify-center text-gray-500 transition rounded-lg h-9 w-9 hover:bg-gray-100 md:hidden"
          >
            <FaTimes />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          {links.map((item) => (
            <div key={item.name}>
              {item.section && (
                <div className="mb-2 mt-5 px-3 text-[11px] font-bold uppercase tracking-wide text-gray-400 first:mt-0">
                  {item.section}
                </div>
              )}

              <Link
                href={item.link}
                onClick={() => setOpen(false)}
                className={`
    group relative mb-1 flex items-center gap-3
    rounded-xl px-3 py-2.5
    text-sm font-medium
    transition-all duration-200

    ${
      pathname === item.link
        ? "bg-blue-50 text-blue-600"
        : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
    }
  `}
              >
                {/* Active Indicator */}
                {pathname === item.link && (
                  <span className="absolute right-0 w-1 h-6 -translate-y-1/2 bg-blue-600 rounded-l-full top-1/2" />
                )}

                {/* Icon */}
                <span
                  className={`
      flex h-9 w-9 shrink-0 items-center justify-center
      rounded-lg text-base
      transition-all duration-200

      ${
        pathname === item.link
          ? "bg-blue-600 text-white shadow-sm"
          : "bg-gray-50 text-gray-400 group-hover:bg-blue-100 group-hover:text-blue-600"
      }
    `}
                >
                  {item.icon}
                </span>

                {/* Name */}
                <span
                  className={`
      transition-colors
      ${
        pathname === item.link
          ? "font-semibold text-blue-600"
          : "text-gray-600 group-hover:text-blue-600"
      }
    `}
                >
                  {item.name}
                </span>
              </Link>
            </div>
          ))}
        </nav>

        {/* User */}
        <div className="p-3 border-t border-gray-100 shrink-0">
          <div className="p-3 rounded-xl bg-gray-50">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 font-bold text-blue-600 bg-blue-100 rounded-full shrink-0">
                {user?.fullName?.charAt(0)}
              </div>

              <div className="min-w-0">
                <p className="text-sm font-bold text-gray-800 truncate">
                  {user?.fullName || user?.userName}
                </p>

                <p className="text-[11px] text-gray-400">
                  {getRoleName(user?.roles?.[0])}
                </p>
              </div>
            </div>

            <Link
              href="/logout"
              className="
                mt-3 flex items-center gap-3
                rounded-lg px-3 py-2.5
                text-sm font-medium text-red-500
                transition hover:bg-red-50
              "
            >
              <FaSignOutAlt />
              <span>تسجيل الخروج</span>
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
