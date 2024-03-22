import { Plus } from "lucide-react";
import { Button } from "./ui/button";


type ProductProps = {
  name: string;
  price: number;
  boxes: number | null;
  addToCart: () => void;
};

const ProductCard = (Products: ProductProps) => {
  return (
    <div className="bg-[#e8e6e6] relative h-40 rounded-xl p-5 m">
      <p className="text-md font-medium ">{Products.name}</p>
      <p>{Products.price}</p>
      <p>{Products.boxes}</p>
      <Button
        onClick={Products.addToCart}
        className="absolute right-0 bottom-0 bg-[#4a392c] p-4 rounded-tl-lg"
      >
        <Plus color="white" />
      </Button>
    </div>
  );
};

export default ProductCard;
