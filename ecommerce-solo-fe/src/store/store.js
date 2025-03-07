import { configureStore } from '@reduxjs/toolkit';
import productSlice from './slices/productSlices';
import categorySlice from './slices/categorySlice';

export default configureStore({
  reducer: {
    product: productSlice,
    category: categorySlice,
  },
});