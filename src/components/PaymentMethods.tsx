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
import React, { ChangeEvent } from 'react';

interface PaymentMethodsProps {
  selectedPaymentMethod: string;
  onPaymentMethodChange: (value: string) => void;
}

const PaymentMethods: React.FC<PaymentMethodsProps> = ({ selectedPaymentMethod, onPaymentMethodChange }) => {
  const handlePaymentMethodChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedValue = event.target.value;
    onPaymentMethodChange(selectedValue);
  };

  return (
    <div className="m-2 flex justify-center">
      <form className="flex items-center space-x-4">
        <div>
          <input
            type="radio"
            id="cash"
            name="paymentMethod"
            value="CASH"
            checked={selectedPaymentMethod === 'CASH'}
            onChange={handlePaymentMethodChange}
          />
          <label htmlFor="cash" className="m-2">Cash</label>
        </div>
        <div>
          <input
            type="radio"
            id="check"
            name="paymentMethod"
            value="CHECK"
            checked={selectedPaymentMethod === 'CHECK'}
            onChange={handlePaymentMethodChange}
          />
          <label htmlFor="check" className="m-2">Check</label>
        </div>
        <div>
          <input
            type="radio"
            id="card"
            name="paymentMethod"
            value="CARD"
            checked={selectedPaymentMethod === 'CARD'}
            onChange={handlePaymentMethodChange}
            disabled
          />
          <label htmlFor="card" className="m-2">Card</label>
        </div>
      </form>
    </div>
  );
};

export default PaymentMethods;