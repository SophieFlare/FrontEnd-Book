import { Outlet, ScrollRestoration } from "react-router-dom";
import Navbar from "./Navbar";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-[#09090f] text-white">
      <Navbar />

      <main className="mx-auto min-h-screen max-w-7xl px-6">
        <Outlet />
      </main>

      <ScrollRestoration />
    </div>
  );
}