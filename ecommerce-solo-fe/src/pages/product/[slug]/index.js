import Button from "@/components/atoms/Button";
import Footer from "@/components/organism/Footer";
import Navbar from "@/components/organism/Navbar";
import { useAdmin, useLogin } from "@/hooks/useLogin";
import { addToCart } from "@/services/cart";
import { getProductDetails } from "@/services/product";
import { Edit, LayoutList } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ProductPage() {
  const [product, setProduct] = useState([]);
  const router = useRouter();
  const [isLogin, setIsLogin] = useLogin();
  const isAdmin = useAdmin();

  const { slug } = router.query;
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (slug) {
      getDetailProduct(slug);
    }
  }, [slug]);

  async function getDetailProduct(slug) {
    const res = await getProductDetails(slug);
    if (res.status) {
      setProduct(res.data);
    } else {
      console.log("Error" + res.message);
      setProduct([]);
    }
  }

  async function handleClick() {

    if (isLogin && product) {
      const payload = {
        productId: product.id,
        qty: qty,
      };
      const res = await addToCart(payload);
      if (res.status) {
        alert(product.name + " berhasil di tambahkan ke Keranjang belanja");
      } else {
        console.log("Gagal ditambahkan ke cart : ", res.message);
      }

    } else {
      alert("silahkan login terlebih dahulu");
      router.push("/login");
    }
  }

  return (
    <div className="flex flex-col min-h-[100svh] items-center">
      <Navbar />
      {/* Main body */}
      <div className="flex gap-5 flex-col flex-grow w-full px-5 mt-16 max-w-[1280px]">
        <div className="flex justify-center">
          <div className="rounded my-5 h-[400px]  flex items-center justify-center">
            {/* Ini produk image ceritanya */}
            {product.image &&
              <Image className="w-auto" src={`${process.env.NEXT_PUBLIC_API}/products/images/${product?.image}`} alt="Product Image" width={1000} height={1000} priority={true} />
            }
          </div>
        </div>
        <p className="text-3xl">{product?.name}</p>
        <div className="flex gap-2 items-end shadow p-3">
          <LayoutList size={20} />
          <p>Category : <span className="ml-4">{product?.category?.name}</span></p>
        </div>
        <p className="text-4xl font-bold text-red-500 pb-5 border-b border-dotted">Rp{product.price}</p>
        <div className="">
          <p className="text-2xl py-3">Deskripsi</p>
          <li>{product?.description}</li>
        </div>
        <p>Stok : {product?.stock}</p>
        <div className="w-full h-auto mt-10 flex shadow-2xl rounded">
          <div className="p-3">
            <p className="mb-3">Jumlah pembelian</p>
            <Button className={"bg-gray-300"} onClick={() => { setQty(qty < 2 ? qty : qty - 1); }}>-</Button>
            <input onChange={(e) => { if (!(e.target.value < 1)) setQty(Number(e.target.value)); }} className="py-2 mx-2 w-16 rounded-lg border focus:outline-none text-center" type="number" value={qty} />
            <Button className={"bg-gray-300"} onClick={() => { setQty(qty + 1); }}>+</Button>
          </div>
          <div className="flex-grow flex justify-center items-center p-5">
            {product?.stock > 0 ? (
              <Button onClick={handleClick} className={"text-2xl w-full h-full bg-red-500 text-white"}>Add to Cart</Button>
            ) : (
              <Button className={"text-2xl w-full h-full bg-gray-500 text-white cursor-not-allowed"}>Out of Stock</Button>
            )}
          </div>
          {/* Untuk admin aja */}
          {isAdmin &&
            <div className="flex justify-center items-center px-3">
              <Link href={`${router.asPath}/edit`} className=" rounded-lg p-5 bg-red-500 text-white">
                <Edit />
              </Link>
            </div>
          }
        </div>
      </div>
      <Footer />
    </div>
  );
};
