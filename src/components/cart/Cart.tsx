import { useCart } from "@/State/store";

import { Button } from "../ui/button";
import PaymentMethods from "./PaymentMethods";

import { useGetProducts } from "@/hooks/useGetProducts";
import { currencyFormatter } from "@/lib/utils";
import SelectMemberDialog from "../dialogs/SelectMemberDialog";
import SelectMemberCard from "../members/SelectMemberCard";
import CartHeader from "./CartHeader";
import CartProductList from "./CartProductList";
import ConfirmCheckoutSheet from "./ConfirmCheckoutSheet";

const Cart = () => {
  const { data: products } = useGetProducts();

  const {
    cart,
    member,
    getTotal,
    setIsCheckingOut,
    isCheckingOut,
    resetCart,
    setSelectedPaymentMethod,
    selectedPaymentMethod,
  } = useCart();

  const isCartEmpty = cart.length > 0;

  return !isCheckingOut ? (
    <div className="shadow-2xl flex flex-col justify-between w-[600px] h-[calc(100%-70px)]">
      <div>
        <div className="p-2">
          {member ? (
            <SelectMemberCard member={member} mode="view" />
          ) : (
            <SelectMemberDialog />
          )}
        </div>
        <CartHeader cart={cart} resetCart={resetCart} />
      </div>

      {products && <CartProductList products={products} cart={cart} />}

      <div>
        <div className="flex flex-col mr-4 mt-2 text-right gap-2">
          <p className="font-medium text-lg">
            Total Amount :
            <span className="inline-block ml-2 px-2 py-1 text-lg font-semibold bg-yellow-950 text-white rounded">
              {currencyFormatter(getTotal())}
            </span>
          </p>
        </div>
        <div className="p-2">
          <PaymentMethods
            selectedPaymentMethod={selectedPaymentMethod}
            setSelectedPaymentMethod={setSelectedPaymentMethod}
          />
          <Button
            disabled={!isCartEmpty}
            size={"lg"}
            className="flex-1 w-full h-14 text-xl mt-3"
            onClick={() => setIsCheckingOut(true)}
          >
            Checkout ({cart.length})
          </Button>
        </div>
      </div>
    </div>
  ) : (
    <ConfirmCheckoutSheet key={getTotal()} />
  );
};

export default Cart;
