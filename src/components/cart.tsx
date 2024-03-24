import { useCart } from "@/State/store";
import { Product } from "@prisma/client";
import { CircleX, DeleteIcon, Minus, Plus, Trash, Trash2 } from "lucide-react";
import HomeImage from "../assets/HomeImage.png";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
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
// import { PaymentMethods } from "./PaymentMethods";
import { useState } from "react";
import PaymentMethods from "./PaymentMethods";
import formatCurrency from "@/lib/utils";

const Cart = () => {
    const { cart, setCart } = useCart(); // Retrieve cart and setCart from the useCart hook
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('CASH');

    const clearCart = () => {
        setCart([]); // Clear the cart by setting it to an empty array
    };

    const updateQuantity = (product: Product, quantity: number) => {
        const updatedCart = cart.map((item) => {

            return item.id === product.id ? { ...item, quantity } : item;
        }
        );

        if (quantity <= 0) {
            removeFromCart(product);
        } else {

            setCart(updatedCart); // Update the cart with the new quantity
        }
    };

    const removeFromCart = (product: Product) => {
        const updatedCart = cart.filter((item) => item.id !== product.id);
        setCart(updatedCart); // Remove the item from the cart
    };
    const handleCheckout = () => {
        // Logic for handling the checkout action
    };
    const handlePaymentMethodChange = (value: string) => {

        setSelectedPaymentMethod(value);
    };
    let totalPrice = 0;
    return (
        <div className="flex">
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
                <div className="flex px-4 py-3 justify-between items-end">
                    <div className="relative">
                        <h2 className="text-4xl font-semibold">
                            Cart
                            {cart.length > 0 && (
                                <span className="inline-block ml-2 px-2 py-1 text-sm font-semibold bg-red-500 text-white rounded-full">
                                    {cart.length}
                                </span>
                            )}
                        </h2>
                    </div>
                    <Button onClick={clearCart} className=" flex gap-1 rounded-full">
                        Empty <Trash2 color="white" size={15} />
                    </Button>
                </div>

                <div className="bg-white border 2xl:h-[450px] h-[350px] flex flex-col gap-2 overflow-hidden overflow-y-scroll">
                    {


                        cart.map((cartItem: Product) => {
                            let totalQtyPrice = cartItem.price * (cartItem.quantity || 0);
                            totalPrice += totalQtyPrice;
                            return (

                                <div
                                    key={cartItem.id}
                                    className="flex justify-between mt-1 mx-1 px-5  py-2 border rounded"
                                >
                                    <div className="flex flex-col gap-2 ">
                                        <p className="text-md font-semibold">{cartItem.name}</p>
                                        <div className="flex gap-2 items-center">
                                            <Button
                                                className="font-medium bg-zinc-600 p-1 rounded-full"
                                                onClick={() => updateQuantity(cartItem, (cartItem.quantity || 1) + 1)}
                                            >
                                                <Plus color="white" size={15} />
                                            </Button>
                                            <p className="bg-gray-200 rounded-full font-bold px-10">
                                                {cartItem.quantity}
                                            </p>
                                            <Button
                                                className="font-medium bg-zinc-600 p-1 rounded-full"
                                                onClick={() => updateQuantity(cartItem, (cartItem.quantity || 1) - 1)}
                                            >
                                                <Minus color="white" size={15} />{" "}
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-center justify-center gap-2">
                                        <p className="font-medium text-lg">{formatCurrency(totalQtyPrice)}</p>
                                        <p className="bg-gray-200 rounded-full p-3 flex justify-center  items-center">
                                            <Trash
                                                color="red"
                                                size={15}
                                                onClick={() => removeFromCart(cartItem)} />
                                        </p>
                                    </div>
                                </div>

                            );
                        })


                    }
                </div>
                
                    <div className="flex flex-col mr-4 mt-2 text-right gap-2">
                        <p className="font-medium text-lg">Total Amount :<span className="inline-block ml-2 px-2 py-1 text-lg font-semibold bg-blue-500 text-white rounded">{formatCurrency(totalPrice)}</span> </p> 
                        
                    </div>
                    {cart.length > 0 && (
                        <PaymentMethods
                            key={selectedPaymentMethod} // Add a unique key prop
                            selectedPaymentMethod={selectedPaymentMethod}
                            onPaymentMethodChange={handlePaymentMethodChange} />)}


                    <div className="flex justify-center">


                        <Sheet>
                            <SheetTrigger>
                                {cart.length > 0 && (
                                    <div>

                                        <Button
                                            className=" flex gap-1 rounded-full w-full m-2 p-2"
                                            onClick={handleCheckout}
                                        >
                                            Checkout ({cart.length}) product{cart.length > 1 ? "s" : ""}
                                        </Button>
                                    </div>
                                )}
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

                                    {
                                        selectedPaymentMethod == "CHECK" &&

                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="name" className="text-right">
                                                Check Number :
                                            </Label>
                                            <Input
                                                id="checkNumber"

                                                className="col-span-3"

                                            />
                                        </div>
                                    }


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
