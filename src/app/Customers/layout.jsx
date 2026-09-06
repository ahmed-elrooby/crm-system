import CustomerProvider from "../../Providers/CustomerProvider/Customer.js";
import QueryProvider from "../../Providers/QueryProvider/Query.js";
import Sidebar from "./components/Aside/Aside.jsx";
import Header from "./components/Header/Header.jsx";

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body className="h-screen pb-4 overflow-hidden bg-slate-50">
        <CustomerProvider>
          <Sidebar />

          <div className="flex flex-col h-screen min-h-0 md:mr-64">
            <div className="shrink-0">
              <Header />
            </div>

            <main className="flex-1 min-h-0 p-4 overflow-y-auto sm:p-6">
              {children}
            </main>
          </div>
        </CustomerProvider>
      </body>
    </html>
  );
}
