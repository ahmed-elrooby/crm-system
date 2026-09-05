import React from "react";
import {
  FaPhone,
  FaCreditCard,
  FaEnvelope,
  FaHandshake,
  FaFileInvoice,
} from "react-icons/fa";

const activities = [
  {
    title: "متابعة مع العميل",
    type: "مكالمة",
    customer: "أحمد علي — شركة النور للتجارة",
    user: "محمد حسن",
    date: "٣٠ أكتوبر · ١٠:٣٠ ص",
    icon: FaPhone,
    iconColor: "text-blue-600",
  },
  {
    title: "استلام دفعة",
    type: "دفعة مالية",
    customer: "محمد حسن — شركة المستقبل للاستثمار",
    user: "أحمد علي",
    date: "٣٠ أكتوبر · ٠٩:٠٠ ص",
    icon: FaCreditCard,
    iconColor: "text-green-600",
  },
  {
    title: "إرسال عرض سعر",
    type: "بريد إلكتروني",
    customer: "سارة خالد — شركة التقنية المتقدمة",
    user: "نادية إبراهيم",
    date: "٢٩ أكتوبر · ٠٢:٢٠ م",
    icon: FaEnvelope,
    iconColor: "text-cyan-600",
  },
  {
    title: "اجتماع مع العميل",
    type: "اجتماع",
    customer: "خالد يوسف — مجموعة الدلتا",
    user: "محمد حسن",
    date: "٢٩ أكتوبر · ١١:٠٠ ص",
    icon: FaHandshake,
    iconColor: "text-purple-600",
  },
  {
    title: "إنشاء فاتورة",
    type: "فاتورة",
    customer: "نادية إبراهيم — شركة النيل للأدوية",
    user: "أحمد علي",
    date: "٢٨ أكتوبر · ٠٤:٤٥ م",
    icon: FaFileInvoice,
    iconColor: "text-amber-600",
  },
  {
    title: "متابعة طلب",
    type: "مكالمة",
    customer: "تامر حسين — شركة القاهرة للسيارات",
    user: "سارة خالد",
    date: "٢٨ أكتوبر · ٠١:١٠ م",
    icon: FaPhone,
    iconColor: "text-blue-600",
  },
];

const Activities = () => {
  return (
    <div
      dir="rtl"
      className="p-5 bg-white border shadow-sm lg:col-span-2 border-slate-100 rounded-2xl"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-slate-800">آخر النشاطات</h3>

        <span className="text-xs text-slate-400">آخر ٦ نشاطات</span>
      </div>

      {/* Activities */}
      <div className="space-y-2">
        {activities.map((activity, index) => {
          const Icon = activity.icon;

          return (
            <div
              key={index}
              className="flex items-start gap-3 rounded-xl p-2.5 transition hover:bg-slate-50"
            >
              {/* Icon */}
              <div className="flex items-center justify-center w-8 h-8 rounded-full shrink-0 bg-slate-100">
                <Icon className={`text-sm ${activity.iconColor}`} />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                {/* Title + Type + Date */}
                <div className="flex flex-wrap items-start justify-between gap-1">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-sm font-medium text-slate-800">
                      {activity.title}
                    </span>

                    <span className="rounded-md bg-slate-100 px-2 py-0.5 text-xs text-slate-500">
                      {activity.type}
                    </span>
                  </div>

                  <span className="text-xs whitespace-nowrap text-slate-400">
                    {activity.date}
                  </span>
                </div>

                {/* Customer */}
                <p className="mt-0.5 truncate text-xs text-slate-500">
                  {activity.customer}
                </p>

                {/* User */}
                <span className="text-xs text-slate-400">
                  بواسطة {activity.user}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Activities;
