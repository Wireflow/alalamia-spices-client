import { useCart } from "@/State/store";

import { Minus, Plus, Trash2 } from "lucide-react";
import HomeImage from "../../assets/HomeImage.png";
import PaymentMethods from "../PaymentMethods";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

import ConfirmCheckoutSheet from "./ConfirmCheckoutSheet";
import SelectMemberDialog from "../dialogs/SelectMemberDialog";
import SelectMemberCard from "../members/SelectMemberCard";
import { useGetProducts } from "@/hooks/useGetProducts";
import { currencyFormatter } from "@/lib/utils";

const Cart = () => {
  const { data: products } = useGetProducts();
  const {
    cart,
    removeItemFromCart,
    increaseProductQuantity,
    decreaseProductQuantity,
    resetCart,
    member,
    getTotal,
    setIsCheckingOut,
    isCheckingOut,
  } = useCart();
  const isCartEmpty = cart.length > 0;

  return !isCheckingOut ? (
    <div className="shadow-2xl flex flex-col justify-between border-black shadow-black w-[600px] h-[calc(100%-70px)]">
      <div>
        <div className="bg-zinc-800">
          <img
            src={HomeImage}
            alt="seasoning"
            className="2xl:h-[100px] h-[100px] w-full"
          />
        </div>
        <div className="p-2">
          {member ? (
            <SelectMemberCard member={member} viewOnly />
          ) : (
            <SelectMemberDialog />
          )}
        </div>
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
          <Button onClick={resetCart} className=" flex gap-1 rounded-full">
            Reset <Trash2 color="white" size={15} />
          </Button>
        </div>
      </div>

      <div className="bg-white border h-[650px] max-h-[650px] flex flex-col gap-2 overflow-hidden overflow-y-scroll">
        {cart.map((cartItem) => {
          return (
            <div
              key={cartItem.productId}
              className="flex justify-between mt-1 mx-1 px-5 py-2 border rounded"
            >
              <div className="flex flex-col gap-2">
                <p className="text-md font-semibold">{cartItem.name}</p>
                <div className="flex gap-2 items-start justify-start">
                  <Button
                    className="p-3 rounded-full"
                    onClick={() => decreaseProductQuantity(cartItem)}
                  >
                    <Minus color="white" size={15} />{" "}
                  </Button>

                  <div className=" max-w-20 bg-secondary border-2 py-1 rounded-full w-full flex items-center justify-center">
                    <p className="font-bold px-10">
                      {cartItem.purchaseQuantity}
                    </p>
                  </div>
                  <Button
                    className="p-3 rounded-full"
                    onClick={() => {
                      products && increaseProductQuantity(cartItem, products);
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
                  onClick={() => removeItemFromCart(cartItem)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      <div>
        <div className="flex flex-col mr-4 mt-2 text-right gap-2">
          <p className="font-medium text-lg">
            Total Amount :
            <span className="inline-block ml-2 px-2 py-1 text-lg font-semibold bg-yellow-950 text-white rounded">
              {currencyFormatter(getTotal())}
            </span>
          </p>
        </div>
        <PaymentMethods />
        <Button
          disabled={!isCartEmpty}
          size={"lg"}
          className="flex-1 w-full h-14 text-xl "
          onClick={() => setIsCheckingOut(true)}
        >
          Checkout ({cart.length})
        </Button>
      </div>
    </div>
  ) : (
    
    <ConfirmCheckoutSheet key={getTotal()} />
  );
};

export default Cart;
