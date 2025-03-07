import { getCategories, getProducts } from "@/services/product";
import { setCategory } from "@/store/slices/categorySlice";
import { setProducts } from "@/store/slices/productSlices";
import { useDispatch, useSelector } from "react-redux";

export const useProducts = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product);

  const fetchProduct = async (page = 0, size = 10) => {

    const response = await getProducts(page, size);
    if (response.status) {

      dispatch(setProducts(response.data.data));
    } else {

      dispatch(setProducts([]));
      console.error(response.message);
    };
  };

  return [products, fetchProduct];

};

export const useCategory = () => {
  const dispatch = useDispatch();
  const category = useSelector((state) => state.category);

  const fetchCategory = async () => {
    const response = await getCategories();
    if (response.status) {
      dispatch(setCategory(response.data));
    } else {
      dispatch(setCategory([]));
      console.error(response.message);
    }
  };

  return { category, fetchCategory };
};