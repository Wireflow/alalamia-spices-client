import Cart from "../cart/Cart";
import Checkout from "../cart/Checkout";

const HomePage = () => {
  return (
    <div className="flex gap-2 w-full h-screen">
      <Checkout />
      <Cart />
    </div>
  );
};

export default HomePage;
