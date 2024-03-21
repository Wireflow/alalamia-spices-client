import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import HomePage from "./Pages/HomePage";
import HomeImage from "../assets/HomeImage.png";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

const CheckoutBar = () => {
  return (
    <div className="flex  gap-2 w-full ">
      <div className="w-full">
        <HomePage />
      </div>
      <div className=" flex  ">
        <div className="  bg-[#fdfeff] shadow-2xl border-black shadow-black h-full 2xl:w-[450px] w-[350px]">
          <div className="bg-zinc-800 ">
            <img
              src={HomeImage}
              alt="seasoning"
              className=" 2xl:h-[230px] h-[130px] w-full"
            />
          </div>
          <div className="flex justify-between items-center py-2 px-3  gap-3 m-3">
            <p className="text-md font-semibold">Select a member </p>
            <Button variant={"outline"}>Add</Button>
          </div>
          <div className="flex  px-4 py-3 justify-between items-end ">
            <h2 className="text-4xl font-semibold">Cart</h2>
            <Button className="bg-[#896a3c] flex gap-1 rounded-full">
              Clear <Trash2 color="white" size={15} />{" "}
            </Button>
          </div>
          <div className="bg-white border 2xl:h-[450px] h-[350px] flex flex-col gap-2 overflow-hidden overflow-y-scroll">
            <div className="flex justify-between px-5 py-2 border">
              <div className="flex flex-col gap-4">
                <p className="text-lg font-semibold">Chicken Cube Spices</p>
                <div className="flex gap-2 items-center">
                  <p className="font-medium bg-zinc-600 p-1 rounded-full">
                    <Plus color="white" size={15} />
                  </p>
                  <p className="bg-gray-200 rounded-full font-bold px-10">3</p>
                  <p className="font-medium bg-zinc-600 p-1 rounded-full">
                    <Minus color="white" size={15} />{" "}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center gap-2">
                <p className="font-medium text-lg">$156.99</p>
                <p className="bg-gray-200 rounded-full p-3 flex justify-center  items-center">
                  <Trash2 color="black" size={15} />
                </p>
              </div>
            </div>
            <div className="flex justify-between px-5 py-2 border">
              <div className="flex flex-col gap-4">
                <p className="text-lg font-semibold">Chicken Cube Spices</p>
                <div className="flex gap-2 items-center">
                  <p className="font-medium bg-zinc-600 p-1 rounded-full">
                    <Plus color="white" size={15} />
                  </p>
                  <p className="bg-gray-200 rounded-full font-bold px-10">3</p>
                  <p className="font-medium bg-zinc-600 p-1 rounded-full">
                    <Minus color="white" size={15} />{" "}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center gap-2">
                <p className="font-medium text-lg">$156.99</p>
                <p className="bg-gray-200 rounded-full p-3 flex justify-center  items-center">
                  <Trash2 color="black" size={15} />
                </p>
              </div>
            </div>
            <div className="flex justify-between px-5 py-2 border">
              <div className="flex flex-col gap-4">
                <p className="text-lg font-semibold">Chicken Cube Spices</p>
                <div className="flex gap-2 items-center">
                  <p className="font-medium bg-zinc-600 p-1 rounded-full">
                    <Plus color="white" size={15} />
                  </p>
                  <p className="bg-gray-200 rounded-full font-bold px-10">3</p>
                  <p className="font-medium bg-zinc-600 p-1 rounded-full">
                    <Minus color="white" size={15} />{" "}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center gap-2">
                <p className="font-medium text-lg">$156.99</p>
                <p className="bg-gray-200 rounded-full p-3 flex justify-center  items-center">
                  <Trash2 color="black" size={15} />
                </p>
              </div>
            </div>
            <div className="flex justify-between px-5 py-2 border">
              <div className="flex flex-col gap-4">
                <p className="text-lg font-semibold">Chicken Cube Spices</p>
                <div className="flex gap-2 items-center">
                  <p className="font-medium bg-zinc-600 p-1 rounded-full">
                    <Plus color="white" size={15} />
                  </p>
                  <p className="bg-gray-200 rounded-full font-bold px-10">3</p>
                  <p className="font-medium bg-zinc-600 p-1 rounded-full">
                    <Minus color="white" size={15} />{" "}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center gap-2">
                <p className="font-medium text-lg">$156.99</p>
                <p className="bg-gray-200 rounded-full p-3 flex justify-center  items-center">
                  <Trash2 color="black" size={15} />
                </p>
              </div>
            </div>
            <div className="flex justify-between px-5 py-2 border">
              <div className="flex flex-col gap-4">
                <p className="text-lg font-semibold">Chicken Cube Spices</p>
                <div className="flex gap-2 items-center">
                  <p className="font-medium bg-zinc-600 p-1 rounded-full">
                    <Plus color="white" size={15} />
                  </p>
                  <p className="bg-gray-200 rounded-full font-bold px-10">3</p>
                  <p className="font-medium bg-zinc-600 p-1 rounded-full">
                    <Minus color="white" size={15} />{" "}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center gap-2">
                <p className="font-medium text-lg">$156.99</p>
                <p className="bg-gray-200 rounded-full p-3 flex justify-center  items-center">
                  <Trash2 color="black" size={15} />
                </p>
              </div>
            </div>
          </div>
          <div className=" px-4 py-2">
            <div>
              <div className="flex justify-between">
                <p className="text-md font-medium">Subtotal</p>
                <p className="text-md font-medium">288.49</p>
              </div>
              <div className="flex justify-between">
                <p className="text-md font-medium">Tax</p>
                <p className="text-md font-medium">288.49</p>
              </div>
              <div className="flex justify-between">
                <p className="text-md font-medium">Discount</p>
                <p className="text-md font-medium">288.49</p>
              </div>
            </div>
            <Sheet>
              <SheetTrigger className="bg-[#896a3c] w-full rounded-full mt-4 py-4">
                {" "}
           
                  <p className="text-white  text-center text-xl">Check Out</p>
              
              </SheetTrigger>
              <SheetContent className="w-full" >
                <SheetHeader>
                  <SheetTitle>Checkout</SheetTitle>
               <div className="grid grid-cols-3 gap-5">
                <div className="bg-black p-5 rounded-xl">
                  <p className="text-white text-2xl text-center">Cash</p>
                </div>
                <div className="bg-black p-5 rounded-xl">
                  <p className="text-white text-2xl text-center">Cash</p>
                </div>
                <div className="bg-black p-5 rounded-xl">
                  <p className="text-white text-2xl text-center">Cash</p>
                </div>
               </div>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutBar;
