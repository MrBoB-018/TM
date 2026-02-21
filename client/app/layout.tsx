import "../app/globals.css";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "Task Manager",
  description: "Manage your tasks efficiently",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className=" bg-black min-h-screen">
        <Navbar />
        <div className="">{children}</div>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
