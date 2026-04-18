import { productsRepository } from "./products.repository";
import { NewProduct } from "../../db/types";

export const productsService = {
  async create(data: NewProduct) {
    const product = await productsRepository.createProduct(data);
    return {
      status: 201,
      data: product,
      message: "Mahsulot muvaffaqiyatli yaratildi",
    };
  },

  async getAll(userId: string) {
    const products = await productsRepository.getProductsByUserId(userId);
    return {
      status: 200,
      data: products,
      message: "Mahsulotlar muvaffaqiyatli o'qildi",
    };
  },

  async getById(id: string) {
    const product = await productsRepository.getProductById(id);
    if (!product) {
      throw { status: 404, message: "Mahsulot topilmadi" };
    }

    return {
      status: 200,
      data: product,
      message: "Mahsulot muvaffaqiyatli o'qildi",
    };
  },

  async update(
    id: string,
    data: Partial<NewProduct>,
    requestingUserId: string,
  ) {
    const existing = await productsRepository.getProductById(id);
    if (!existing) throw { status: 404, message: "Mahsulot topilmadi" };
    if (existing.userId !== requestingUserId) {
      throw {
        status: 403,
        message: "Siz bu mahsulotni yangilash huquqiga ega emassiz",
      };
    }

    const updatedProduct = await productsRepository.updateProduct(id, data);
    return {
      status: 200,
      data: updatedProduct,
      message: "Mahsulot muvaffaqiyatli yangilandi",
    };
  },

  async delete(id: string, requestingUserId: string) {
    const existing = await productsRepository.getProductById(id);
    if (!existing) throw { status: 404, message: "Mahsulot topilmadi" };
    if (existing.userId !== requestingUserId) {
      throw {
        status: 403,
        message: "Siz bu mahsulotni o'chirish huquqiga ega emassiz",
      };
    }

    await productsRepository.deleteProduct(id);
    return { status: 200, message: "Mahsulot muvaffaqiyatli o'chirildi" };
  },

  async getStats(userId: string) {
    const stats = await productsRepository.getStatsOfProducts(userId);
    return {
      status: 200,
      data: stats,
      message: "Mahsulot statistikasi muvaffaqiyatli o'qildi",
    };
  },

  async search(userId: string, query: string) {
    if (!query) {
      return {
        status: 400,
        message: "Qidiruv so'zi talab qilinadi",
      };
    }

    const products = await productsRepository.searchProductsByName(
      userId,
      query,
    );

    return {
      status: 200,
      data: products,
      message: "Mahsulotlar muvaffaqiyatli topildi",
    };
  },
};
