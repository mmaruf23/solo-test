import ProductForm from "@/components/organism/ProductForm";
import Sidebar from "@/components/organism/Sidebar";
import { getById } from "@/services/product";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function EditProductPage() {
  const [data, setData] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  async function getProduct(id) {
    if (!id) return;
    const response = await getById(id);
    if (response.status) {
      console.log(response.data);

      setData(response.data);
    }
  }

  useEffect(() => {
    getProduct(id);
  }, [id]);

  return (
    <div className="flex">
      <Sidebar />
      <div className="pt-20"></div>
      {data && (
        <ProductForm productId={id} edit={true} data={data} />
      )}
    </div>
  );
};
