import Card from "@/components/molecules/ProductCard";
import Banner from "@/components/organism/Banner";
import Footer from "@/components/organism/Footer";
import Navbar from "@/components/organism/Navbar";
import { useProducts } from "@/hooks/useProducts";
import { useEffect } from "react";

export default function Home() {
  const [products, fetchProduct] = useProducts();

  useEffect(() => {
    if (!products.length) {
      fetchProduct(0, 10);
    }
  }, []);

  return (
    <div className="flex flex-col min-h-[100svh] items-center">
      <Navbar />
      {/* Main body */}
      <div className="flex flex-col flex-grow w-full">
        <Banner />
        <div className="flex justify-center flex-wrap gap-5 p-4">
          <div className="max-w-[1280px] flex justify-center flex-wrap gap-5 p-4">
            {products?.map(data =>
              <Card key={data.id} data={data} />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );

};
