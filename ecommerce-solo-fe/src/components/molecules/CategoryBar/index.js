import { useCategory } from "@/hooks/useProducts";
import Link from "next/link";
import { useEffect } from "react";

export default function CategoryBar({ close }) {
  const { category, fetchCategory } = useCategory();

  useEffect(() => {
    if (!category.length) fetchCategory();
  }, []);

  return (
    <>
      <p className="text-xl mt-5 ml-6 font-semibold text-gray-800">Filter by category:</p>
      <nav className="mt-4 ml-6">
        <div className="flex flex-col gap-3 py-3">
          {category.map(({ id, name }) => (
            <Link
              onClick={close}
              key={id}
              href={`/category/${id}`}
              className="py-3 px-6 bg-white rounded-md shadow-sm hover:shadow-md hover:-translate-y-1 hover:bg-gray-200 transition-all duration-300 text-gray-700 font-medium flex items-center gap-2"
            >
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span> {/* Bullet Kecil */}
              {name}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
};
