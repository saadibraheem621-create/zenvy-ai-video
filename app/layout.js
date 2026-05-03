import "./globals.css";

export const metadata = {
  title: "Zenvy AI Video",
  description: "AI Video Generator Platform"
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <nav className="nav">
          <a href="/">Zenvy AI</a>
          <div>
            <a href="/pricing">الأسعار</a>
            <a href="/dashboard">لوحتي</a>
            <a href="/generate">توليد فيديو</a>
            <a href="/admin">Admin</a>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}