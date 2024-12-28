import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  products: [],
  loading: false,
  error: null,
  page: 1,
  hasMore: true,
};

export const fetchProducts = (page) => async (dispatch) => {
  dispatch(startLoading());
  try {
    const response = await axios.get(`https://fakestoreapi.com/products`, {
      params: { page, limit: 10 },
    });
    dispatch(setProducts({ products: response.data, page }));
    if (response.data.length < 10) {
      dispatch(setHasMore(false));
    }
  } catch (error) {
    dispatch(setError(error.message));
  }
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
    },
    setProducts: (state, action) => {
      state.loading = false;
      state.products = [...state.products, ...action.payload.products];
      state.page = action.payload.page + 1;
    },
    setError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setHasMore: (state, action) => {
      state.hasMore = action.payload;
    },
  },
});

export const { startLoading, setProducts, setError, setHasMore } =
  productsSlice.actions;

export default productsSlice.reducer;
