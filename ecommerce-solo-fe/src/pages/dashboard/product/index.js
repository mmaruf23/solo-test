import Sidebar from "@/components/organism/Sidebar";
import { useProducts } from "@/hooks/useProducts";
import { deleteProduct } from "@/services/product";
import Link from "next/link";
import { useEffect } from "react";

export default function DashboardProductPage() {
  const [products, fetchProduct] = useProducts();

  useEffect(() => {
    if (!products.length) {
      fetchProduct(0, 10);
    }
  }, []);

  async function handleDelete(id) {
    const response = await deleteProduct(id);
    if (response.status) {
      fetchProduct(0, 1000);
    }
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100">
        <h2 className="text-2xl font-bold">Manajemen Produk</h2>
        <div className="h-auto mt-2">
          <Link href={"/dashboard/product/add"} className="px-4 py-1 text-white bg-green-400 rounded">+ Tambah</Link>
        </div>
        <table className="w-full mt-6 bg-white shadow rounded-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4">ID</th>
              <th className="py-2 px-4">Nama Produk</th>
              <th className="py-2 px-4">Harga</th>
              <th className="py-2 px-4">Stok</th>
              <th className="py-2 px-4">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product) => (
              <tr key={product.id} className="border-b">
                <td className="py-2 px-4">{product.id}</td>
                <td className="py-2 px-4">{product.name}</td>
                <td className="py-2 px-4">Rp {product.price.toLocaleString()}</td>
                <td className="py-2 px-4">{product.stock}</td>
                <td className="py-2 px-4">
                  <div>
                    <Link href={`/dashboard/product/${product.id}/edit`} className="bg-blue-500 text-white px-3 py-1 rounded mr-2">Edit</Link>
                    <button onClick={() => handleDelete(product.id)} className="bg-red-500 text-white px-3 py-1 rounded">Hapus</button>
                  </div>
                </td>
              </tr>
            ))}

          </tbody>
        </table>
      </main>
    </div>
  );
};
