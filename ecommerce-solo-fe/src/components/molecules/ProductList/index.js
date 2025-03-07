import { slugify } from "@/utils/convertToSlug";
import Link from "next/link";

export default function List({ data, handleDelete = () => { } }) {

  const { productId, productName, productPrice, qty } = data;
  // const imageUrl = `${process.env.NEXT_PUBLIC_API}/products/images/${image}` || "";

  return (
    <div className="flex items-center justify-between border-b pb-4">
      <div className="flex items-center space-x-4">
        {/* <Image src={imageUrl} alt="Product" className="w-20 h-20 object-cover rounded-md" /> */}
        <Link href={`/product/${slugify(productName)}`}>
          <h2 className="text-lg font-semibold">{productName}</h2>
          <p className="text-gray-600">Rp{productPrice}</p>
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <button className="px-2 py-1 border rounded">-</button>
        <span className="px-3">{qty}</span>
        <button className="px-2 py-1 border rounded">+</button>
        <button onClick={() => handleDelete(productId)} className="text-red-500 hover:text-red-700">Hapus</button>
      </div>
    </div>
  );
};
