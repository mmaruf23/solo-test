import SearchBar from "@/components/atoms/Search";
import CategoryBar from "@/components/molecules/CategoryBar";
import MenuBar from "@/components/molecules/MenuBar";
import { Home, LayoutGrid, Menu, Plus, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef, useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const categoryRef = useRef();

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleShowCategory = () => {
    categoryRef.current.classList.toggle("hidden");
  };
  return (
    <>
      <div className="w-full flex justify-center sticky top-0 z-10">
        <div className="w-full xl:w-[1280px] shadow flex items-center justify-between py-3 px-4 bg-white z-20">
          <div className="hidden md:block">
            <p>LOGO</p>
          </div>

          <Home onClick={() => router.push("/")} />
          <LayoutGrid onClick={handleShowCategory} />
          <SearchBar />
          <Link href={"/cart"}>
            <ShoppingCart />
          </Link>
          <div className="flex items-center justify-between border-l py-1 px-4">
            <Menu onClick={() => {
              setIsOpen(true);
            }} />
          </div>
        </div>
        {/* Element category */}
        <div
          ref={categoryRef}
          className="fixed hidden bg-gradient-to-b from-white to-gray-100 shadow-xl top-15 w-full xl:w-[1280px] scale-y-95 -translate-y-5 transition-all duration-500 ease-in-out"
        >
          <CategoryBar close={handleShowCategory} />
        </div>


        {/* Menu akun */}
        <div className={`fixed bg-white max-w-[1280px] w-svw min-h-svh z-20 top-0 ${isOpen ? "block" : "hidden"}`}>
          <div className="flex gap-3 p-5">
            <Plus className="rotate-45" onClick={() => setIsOpen(false)} />
            <p>Close</p>
          </div>
          <MenuBar close={handleOpen} />
        </div>

      </div>


    </>
  );
};
