import { useCart } from "@/State/store";
import useBarcodeScanner from "@/hooks/useBarcodeScanner";
import { useGetProducts } from "@/hooks/useGetProducts";
import { ShoppingBasket } from "lucide-react";
import SelectMemberForm from "../forms/SelectMemberForm";
import HomePageProducts from "../Pages/homepage/HomePageProducts";
import HomePageProductsSearchBox from "../Pages/homepage/HomePageProductsSearchBox";

const HomePage = () => {
  const { data: products } = useGetProducts();
  const addToCart = useCart((state) => state.addItemToCart);

  useBarcodeScanner({
    onComplete: (sku) => {
      const product = products?.find((product) => product.sku === sku);
      if (product) {
        addToCart(product);
      } else {
        console.log(sku);
      }
    },
  });

  return (
    <div className="flex flex-col gap-8 p-4 w-full">
      <div className="flex justify-between gap-10 items-center mt-2">
        <h2 className="text-3xl font-semi flex items-center gap-1">
          Menu <ShoppingBasket className="w-8 h-8 ml-1" />
        </h2>
        <HomePageProductsSearchBox />
      </div>
      <SelectMemberForm />
      <HomePageProducts />
    </div>
  );
};

export default HomePage;
