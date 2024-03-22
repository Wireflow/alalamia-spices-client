
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom";

function Financials() {
  return <div className=" w-full">
    <div className="p-4">
      <div className="bg-white  rounded-xl p-3 border border-gray-400 ">
        <Link to="/expenses">
          <Button>Expenses</Button>
        </Link>
      </div>
    </div>

  </div>;
}


export default Financials;
