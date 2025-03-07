import List from "@/components/molecules/ProductList";
import Navbar from "@/components/organism/Navbar";
import { useLogin } from "@/hooks/useLogin";
import { checkout, deleteFromCart, getUserCart } from "@/services/cart";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [amount, setAmount] = useState();
  const router = useRouter();



  useEffect(() => {
    const isLogin = !!localStorage.getItem("token");

    if (!isLogin) {
      alert("User belum login");
      router.replace("/login");
    } else {
      fetchUserCart();
    }

  }, []);

  useEffect(() => {
    const totalAmount = cart.reduce((p, c) => p + c.productPrice * c.qty, 0);
    setAmount(totalAmount);
  }, [cart]);

  async function fetchUserCart() {
    const res = await getUserCart();
    console.log(res);
    if (res.status) {
      setCart(res.data.itemResponses);
    } else {
      console.log(res.message);
      setCart([]);
    }
  }

  async function deleteProductCart(productId) {
    const res = await deleteFromCart(productId);
    if (res.status) {
      fetchUserCart();
    } else {
      console.log(res.message);
    }
  }

  async function handleCheckout() {
    const res = await checkout();
    if (res.status) {
      alert("Berhasil di checkout!");
      fetchUserCart();
    } else {
      alert("Gagal checkout : " + res.message);
      console.log(res.message);
    }

  }

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
        <div className="bg-white shadow-md rounded-lg p-4">
          <div className="space-y-4">
            {/* Contoh Item Cart */}
            {cart?.map(item => (
              <List key={item.id} data={item} handleDelete={deleteProductCart} />
            )
            )}
          </div>

          {/* Total & Checkout */}
          {amount ? (

            <div className="mt-6 flex justify-between items-center">
              <span className="text-lg font-semibold">Total: Rp{amount}</span>
              <button onClick={handleCheckout} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Checkout</button>
            </div>
          ) : (
            <div className="mt-6 flex justify-between items-center">
              <span className="text-lg font-semibold">Keranjang masih kosong 🥲</span>
              <Link href={"/"} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Gas belanja</Link>
            </div>
          )
          }
        </div>
      </div>
    </>
  );

};
