import { api } from "@/services/axiosInstance";
import { ProductType } from "@/types/product";
import { Product } from "@prisma/client";

const updateProduct = async (product: ProductType): Promise<Product | null> => {
  try {
    const response = await api.put(`/products/${product.id}`, product);

    return response.data;
  } catch (error) {
    console.error("Failed to update product:", error);
    return null;
  }
};

export default updateProduct;
