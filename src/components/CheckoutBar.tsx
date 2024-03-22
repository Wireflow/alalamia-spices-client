import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import HomeImage from "../assets/HomeImage.png";
import { useCart, } from "@/State/store";
import { Product } from "@prisma/client";
import HomePage from "./Pages/HomePage";

const CheckoutBar = () => {
  const { cart, setCart } = useCart();




  return (
    <div className="flex gap-2 w-full">
      <div className="w-full">
        <HomePage />
      </div>
      <div className="flex">
        <div className="bg-[#fdfeff] shadow-2xl border-black shadow-black h-full 2xl:w-[450px] w-[350px]">
          <div className="bg-zinc-800">
            <img src={HomeImage} alt="seasoning" className="2xl:h-[230px] h-[130px] w-full" />
          </div>
          <div className="flex justify-between items-center py-2 px-3 gap-3 m-3">
            <p className="text-md font-semibold">Select a member</p>
            <Button variant={"outline"}>Add</Button>
          </div>
          <div className="flex px-4 py-3 justify-between items-end">
            <h2 className="text-4xl font-semibold">Cart</h2>
            <Button onClick={() => setCart([])} className="bg-[#896a3c] flex gap-1 rounded-full">
              Clear <Trash2 color="white" size={15} />
            </Button>
          </div>
          <div className="bg-white border 2xl:h-[450px] h-[350px] flex flex-col gap-2 overflow-hidden overflow-y-scroll">
            {cart.map((cartItem: Product) => (
              <div key={cartItem.id} className="flex justify-between px-5 py-2 border">
                <div className="flex flex-col gap-4">
                  <p className="text-lg font-semibold">{cartItem.name}</p>
                  <div className="flex gap-2 items-center">
                    <Button
                      
                      className="font-medium bg-zinc-600 p-1 rounded-full "
                    >
                      <Plus color="white" size={15} />
                    </Button>
                    <p className="bg-gray-200 rounded-full font-bold px-10">
                      
                    </p>
                    <Button
                 
                      className="font-medium bg-zinc-600 p-1 rounded-full"
                    >
                      <Minus color="white" size={15} />{" "}
                    </Button>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center gap-2">
                  <p className="font-medium text-lg">{cartItem.price}</p>
                  <p className="bg-gray-200 rounded-full p-3 flex justify-center  items-center">
                    <Trash2 color="black" size={15} />
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutBar;
