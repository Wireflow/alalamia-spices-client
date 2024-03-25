import Cart from "./cart/Cart";
import HomePage from "./Pages/HomePage";

const CheckoutBar = () => {
  return (
    <div className="flex gap-2 w-full h-screen">
      <HomePage />
      <Cart />
    </div>
  );
};

export default CheckoutBar;
