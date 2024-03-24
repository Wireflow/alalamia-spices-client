import { useCart } from "@/State/store";
import { currencyFormatter } from "@/lib/utils";
import { Minus, Plus, Trash2 } from "lucide-react";
import HomeImage from "../../assets/HomeImage.png";
import PaymentMethods from "../PaymentMethods";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "../ui/sheet";
import { useEffect } from "react";
import { Badge } from "../ui/badge";
import SelectMemberForm from "../forms/SelectMemberForm";

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
    <div className="flex h-full">
      <div className="bg-[#fdfeff] shadow-2xl border-black shadow-black h-full 2xl:w-[450px] w-[350px]">
        <div className="bg-zinc-800">
          <img
            src={HomeImage}
            alt="seasoning"
            className="2xl:h-[100px] h-[100px] w-full"
          />
        </div>
        <div className="flex justify-between items-center py-2 px-3 gap-3 m-3">
          <p className="text-md font-semibold">Select a member</p>
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

        <div className="bg-white border 2xl:h-[450px] h-[350px] flex flex-col gap-2 overflow-hidden overflow-y-scroll">
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

        <div className="flex flex-col mr-4 mt-2 text-right gap-2">
          <p className="font-medium text-lg">
            Total Amount :
            <span className="inline-block ml-2 px-2 py-1 text-lg font-semibold bg-blue-500 text-white rounded">
              {currencyFormatter(totalPrice)}
            </span>{" "}
          </p>
        </div>
        <PaymentMethods />
        <SelectMemberForm />

        <div className="flex justify-center">
          <Sheet>
            <SheetTrigger className="p-2 w-full">
              <div>
                <Button
                  size={"lg"}
                  className="flex-1 w-full h-14 text-xl"
                  onClick={handleCheckout}
                >
                  Checkout ({cart.length})
                </Button>
              </div>
            </SheetTrigger>

            <SheetContent>
              {/* {selectedPaymentMethod == 'CASH' ? <p>cash</p> : <p>check</p>} */}
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Amount
                  </Label>
                  <Input
                    id="totalAmount"
                    value={totalPrice}
                    className="col-span-3"
                    disabled
                  />
                </div>

                {selectedPaymentMethod == "CHECK" && (
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Check Number :
                    </Label>
                    <Input id="checkNumber" className="col-span-3" />
                  </div>
                )}
              </div>
              <SheetFooter>
                <SheetClose asChild>
                  <Button type="submit">Save changes</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};

export default Cart;
