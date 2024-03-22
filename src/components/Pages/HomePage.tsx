import { ShoppingBasket } from "lucide-react";
import Header from "../Header";
import ProductCard from "../ProductCard";
import { useGetInventory } from "@/hooks/useGetInventory";
import { Product } from "@prisma/client";
import { useAmount, useCart } from "@/State/store";

const HomePage = () => {
  const { data } = useGetInventory();
  const { cart, setCart } = useCart();
  const {amount, setAmount} = useAmount();

  const addToCart = (product: Product, id: string) => {
    const newItem = { ...product, amount: 1 };
  
    const cartItem = cart.find((item) => item.id === id);
    if (cartItem) {
      const newCart = cart.map((item) =>
        item.id === id ? { ...item, amount: item.amount + 1 } : item
      );
      setCart(newCart);
      console.log(newCart)
    } else {
      setCart([...cart, newItem]);
    }
  };
  



  return (
    <div className="w-full">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-5">
          <Header />
          <div className="px-1  flex justify-between gap-10 items-center">
            <h2 className="xl:text-5xl text-2xl font-bold flex items-center gap-1">
              {" "}
              <ShoppingBasket size={50} /> Menu
            </h2>
            <input
              placeholder="Search Inventory"
              className="rounded-full px-5 py-2 border shadow-2xl"
            />
          </div>
        </div>
        <div className="rounded-xl">
          <div className=" rounded-lg p-4 grid 2xl:grid-cols-6 overflow-y-scroll  xl:grid-cols-4 lg:grid-cols-3 grid-cols-1 gap-5 h-[830px]">
            {data?.map((product: Product) => {
              return (
                <ProductCard
                  key={product.id}
                  name={product.name}
                  price={product.price}
                  boxes={product.boxQuantity}
                  addToCart={() => addToCart(product, product.id)}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
