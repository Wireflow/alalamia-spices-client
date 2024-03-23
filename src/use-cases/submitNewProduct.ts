import { api } from "@/services/axiosInstance";
import { ProductType } from "@/types/product";
import { Product } from "@prisma/client";

const submitNewProduct = async (
  product: ProductType
): Promise<Product | null> => {
  try {
    const response = await api.post("/products", product);

    return response.data.data;
  } catch (error) {
    console.error("Failed to submit new product:", error);
    return null;
  }
};

export default submitNewProduct;
