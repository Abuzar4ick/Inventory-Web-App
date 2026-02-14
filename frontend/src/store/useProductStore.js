import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useProductStore = create((set, get) => ({
  products: [],
  isLoading: false,
  isAdding: false,

  fetchProducts: async () => {
    set({ isLoading: true });

    try {
      const response = await axiosInstance.get("/products");
      set({ products: response.data });
    } catch (error) {
      toast.error("Mahsulotlarni olishda xatolik yuz berdi");
      console.error("Error fetching products:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  addProduct: async (productData) => {
    set({ isAdding: true });

    try {
      const response = await axiosInstance.post("/products", productData);
      set((state) => ({ products: [...state.products, response.data] }));

      toast.success("Mahsulot muvaffaqiyatli qo‘shildi");
      document.getElementById("my_modal").close();
    } catch (error) {
      toast.error("Mahsulot qo‘shishda xatolik yuz berdi");
      console.error("Error adding product:", error);
    } finally {
      set({ isAdding: false });
    }
  },

  updateProduct: async (id, updatedData) => {
    set({ isLoading: true });

    try {
      const response = await axiosInstance.put(`/products/${id}`, updatedData);
      set((state) => ({
        products: state.products.map((product) =>
          product.id === id ? response.data : product,
        ),
      }));

      toast.success("Mahsulot muvaffaqiyatli yangilandi");
    } catch (error) {
      toast.error("Mahsulotni yangilashda xatolik yuz berdi");
      console.error("Error updating product:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  deleteProduct: async (id) => {
    set({ isLoading: true });

    try {
      await axiosInstance.delete(`/products/${id}`);
      set((state) => ({
        products: state.products.filter((product) => product.id !== id),
      }));

      toast.success("Mahsulot muvaffaqiyatli o‘chirildi");
    } catch (error) {
      toast.error("Mahsulotni o‘chirishda xatolik yuz berdi");
      console.error("Error deleting product:", error);
    } finally {
      set({ isLoading: false });
    }
  },
}));
