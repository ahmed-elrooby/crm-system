export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body className="h-screen overflow-hidden bg-slate-50">
        <aside>aside</aside>

        <div className="flex flex-col h-screen min-h-0 md:mr-64">
          <div className="shrink-0">
            <header>header</header>
          </div>

          <main className="flex-1 min-h-0 p-4 overflow-y-auto sm:p-6">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
