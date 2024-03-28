import ProductCard from "@/components/cart/ProductCard";
import { useGetProducts } from "@/hooks/useGetProducts";
import { useHomeProductFilter } from "@/store/useHomeProductFilterStore";
import { Product } from "@prisma/client";
import { useEffect } from "react";

const CheckoutProductCatalog = () => {
  const {
    setFilteredProducts,
    filteredProducts,
    search,
    filterProducts,
    setProducts,
  } = useHomeProductFilter();
  const { data } = useGetProducts();

  useEffect(() => {
    if (data) {
      setFilteredProducts(data);
      setProducts(data);
    }
  }, [data, setFilteredProducts, setProducts]);

  useEffect(() => {
    filterProducts();
  }, [search, filterProducts]);

  const products = search ? filteredProducts : data;

  return (
    <div className="grid 2xl:grid-cols-5 overflow-y-scroll xl:grid-cols-4 lg:grid-cols-3 grid-cols-1 gap-5 pr-2">
      {products?.map((product: Product) => {
        return <ProductCard key={product.id} product={product} />;
      })}
    </div>
  );
};

export default CheckoutProductCatalog;
