import { useCart } from "@/State/store";
import { currencyFormatter } from "@/lib/utils";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useEffect } from "react";
 import HomeImage from "@/assets/HomeImage.png";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";
import PaymentMethods from "@/components/PaymentMethods";
import { Button } from "@/components/ui/button";

import { Badge } from "@/components/ui/badge";
import NewTransactionForm from "@/components/transactions/NewTransactionForm";
import SelectMemberComboBox from "./SelectMember";

const Cart = () => {
  const {
    cart,
    removeItemFromCart,
    updateItemQuantity,
    clearCart,
    selectedPaymentMethod,
  } = useCart();

  const handleCheckout = () => {
    // Logic for handling the checkout action
  };

  useEffect(() => {
    console.log(cart);
  }, [cart]);

  let totalPrice = 0;
  return (
    <div className="shadow-2xl flex flex-col justify-between border-black shadow-black w-[600px] h-[calc(100%-70px)]">
      <div>
        <div className="bg-zinc-800">
          <img
            src={HomeImage}
            alt="seasoning"
            className="2xl:h-[100px] h-[100px] w-full"
          />
        </div>
        <div className="flex justify-between items-center py-2 px-3 gap-3 m-3">
          {/* <p className="text-md font-semibold">Select a member</p> */}
          <SelectMemberComboBox />
          <Button variant={"outline"}>Add</Button>
        </div>
        <div className="flex px-4 py-3 justify-between items-center">
          <div className="inline-flex items-end justify-center gap-2">
            <h2 className="text-4xl font-semibold">Cart</h2>
            <Badge
              variant={"destructive"}
              className="text-lg rounded-full w-10 justify-center"
            >
              {cart.length}
            </Badge>
          </div>
          <Button onClick={clearCart} className=" flex gap-1 rounded-full">
            Empty <Trash2 color="white" size={15} />
          </Button>
        </div>
      </div>

      <div className="bg-white border h-[650px] max-h-[650px] flex flex-col gap-2 overflow-hidden overflow-y-scroll">
        {cart.map((cartItem) => {
          const totalQtyPrice =
            cartItem.price * (cartItem.purchaseQuantity || 0);
          totalPrice += totalQtyPrice;
          return (
            <div
              key={cartItem.productId}
              className="flex justify-between mt-1 mx-1 px-5 py-2 border rounded"
            >
              <div className="flex flex-col gap-2">
                <p className="text-md font-semibold">{cartItem.name}</p>
                <div className="flex gap-2 items-center">
                  <Button
                    className="p-3 rounded-full"
                    onClick={() =>
                      updateItemQuantity(
                        cartItem,
                        (cartItem.purchaseQuantity || 1) - 1
                      )
                    }
                  >
                    <Minus color="white" size={15} />{" "}
                  </Button>

                  <p className="bg-secondary border-2 py-1 rounded-full font-bold px-10 w-full max-w-30">
                    {cartItem.purchaseQuantity}
                  </p>
                  <Button
                    className="p-3 rounded-full"
                    onClick={() =>
                      updateItemQuantity(
                        cartItem,
                        (cartItem.purchaseQuantity || 1) + 1
                      )
                    }
                  >
                    <Plus color="white" size={15} />
                  </Button>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center gap-2">
                <p className="font-medium text-lg">
                  {currencyFormatter(totalQtyPrice)}
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
            <span className="inline-block ml-2 px-2 py-1 text-lg font-semibold bg-blue-500 text-white rounded">
              {currencyFormatter(totalPrice)}
            </span>
          </p>
        </div>
        <PaymentMethods />

        <Sheet>
          <SheetTrigger className="p-2 w-full">
            <Button
              size={"lg"}
              className="flex-1 w-full h-14 text-xl "
              onClick={handleCheckout}
            >
              Checkout ({cart.length})
            </Button>
          </SheetTrigger>
          <SheetContent>
            {/* {selectedPaymentMethod == 'CASH' ? <p>cash</p> : <p>check</p>} */}
            <NewTransactionForm setOpen={()=>true} 
              paymentMethod={selectedPaymentMethod} 
              totalAmount={totalPrice} 
              memberId={""} 
              products={cart.map((item)=>item.productId)} />
            {/* <SheetFooter>
              <SheetClose asChild>
                <Button type="submit">Save changes</Button>
              </SheetClose>
            </SheetFooter> */}
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default Cart;