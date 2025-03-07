import Sidebar from "@/components/organism/Sidebar";
import { getDetailOrder } from "@/services/order";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function DetailOrder() {
  const router = useRouter();
  const { id } = router.query;
  const [orders, setOrders] = useState();

  useEffect(() => {
    if (id) fetchOrder(id);
  }, [id]);

  async function fetchOrder(id) {
    const response = await getDetailOrder(id);
    if (response.status) {
      console.log(response.data);

      setOrders(response.data);
    } else {
      console.log(response.message);

    }
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 p-6 bg-gray-100">
        {orders && (
          <div>
            <h2 className="text-2xl font-bold">Detail Pesanan #{orders.id}</h2>
            <p className="mt-2">Pelanggan: {orders.username}</p>
            <p>Status: </p>
            <h3 className="mt-4 font-semibold">Produk dalam Pesanan:</h3>
            <ul className="mt-2 bg-white shadow rounded-lg p-4">
              {orders?.orderItems.map((item, index) => (
                <li key={index} className="border-b py-2">
                  {item.productName} - {item.quantity} x Rp {item.productPrice.toLocaleString()}
                </li>
              ))}
            </ul>
            <p className="mt-4 font-semibold">Total: Rp{orders.totalPrice.toLocaleString()} </p>
            <button onClick={() => router.back()} className="mt-4 bg-gray-500 text-white px-4 py-2 rounded">
              Kembali
            </button>
          </div>
        )}
      </main>
    </div>

  );
};
