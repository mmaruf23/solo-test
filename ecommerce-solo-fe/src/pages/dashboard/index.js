import Sidebar from "@/components/organism/Sidebar";
import { count } from "@/services/dashboard";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [total, setTotal] = useState({});

  useEffect(() => {
    getTotal();
  }, []);

  async function getTotal() {
    const res = await count();
    if (res.status) {
      setTotal(res.data);
    } else {
      console.log(res.message);
    }
  }


  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100">
        <h2 className="text-2xl font-bold">Dashboard Utama</h2>
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="p-4 bg-white shadow rounded-lg">
            <h3 className="text-lg font-semibold">Total Produk</h3>
            <p className="text-2xl">{total?.product}</p>
          </div>
          <div className="p-4 bg-white shadow rounded-lg">
            <h3 className="text-lg font-semibold">Total Pesanan</h3>
            <p className="text-2xl">{total?.order}</p>
          </div>
          <div className="p-4 bg-white shadow rounded-lg">
            <h3 className="text-lg font-semibold">Total Pengguna</h3>
            <p className="text-2xl">{total?.user}</p>
          </div>
        </div>
      </main>
    </div>
  );
};
