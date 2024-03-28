import { PAYMENT_METHODS, PaymentMethodsType } from "@/constants/cart";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

type PaymentMethodsProps = {
  selectedPaymentMethod: PaymentMethodsType;
  setSelectedPaymentMethod: (method: PaymentMethodsType) => void;
};

const PaymentMethods = ({
  selectedPaymentMethod,
  setSelectedPaymentMethod,
}: PaymentMethodsProps) => {
  return (
    <div className="flex justify-center">
      <div className="flex gap-3 w-full">
        {PAYMENT_METHODS.map((paymentMethod) => (
          <Button
            key={paymentMethod}
            size={"lg"}
            className={cn(
              "bg-accent text-primary flex-1 h-12 rounded-xl hover:text-white",
              {
                "bg-primary text-white":
                  selectedPaymentMethod === paymentMethod,
              }
            )}
            onClick={() => setSelectedPaymentMethod(paymentMethod)}
          >
            {paymentMethod}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethods;
