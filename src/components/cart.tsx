import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import HomeImage from "../assets/HomeImage.png";
import { useCart } from "@/State/store";
import { Product } from "@prisma/client";

const Cart = () => {
  const { cart, setCart } = useCart(); // Retrieve cart and setCart from the useCart hook

  const clearCart = () => {
    setCart([]); // Clear the cart by setting it to an empty array
  };

  const updateQuantity = (product: Product, quantity: number) => {
    const updatedCart = cart.map((item) =>
      item.id === product.id ? { ...item, quantity } : item
    );
    setCart(updatedCart); // Update the cart with the new quantity
  };

  const removeFromCart = (product: Product) => {
    const updatedCart = cart.filter((item) => item.id !== product.id);
    setCart(updatedCart); // Remove the item from the cart
  };

  return (
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
          <Button onClick={clearCart} className=" flex gap-1 rounded-full">
            Clear <Trash2 color="white" size={15} />
          </Button>
        </div>
        <div className="bg-white border 2xl:h-[450px] h-[350px] flex flex-col gap-2 overflow-hidden overflow-y-scroll">
          {cart.map((cartItem: Product) => (
            <div key={cartItem.id} className="flex justify-between px-5 py-2 border">
              <div className="flex flex-col gap-4">
                <p className="text-lg font-semibold">{cartItem.name}</p>
                <div className="flex gap-2 items-center">
                  <Button className="font-medium bg-zinc-600 p-1 rounded-full"
                  onClick={() => updateQuantity(cartItem, (cartItem.quantity || 1) + 1)}>
                    <Plus color="white" size={15} />
                  </Button>
                  <p className="bg-gray-200 rounded-full font-bold px-10">{cartItem.quantity}</p>
                  <Button className="font-medium bg-zinc-600 p-1 rounded-full"
                  onClick={() => updateQuantity(cartItem, (cartItem.quantity || 1) - 1)}>
                    <Minus color="white" size={15} />{" "}
                  </Button>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center gap-2">
                <p className="font-medium text-lg">{cartItem.price}</p>
                <p className="bg-gray-200 rounded-full p-3 flex justify-center  items-center">
                  <Trash2 color="red" size={15} 
                  onClick={()=>removeFromCart(cartItem)}/>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cart;