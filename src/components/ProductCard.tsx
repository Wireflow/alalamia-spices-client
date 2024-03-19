import { Plus } from "lucide-react";


const ProductCard = () => {
  return (
    <div className="bg-zinc-200 relative h-40 rounded-xl p-5">
      <p className="text-lg font-medium text-center">Chicken Cube Spices</p>
      <div className="absolute right-0 bottom-0 bg-black p-4 rounded-tl-lg"><Plus color="white"/></div>
   
    </div>
  );
};

export default ProductCard;
