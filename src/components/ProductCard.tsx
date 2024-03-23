import {  Plus, ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";


type ProductProps = {
  name: string;
  price: number;
  boxes: number | null;
  
  addToCart: () => void;
  isAddedToCart: boolean;
};

const ProductCard = (product: ProductProps) => {

  return (
    <div className="bg-[#e8e6e6] relative h-40 rounded-xl p-5 m">
      {product.isAddedToCart ? (
        <div>
          
          <ShoppingCart color="green" />

         
          {/* <span >{product.quantity||1}</span> */}
        </div>
      ) : (
        <></>

      )}
      <p className="text-md font-medium ">{product.name}</p>
      <p>{product.price}</p>
      <p>{product.boxes}</p>
      <Button
        onClick={product.addToCart}
        className="absolute right-0 bottom-0 bg-[#4a392c] p-4 rounded-tl-lg"
      >
        <Plus color="white" />
      </Button>
    </div>
  );
};

export default ProductCard;
