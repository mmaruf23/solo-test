import Card from "@/components/molecules/ProductCard";
import Navbar from "@/components/organism/Navbar";
import { useCategory } from "@/hooks/useProducts";
import { getProductCategory } from "@/services/product";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function CategoryPage() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const { category } = useCategory();

  const cat = category[Number(router.query.category) - 1];

  useEffect(() => {
    if (cat) getProductByCategory(cat.id);
  }, [router.query.category]);

  async function getProductByCategory(id) {
    const response = await getProductCategory(id, 0, 10);
    if (response.status) {
      console.log(response.data.data);

      setProducts(response.data.data);
    } else {
      console.error(response.message);
      setProducts([]);
    }
  }

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center mt-10">
        <div className="max-w-[1280px] w-full flex justify-center flex-wrap gap-5 p-4">
          <div className="w-full border-b pb-4"> Product {cat?.name} : </div>
          {/* <Card /> */}
          {products?.map(data =>
            <Card key={data.id} data={data} />
          )}
        </div>
      </div>
    </div>
  );
};
