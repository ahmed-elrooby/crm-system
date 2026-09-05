import CustomerProvider from "../../Providers/CustomerProvider/Customer.js";
import QueryProvider from "../../Providers/QueryProvider/Query.js";
import Sidebar from "./components/Aside/Aside.jsx";
import Header from "./components/Header/Header.jsx";

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body className="h-screen overflow-hidden bg-slate-50">
        <QueryProvider>
          <CustomerProvider>
            <Sidebar />

            <div className="flex h-screen min-h-0 flex-col md:mr-64">
              <div className="shrink-0">
                <Header />
              </div>

              <main className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-6">
                {children}
              </main>
            </div>
          </CustomerProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
