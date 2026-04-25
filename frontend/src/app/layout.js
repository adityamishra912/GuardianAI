import "./globals.css";
import AuthGuard from "../lib/AuthGuard";

export const metadata = {
  title: "GuardianAI - Digital Media Protection",
  description: "AI-powered platform that automatically detects and flags unauthorized use of official sports media.",
};

export default function RootLayout({ children }) {
  return (
    <AuthGuard>
      <html lang="en">
        <body className="bg-[#070a14] text-white min-h-screen overflow-x-hidden antialiased" style={{ backgroundImage: "radial-gradient(circle at 15% 50%, rgba(157, 78, 221, 0.05), transparent 25%), radial-gradient(circle at 85% 30%, rgba(0, 229, 255, 0.05), transparent 25%)" }}>
          {children}
        </body>
      </html>
    </AuthGuard>
  );
}
