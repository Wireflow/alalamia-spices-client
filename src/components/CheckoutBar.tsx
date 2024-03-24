import HomePage from "./pages/HomePage";
import Cart from "./Cart";

const CheckoutBar = () => {
  return (
    <div className="flex gap-2 w-full">
      <HomePage />
      <Cart />
    </div>
  );
};

export default CheckoutBar;
