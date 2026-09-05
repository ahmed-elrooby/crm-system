"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // البيانات تعتبر Fresh لمدة 5 دقائق
      staleTime: 1000 * 60 * 5,

      // الاحتفاظ بالبيانات في الـ Cache لمدة 30 دقيقة
      gcTime: 1000 * 60 * 30,

      // عدم إعادة الطلب عند الرجوع للـ Tab
      refetchOnWindowFocus: false,

      // إعادة المحاولة مرة واحدة فقط
      retry: 1,
    },
  },
});

const QueryProvider = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryProvider;
