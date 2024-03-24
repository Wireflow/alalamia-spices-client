import { useCart } from "@/State/store";
import { cn, currencyFormatter } from "@/lib/utils";
import { Product } from "@prisma/client";
import { Plus, ShoppingCart } from "lucide-react";
import { useState } from "react";

type ProductProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductProps) => {
  const [isPulsing, setIsPulsing] = useState(false);

  const addToCart = useCart((state) => state.addItemToCart);
  const isAddedToCart = useCart((state) => state.isProductInCart);

  const handleAddToCart = () => {
    setIsPulsing(true);
    addToCart(product);
    setTimeout(() => {
      setIsPulsing(false);
    }, 500); // Pulse for 1 second
  };

  return (
    <div
      className="bg-[#e8e6e6] h-40 rounded-xl relative p-5 flex items-center justify-center"
      onClick={handleAddToCart}
    >
      <div className="z-20 flex flex-col items-center justify-center">
        {isAddedToCart(product.id) ? (
          <div className="absolute top-2 right-2">
            <ShoppingCart color="brown" />
          </div>
        ) : (
          <></>
        )}
        <p className="text-lg font-bold text-center ">{product.name}</p>
        <p>{currencyFormatter(product.price)}</p>
        <p>{product.boxQuantity}</p>
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
