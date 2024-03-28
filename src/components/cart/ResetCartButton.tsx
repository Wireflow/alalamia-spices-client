import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";

type ResetCartButtonProps = {
  resetCart: () => void;
};

const ResetCartButton = ({ resetCart }: ResetCartButtonProps) => {
  return (
    <Button onClick={resetCart} className=" flex gap-1 rounded-full">
      Reset <Trash2 color="white" size={15} />
    </Button>
  );
};

export default ResetCartButton;
