import Button from "@/components/atoms/Button";
import { useLogin } from "@/hooks/useLogin";
import { addToCart } from "@/services/cart";
import { slugify } from "@/utils/convertToSlug";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";


export default function Card({ data }) {
  const router = useRouter();
  const [isLogin] = useLogin();

  const { id, name, price, image, stock } = data;
  const imageUrl = `${process.env.NEXT_PUBLIC_API}/products/images/${image}` || "";

  async function handleClick() {

    if (!isLogin) {
      router.push("/login");
      return;
    }
    const payload = {
      productId: id,
      qty: 1,
    };
    const res = await addToCart(payload);
    if (res.status) {
      alert(name + " berhasil di tambahkan ke Keranjang belanja");
    } else {
      console.log("Gagal ditambahkan ke cart : ", res.message);
    }

  }
  return stock ? (
    <div className="border min-h-96 max-w-96 w-64 md:w-80 lg:w-auto p-3 rounded-xl flex flex-col">
      <Link href={`/product/${slugify(name)}`} className="flex-grow flex flex-col">
        <div className="w-full h-50 border rounded-lg flex justify-center items-center">
          <Image className="h-auto w-auto" alt="IMAGE" src={imageUrl} height={300} width={300} priority={true} />
        </div>
        <div className="flex-grow">
          <p className="text-xl mt-5 line-clamp-3">
            {name}
          </p>
        </div>
        <p className="text-red-500 font-bold py-2">Rp{price}</p>
      </Link>
      <div className="flex justify-center">
        <Button onClick={() => handleClick()} className="w-full bg-gray-700 hover:bg-black text-white">
          Add to cart
        </Button>
      </div>
    </div >
  ) : (
    <div className="border min-h-96 max-w-96 w-64 md:w-80 lg:w-auto p-3 rounded-xl flex flex-col">
      <Link href={`/product/${slugify(name)}`} className="flex-grow flex flex-col">
        <div className="w-full h-50 border rounded-lg flex justify-center items-center">
          <Image className="h-auto w-auto grayscale opacity-50" alt="IMAGE" src={imageUrl} height={300} width={300} priority={true} />
        </div>
        <div className="flex-grow">
          <p className="text-xl mt-5 line-clamp-3">{name}</p>
        </div>
        <p className="text-red-500 font-bold py-2">Rp{price}</p>
      </Link>
      <div className="flex justify-center">
        <Button
          onClick={() => handleClick()}
          className={`w-full text-white ${stock === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-gray-700 hover:bg-black"}`}
          disabled={stock === 0}
        >
          {stock === 0 ? "Out of Stock" : "Add to cart"}
        </Button>
      </div>
    </div>
  );
};
