import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-800 text-white p-4 h-svh">
      <h1 className="text-xl font-bold">Admin Dashboard</h1>
      <nav className="mt-4">
        <div className="flex flex-col gap-5">
          <div>
            <Link href={"/dashboard"} className="py-2 px-4 hover:bg-gray-700 cursor-pointer">Dashboard</Link>
          </div>
          <div>
            <Link href={"/dashboard/product"} className="py-2 px-4 hover:bg-gray-700 cursor-pointer">Produk</Link>
          </div>
          <div>
            <Link href={"/dashboard/order"} className="py-2 px-4 hover:bg-gray-700 cursor-pointer">Pesanan</Link>
          </div>
          <div>
            <Link href={"/dashboard/history"} className="py-2 px-4 hover:bg-gray-700 cursor-pointer">Riwayat</Link>
          </div>
          <div>
            <Link href={"/dashboard/user"} className="py-2 px-4 hover:bg-gray-700 cursor-pointer">Pengguna</Link>
          </div>
          <div>
            <Link href={"/"} className="py-2 px-4 hover:bg-gray-700 cursor-pointer">Back to Store</Link>
          </div>
        </div>
      </nav>
    </aside>
  );
};
