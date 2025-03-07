import Card from "@/components/molecules/ProductCard";
import Navbar from "@/components/organism/Navbar";
import { searchProduct } from "@/services/product";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function SearchPage() {
  const [products, setProducts] = useState();
  const router = useRouter();
  const { key } = router.query;


  useEffect(() => {
    search(key);
  }, [key]);

  async function search(key) {
    if (!key) return;
    const res = await searchProduct(key);
    if (res.status) {
      setProducts(res.data);
    } else {
      console.log(res.data);
    }
  }
  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center mt-10">
        <div className="max-w-[1280px] w-full flex justify-center flex-wrap gap-5 p-4">
          <div className="w-full border-b pb-4">Hasil pencarian untuk : {key}</div>
          {/* <Card /> */}
          {products?.map(data =>
            <Card key={data.id} data={data} />
          )}
        </div>
      </div>
    </div>
  );
};
