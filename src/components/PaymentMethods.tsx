// import React, { ChangeEvent } from 'react';
// import { Label } from '@/components/ui/label';
// import { RadioGroup, RadioGroupItem } from '@/src/components/ui/radio-group';

// interface PaymentMethodsProps {
//   selectedPaymentMethod: string;
//   onPaymentMethodChange: (value: string) => void;
// }

// const PaymentMethods: React.FC<PaymentMethodsProps> = ({ selectedPaymentMethod, onPaymentMethodChange }) => {
//   const handlePaymentMethodChange = (event: ChangeEvent<HTMLInputElement>) => {
//     const selectedValue = event.target.value;

//     onPaymentMethodChange(selectedValue);
//   };

//   return (
//     <div className="m-2 flex justify-center">
//       {/* <Label htmlFor="radioGroup">Payment Method: &nbsp;</Label> */}
//       <RadioGroup
//         defaultValue={selectedPaymentMethod}
//         className="flex items-center space-x-2"
//         onChange={handlePaymentMethodChange}
//       >
//         <div className="flex items-center space-x-2">
//           <RadioGroupItem value="CASH" id="r1" />
//           <Label htmlFor="r1">Cash</Label>
//         </div>
//         <div className="flex items-center space-x-2">
//           <RadioGroupItem value="CHECK" id="r2" />
//           <Label htmlFor="r2">Check</Label>
//         </div>
//         <div className="flex items-center space-x-2">
//           <RadioGroupItem value="CARD" id="r2" />
//           <Label htmlFor="r2">Card</Label>
//         </div>
//       </RadioGroup>
//     </div>
//   );
// };

// export default PaymentMethods;
import { useCart } from "@/State/store";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { PAYMENT_METHODS, PaymentMethodsType } from "@/constants/cart";
const PaymentMethods = () => {
  const selectedPaymentMethod = useCart((state) => state.selectedPaymentMethod);
  const setSelectedPaymentMethod = useCart(
    (state) => state.setSelectedPaymentMethod
  );
  const handlePaymentMethodChange = (paymentMethod: PaymentMethodsType) => {
    setSelectedPaymentMethod(paymentMethod);
  };

  return (
    <div className="m-2 flex justify-center">
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
            onClick={() => handlePaymentMethodChange(paymentMethod)}
          >
            {paymentMethod}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethods;
