import { Plus } from "lucide-react";

type ProductProps = {
  name: string,
  price: number,
  boxes: number | null
}

const ProductCard = (Products: ProductProps) => {
  return (
    <div className="bg-[#e8e6e6] relative h-40 rounded-xl p-5 m">
      <p className="text-md font-medium ">{Products.name}</p>
      <p>{Products.price}</p>
      <p>{Products.boxes}</p>
      <div className="absolute right-0 bottom-0 bg-[#4a392c] p-4 rounded-tl-lg"><Plus color="white"/></div>
   
    </div>
  );
};

export default ProductCard;
