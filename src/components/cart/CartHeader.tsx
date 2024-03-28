import { PurchasedProductType } from "@/types/transaction";
import ResetCartButton from "./ResetCartButton";
import { Badge } from "../ui/badge";

type CartHeaderProps = {
  cart: PurchasedProductType[];
  resetCart: () => void;
};

const CartHeader = ({ cart, resetCart }: CartHeaderProps) => {
  return (
    <div className="flex px-4 py-3 justify-between items-center">
      <div className="inline-flex items-end justify-center gap-2">
        <h2 className="text-4xl font-semibold">Cart</h2>
        <Badge
          variant={"destructive"}
          className="text-lg rounded-full w-8 h-8 justify-center"
        >
          {cart.length}
        </Badge>
      </div>
      <ResetCartButton resetCart={resetCart} />
    </div>
  );
};

export default CartHeader;
