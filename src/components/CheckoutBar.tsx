import Cart from "./pages/Cart/Cart";
import HomePage from "./pages/HomePage";

const CheckoutBar = () => {
  return (
    <div className="flex gap-2 w-full h-screen">
      <HomePage />
      <Cart />
    </div>
  );
};

export default CheckoutBar;
