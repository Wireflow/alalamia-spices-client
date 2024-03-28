import { PurchasedProductType } from "@/types/transaction";
import { Product } from "@prisma/client";
import CartProductCard from "./CartProductCard";

type CartProductListProps = {
  products: Product[];
  cart: PurchasedProductType[];
};

const CartProductList = ({ products, cart }: CartProductListProps) => {
  return (
    <div className="bg-white border h-[650px] max-h-[650px] flex flex-col gap-2 overflow-hidden overflow-y-scroll">
      {cart.map(
        (purchasedProduct) =>
          products && (
            <CartProductCard
              products={products}
              purchasedProduct={purchasedProduct}
            />
          )
      )}
    </div>
  );
};

export default CartProductList;
