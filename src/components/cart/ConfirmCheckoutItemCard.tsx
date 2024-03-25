import { PurchasedProductType } from "@/types/transaction";

type Props = {
  product: PurchasedProductType;
};

const ConfirmCheckoutItemCard = ({ product }: Props) => {
  return (
    <div className="flex items-center justify-between capitalize border p-2 rounded-xl bg-secondary">
      <p className="font-semibold flex items-center">
        {product.name}
        <span className="ml-1">({product.purchaseQuantity})</span>
      </p>
      <p className="font-semibold">
        {product.price * product.purchaseQuantity}
      </p>
    </div>
  );
};

export default ConfirmCheckoutItemCard;
