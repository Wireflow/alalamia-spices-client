import HomePage from "./pages/HomePage";
import Cart from "./cart/Cart";

const CheckoutBar = () => {
  return (
    <div className="flex gap-2 w-full h-screen">
      <HomePage />
      <Cart />
    </div>
  );
};

export default CheckoutBar;
