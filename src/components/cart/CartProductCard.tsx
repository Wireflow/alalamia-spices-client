import { useCart } from "@/State/store";
import { PurchasedProductType } from "@/types/transaction";
import { Product } from "@prisma/client";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "../ui/button";

type CartProductCardProps = {
  purchasedProduct: PurchasedProductType;
  products: Product[];
};

const CartProductCard = ({
  purchasedProduct,
  products,
}: CartProductCardProps) => {
  const decreaseProductQuantity = useCart(
    (state) => state.decreaseProductQuantity
  );
  const removeItemFromCart = useCart((state) => state.removeItemFromCart);
  const increaseProductQuantity = useCart(
    (state) => state.increaseProductQuantity
  );

  return (
    <div
      key={purchasedProduct.productId}
      className="flex justify-between mt-1 mx-1 px-5 py-2 border rounded"
    >
      <div className="flex flex-col gap-2">
        <p className="text-md font-semibold">{purchasedProduct.name}</p>
        <div className="flex gap-2 items-start justify-start">
          <Button
            className="p-3 rounded-full"
            onClick={() => decreaseProductQuantity(purchasedProduct)}
          >
            <Minus color="white" size={15} />{" "}
          </Button>

          <div className=" max-w-20 bg-secondary border-2 py-1 rounded-full w-full flex items-center justify-center">
            <p className="font-bold px-10">
              {purchasedProduct.purchaseQuantity}
            </p>
          </div>
          <Button
            className="p-3 rounded-full"
            onClick={() => {
              products && increaseProductQuantity(purchasedProduct, products);
            }}
          >
            <Plus color="white" size={15} />
          </Button>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-2">
        <p className="font-medium text-lg">
          {/* {currencyFormatter(getTotalQuantity())} */}
        </p>
        <Button
          variant={"destructive"}
          className="rounded-full px-3 flex justify-center  items-center"
          onClick={() => removeItemFromCart(purchasedProduct)}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default CartProductCard;
