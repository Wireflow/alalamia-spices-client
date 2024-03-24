import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import HomeImage from "../assets/HomeImage.png";
import { useCart } from "@/State/store";
import { Product } from "@prisma/client";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { currencyFormatter } from "@/lib/utils";

const Cart = () => {
  const { cart, clearCart, updateItemQuantity, removeItemFromCart } = useCart(); // Retrieve cart and setCart from the useCart hook

  const handleCheckout = () => {
    // Logic for handling the checkout action
  };

  return (
    <div className="flex">
      <div className="bg-[#fdfeff] border-black shadow-black h-full 2xl:w-[450px] w-[350px]">
        <div className="bg-zinc-800">
          <img
            src={HomeImage}
            alt="seasoning"
            className="2xl:h-[230px] h-[130px] w-full"
          />
        </div>
        <div className="flex justify-between items-center py-2 px-3 gap-3 m-3">
          <p className="text-md font-semibold">Select a member</p>
          <Button variant={"outline"}>Add</Button>
        </div>
        <div className="flex px-4 py-3 justify-between items-end">
          <h2 className="text-4xl font-semibold">Cart</h2>
          <Button onClick={clearCart} className=" flex gap-1 rounded-full">
            Clear <Trash2 color="white" size={15} />
          </Button>
        </div>
        <div className="bg-white border 2xl:h-[450px] h-[350px] flex flex-col gap-2 overflow-hidden overflow-y-scroll">
          {cart.map((cartItem: Product) => (
            <div
              key={cartItem.id}
              className="flex justify-between px-5 py-2 border w-full"
            >
              <div className="flex flex-col gap-4 w-full">
                <p className="text-lg font-bold">{cartItem.name}</p>
                <div className="flex gap-2 items-center w-full">
                  <Button
                    className="p-3 rounded-full"
                    onClick={() =>
                      updateItemQuantity(cartItem, (cartItem.quantity || 1) - 1)
                    }
                  >
                    <Minus color="white" strokeWidth={3} size={20} />{" "}
                  </Button>

                  <p className="bg-secondary py-1  border-2 rounded-full font-bold text-center w-full max-w-20">
                    {cartItem.quantity}
                  </p>

                  <Button
                    className="p-3 rounded-full"
                    onClick={() =>
                      updateItemQuantity(cartItem, (cartItem.quantity || 1) + 1)
                    }
                  >
                    <Plus color="white" strokeWidth={3} size={20} />
                  </Button>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center gap-2">
                <p className="font-medium text-lg">
                  {currencyFormatter(cartItem.price)}
                </p>
                <Button
                  variant={"destructive"}
                  className="rounded-full p-3 flex justify-center  items-center"
                  onClick={() => removeItemFromCart(cartItem)}
                >
                  <Trash2 size={15} />
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div>
          <Sheet>
            <SheetTrigger asChild>
              {cart.length > 0 && (
                <Button
                  className=" flex gap-1 rounded-full w-full m-2 p-2"
                  onClick={handleCheckout}
                >
                  Checkout ({cart.length}) products
                </Button>
              )}
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Edit profile</SheetTitle>
                <SheetDescription>
                  Make changes to your profile here. Click save when you're
                  done.
                </SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value="Pedro Duarte"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Username
                  </Label>
                  <Input
                    id="username"
                    value="@peduarte"
                    className="col-span-3"
                  />
                </div>
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
