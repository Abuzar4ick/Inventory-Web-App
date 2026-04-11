import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useProductStore = create((set, get) => ({
  products: [],
  allProducts: [],
  statistics: [],
  areProductsGetting: false,
  isAdding: false,
  areStatsGetting: false,
  isUpdating: false,
  isProductGetting: false,
  isDeleting: false,

  getProducts: async () => {
    set({ areProductsGetting: true });

    try {
      const response = await axiosInstance.get("/products/my");
      set({ products: response.data, allProducts: response.data });
    } catch (error) {
      toast.error("Mahsulotlarni olishda xatolik yuz berdi");
      console.error("Error getting products:", error);
    } finally {
      set({ areProductsGetting: false });
    }
  },

  addProduct: async (productData) => {
    set({ isAdding: true });

    try {
      const response = await axiosInstance.post("/products", productData);
      set((state) => ({
        products: [...state.products, response.data],
        allProducts: [...state.allProducts, response.data],
      }));

      toast.success("Mahsulot muvaffaqiyatli qo‘shildi");
      document.getElementById("add_modal").close();
      
      await get().getProductsStats();
    } catch (error) {
      toast.error("Mahsulot qo‘shishda xatolik yuz berdi");
      console.error("Error adding product:", error);
    } finally {
      set({ isAdding: false });
    }
  },

  updateProduct: async (id, updatedData) => {
    set({ isUpdating: true });

    try {
      const response = await axiosInstance.put(`/products/${id}`, updatedData);
      set((state) => ({
        products: state.products.map((product) =>
          product.id === id ? response.data : product,
        ),
        allProducts: state.allProducts.map((product) =>
          product.id === id ? response.data : product,
        ),
      }));

      await get().getProductsStats();

      toast.success("Mahsulot muvaffaqiyatli yangilandi");
    } catch (error) {
      toast.error("Mahsulotni yangilashda xatolik yuz berdi");
      console.error("Error updating product:", error);
    } finally {
      set({ isUpdating: false });
    }
  },

  deleteProduct: async (id) => {
    set({ isDeleting: true });

    try {
      await axiosInstance.delete(`/products/${id}`);
      set((state) => ({
        products: state.products.filter((product) => product.id !== id),
        allProducts: state.allProducts.filter((product) => product.id !== id),
      }));

      toast.success("Mahsulot muvaffaqiyatli o‘chirildi");
      await get().getProductsStats();
    } catch (error) {
      toast.error("Mahsulotni o‘chirishda xatolik yuz berdi");
      console.error("Error deleting product:", error);
    } finally {
      set({ isDeleting: false });
    }
  },

  getProductsStats: async () => {
    set({ areStatsGetting: true });

    try {
      const response = await axiosInstance.get("/products/stats");
      set({ statistics: response.data });
    } catch (error) {
      toast.error("Statistikani olishda xatolik yuz berdi");
      console.error("Error fetching product statistics:", error);
    } finally {
      set({ areStatsGetting: false });
    }
  },

  searchProducts: (query) => {
    const filteredProducts = get().allProducts.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase()),
    );
    set({ products: filteredProducts });
  },

  setProducts: (products) => set({ products }),
}));
