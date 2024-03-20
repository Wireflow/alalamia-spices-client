import { Plus } from "lucide-react";


const ProductCard = () => {
  return (
    <div className="bg-[#e8e6e6] relative h-40 rounded-xl p-5 m">
      <p className="text-md font-medium ">Chicken Cube Spices</p>
      <div className="absolute right-0 bottom-0 bg-[#4a392c] p-4 rounded-tl-lg"><Plus color="white"/></div>
   
    </div>
  );
};

export default ProductCard;
