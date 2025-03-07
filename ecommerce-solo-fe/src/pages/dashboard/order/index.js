import Sidebar from "@/components/organism/Sidebar";
import { getAllOrder, getOrderByStatus, updateOrderStatus } from "@/services/order";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function DashboardOrder() {
  const statRef = useRef();
  const [selectOrder, setSelectOrder] = useState();

  const [orders, setOrders] = useState();

  useEffect(() => {
    getAll();
  }, []);

  async function getAll() {
    const response = await getAllOrder();
    if (response.status) {
      setOrders(response.data);
    } else {
      console.log(response.message);

    }
  }

  async function handleUpdate() {
    const payload = {
      orderId: selectOrder.id,
      status: statRef.current.value
    };
    const response = await updateOrderStatus(payload);
    if (response.status) {
      alert("berhasil di update");
      setSelectOrder(false);
      getAll();
    } else {
      console.log(response.message);
    }
  }

  async function handleChange(status) {
    if (!status) {
      getAll();
      return;
    }

    const response = await getOrderByStatus(status);
    if (response.status) {
      setOrders(response.data);
    } else {
      console.log(response.message);
    }

  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100">
        <div>
          <h2 className="text-2xl font-bold">Manajemen Pesanan</h2>
          <div className="flex flex-col gap-2">
            <label htmlFor="role" className="text-gray-700 font-semibold">
              Filter Status
            </label>
            <select
              onChange={(e) => handleChange(e.target.value)}
              name="stat"
              id="stat"
              className="p-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">ALL</option>
              {["PENDING", "SHIPPED", "DELIVERED", "CANCELED"].map((item, index) => (
                <option key={index} value={item}>{item}</option>
              ))}
            </select>
          </div>
          <table className="w-full mt-6 bg-white shadow rounded-lg">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4">ID Pesanan</th>
                <th className="py-2 px-4">Pelanggan</th>
                <th className="py-2 px-4">Total</th>
                <th className="py-2 px-4">Status</th>
                <th className="py-2 px-4">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((order) => (
                <tr key={order.id} className="border-b">
                  <td className="py-2 px-4">{order.id}</td>
                  <td className="py-2 px-4">{order.username}</td>
                  <td className="py-2 px-4">Rp {order.totalPrice.toLocaleString()}</td>
                  <td className="py-2 px-4">{order.status}</td>
                  <td className="py-2 px-4">
                    <button onClick={() => setSelectOrder(order)} className="bg-blue-500 text-white px-3 py-1 rounded mr-2">
                      Update
                    </button>
                    <Link href={`/dashboard/order/${order.id}`} className="bg-red-500 text-white px-3 py-1 rounded">Detail</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {selectOrder &&
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 bg-white p-5 rounded-xl shadow-lg">
              <h2 className="text-lg font-semibold text-gray-700 mb-3">Update Status</h2>
              <div className="space-y-3">
                <select
                  ref={statRef}
                  name="role"
                  id="role"
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                >
                  {["PENDING", "SHIPPED", "DELIVERED"].map((item, index) => (
                    <option key={index} value={item}>{item}</option>
                  ))}
                </select>
                <button onClick={handleUpdate} className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                  Simpan
                </button>
              </div>
            </div>
          }

        </div>
      </main>
    </div>
  );
};
