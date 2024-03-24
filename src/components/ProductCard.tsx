import {  BaggageClaim, Plus } from "lucide-react";
import { Button } from "./ui/button";
import formatCurrency from "@/lib/utils";


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
        <div className="absolute top-2 right-2">
          
          <BaggageClaim  color="brown"/>

         
          {/* <span >{product.quantity||1}</span> */}
        </div>
      ) : (
        <></>

      )}
      <p className="text-md font-medium ">{product.name}</p>
      <p>{formatCurrency(product.price)}</p>
      <p>{product.boxes}</p>
      <Button
        onClick={product.addToCart}
        className="absolute right-0 bottom-0 bg-[#4a392c] p-2 rounded-tl-lg rounded-tr-none rounded-bl-none rounded-br-lg shadow-lg"
      >
        <Plus color="white" />
      </Button>
    </div>
  );
};

export default ProductCard;
