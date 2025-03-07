import { useCategory } from "@/hooks/useProducts";
import { addProduct, editById } from "@/services/product";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ProductForm({ productId = null, edit = false, data = false }) {



  const { category, fetchCategory } = useCategory();
  const router = useRouter();

  const initialState = {
    name: "",
    description: "",
    price: "",
    categoryId: "",
    stock: "",
    image: null,
  };

  const [product, setProduct] = useState(data || initialState);

  useEffect(() => {
    console.log(product);

    if (!category.length) fetchCategory();
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };


  const handleFileChange = (e) => {
    setProduct((prev) => ({ ...prev, image: e.target.files[0] }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();


    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("categoryId", product.categoryId || product.category.id);
    formData.append("stock", product.stock);
    if (typeof (product.image) != "string") formData.append("imagePath", product.image);

    const response = edit ? await editById(productId, formData) : await addProduct(formData);
    if (response.status) {

      alert(edit ? "product berhasil diedit!" : "produk berhasil ditambah!");
      router.back();
      setProduct(initialState);
    } else {
      // console.log(response);

      alert("gagal : " + response.message);
    }
  };



  return (
    <div className="max-w-lg mx-auto p-4 bg-white rounded-lg mt-10">
      {edit ? (
        <h2 className="text-xl font-bold mb-4">Edit Data Produk</h2>
      ) : (
        <h2 className="text-xl font-bold mb-4">Input Data Produk Baru</h2>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" placeholder="Nama Produk" className="w-full p-2 border rounded" value={product?.name}
          onChange={handleChange} required={!edit} />
        <textarea name="description" placeholder="Deskripsi" className="w-full p-2 border rounded"
          value={product.description} onChange={handleChange} />
        <input type="number" name="price" placeholder="Harga" className="w-full p-2 border rounded" value={product?.price}
          onChange={handleChange} required={!edit} />
        <select name="categoryId" className="w-full p-2 border rounded" value={product.categoryId || product.category?.id} onChange={handleChange}
          required={!edit}>
          <option value="">Pilih Kategori</option>
          {category.map(({ id, name }) => (
            <option key={id} value={id}>{name}</option>
          ))}
        </select>
        <input type="number" name="stock" placeholder="Stok" className="w-full p-2 border rounded" value={product.stock}
          onChange={handleChange} required={!edit} />
        <input type="file" name="image" className="w-full p-2 border rounded" onChange={handleFileChange} required={!edit} />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Simpan Produk
        </button>
      </form>
    </div>
  );
}