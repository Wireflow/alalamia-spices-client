import { useCart } from "@/State/store";
import { cn, currencyFormatter } from "@/lib/utils";
import { Product } from "@prisma/client";
import { Plus, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { useGetProducts } from "@/hooks/useGetProducts";

type ProductProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductProps) => {
  const [isPulsing, setIsPulsing] = useState(false);
  const [isQuantityError, setIsQuantityError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const { data: products } = useGetProducts();

  const addToCart = useCart((state) => state.addItemToCart);
  const isProductInCart = useCart((state) => state.isProductInCart);
  const cart = useCart((state) => state.cart);
  const productQuantity = (product.boxQuantity && product.boxQuantity) || 0;

  const handleAddToCart = () => {
    setIsPulsing(true);
    if (productQuantity < 1) {
      setIsQuantityError(true);
    }
    if (productQuantity >= 1) {
      products && addToCart(product, products);
      setIsSuccess(true);
    }
    setTimeout(() => {
      setIsPulsing(false);
      setIsSuccess(false);
      setIsQuantityError(false);
    }, 500);
  };

  useEffect(() => {
    setIsAdded(isProductInCart(product.id));
  }, [cart, product.id, isProductInCart]);

  return (
    <div
      className={cn(
        "bg-[#e8e6e6] h-40  rounded-xl relative flex items-center justify-center",
        {
          "bg-red-200": isQuantityError,
          "bg-green-200": isSuccess,
        }
      )}
      onClick={handleAddToCart}
    >
      <div className="z-20 flex flex-col items-center justify-center w-full h-full">
        {isAdded ? (
          <div className="absolute top-2 right-2">
            <ShoppingCart color="brown" />
          </div>
        ) : null}
        <p className=" font-bold text-center w-40">
          {product.name}
        </p>
        <p>{currencyFormatter(product.price)}</p>
        <Badge
          variant={"outline"}
          className={cn("h-7 text-base mt-2 text-black whitespace-nowrap", {
            "bg-green-300 border-green-600 border-2 ":
              product.boxQuantity && product.boxQuantity >= 50,
            "bg-orange-200 border-orange-400 border-2 ":
              product.boxQuantity && product.boxQuantity <= 50,
            "bg-red-200 border-red-400 border-2":
              (product.boxQuantity && product.boxQuantity <= 10) ||
              !product.boxQuantity,
            "bg-red-500": isQuantityError,
          })}
        >
          In Stock: {product.boxQuantity || 0}
        </Badge>
      </div>
      <Plus
        className={cn(
          "absolute w-1/2 h-1/2 z-10 text-primary opacity-0  transition-all duration-500",
          { "animate-ping opacity-50": isPulsing }
        )}
      />
    </div>
  );
};

export default ProductCard;
