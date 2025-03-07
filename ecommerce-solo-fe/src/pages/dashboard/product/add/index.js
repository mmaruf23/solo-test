import Navbar from "@/components/organism/Navbar";
import ProductForm from "@/components/organism/ProductForm";
import Sidebar from "@/components/organism/Sidebar";

export default function AddProductPage() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="pt-20"></div>
      <ProductForm />
    </div>
  );
};
