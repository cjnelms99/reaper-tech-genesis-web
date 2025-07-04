
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ShippingCalculator from "./ShippingCalculator";
import ThiingsIcon from "./ThiingsIcon";

interface CheckoutSectionProps {
  total: number;
  cart: Array<{
    id: string;
    name: string;
    price: number;
    qty: number;
  }>;
}

const CheckoutSection = ({ total, cart }: CheckoutSectionProps) => {
  const [shippingCost, setShippingCost] = useState(0);
  const [taxAmount, setTaxAmount] = useState(0);

  const finalTotal = total + shippingCost + taxAmount;

  const handleShippingChange = (shipping: number, tax: number) => {
    setShippingCost(shipping);
    setTaxAmount(tax);
  };

  const handleStripePayment = async () => {
    console.log("Processing Stripe payment for amount:", finalTotal);
    // TODO: Implement Stripe checkout session
    alert("Stripe payment integration coming soon! Amount: $" + finalTotal.toFixed(2));
  };

  const handleCryptoPayment = async () => {
    console.log("Processing crypto payment for amount:", finalTotal);
    // TODO: Implement Thirdweb payment link generation
    alert("Crypto payment via Thirdweb coming soon! Amount: $" + finalTotal.toFixed(2));
  };

  const handleCashPiPayment = () => {
    alert("Cash/Pi Payment Instructions:\n\nContact admin@reapertech.xyz to arrange:\n• Local meetup for cash exchange\n• Pi Network escrow transaction\n• Payment coordination\n\nTotal: $" + finalTotal.toFixed(2));
  };

  const handleQRPayment = async () => {
    const receipt = `ReaperTech Order Summary:\nSubtotal: $${total.toFixed(2)}\nShipping: $${shippingCost.toFixed(2)}\nTax: $${taxAmount.toFixed(2)}\nTotal: $${finalTotal.toFixed(2)}`;
    
    try {
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(receipt)}`;
      window.open(qrUrl, '_blank');
    } catch (error) {
      console.error('Error generating QR code:', error);
      alert("QR code generation failed. Please try again.");
    }
  };

  return (
    <div className="lg:col-span-1">
      <ShippingCalculator subtotal={total} cart={cart} onShippingChange={handleShippingChange} />
      
      <Card className="bg-gray-900 border-gray-700 sticky top-8">
        <CardHeader>
          <CardTitle className="text-cyan-400 font-mono flex items-center">
            <ThiingsIcon name="reaperHood" size={20} className="mr-2" />
            Order Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between text-lg">
            <span className="text-orange-400">Subtotal:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-400">
            <span className="flex items-center">
              <ThiingsIcon name="delivery" size={14} className="mr-1" />
              Shipping:
            </span>
            <span>${shippingCost.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-400">
            <span className="flex items-center">
              <ThiingsIcon name="datacenter" size={14} className="mr-1" />
              Tax:
            </span>
            <span>${taxAmount.toFixed(2)}</span>
          </div>
          <div className="border-t border-gray-700 pt-4">
            <div className="flex justify-between text-xl font-bold text-orange-500">
              <span>Total:</span>
              <span>${finalTotal.toFixed(2)}</span>
            </div>
          </div>

          <div className="space-y-3 pt-4">
            <Button 
              onClick={handleStripePayment}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-mono flex items-center justify-center"
            >
              <ThiingsIcon name="wallAdapter" size={16} className="mr-2" />
              Pay with Card (Stripe)
            </Button>
            
            <Button 
              onClick={handleCryptoPayment}
              variant="outline" 
              className="w-full border-orange-500 text-orange-500 hover:bg-orange-500/10 font-mono flex items-center justify-center"
            >
              <ThiingsIcon name="blockchain" size={16} className="mr-2" />
              Pay with Crypto
            </Button>
            
            <Button 
              onClick={handleCashPiPayment}
              variant="ghost" 
              className="w-full text-cyan-400 hover:bg-cyan-400/10 font-mono flex items-center justify-center"
            >
              <ThiingsIcon name="reaperHood" size={16} className="mr-2" />
              Cash / Pi Network
            </Button>
            
            <Button 
              onClick={handleQRPayment}
              variant="secondary" 
              className="w-full bg-gray-700 hover:bg-gray-600 font-mono flex items-center justify-center"
            >
              <ThiingsIcon name="foldablePhone" size={16} className="mr-2" />
              Generate Payment QR
            </Button>
          </div>

          <div className="pt-4 text-center">
            <p className="text-sm text-gray-400 italic flex items-center justify-center">
              <ThiingsIcon name="bolt" size={14} className="mr-2" />
              "If you have fire, we'll find a way to trade it."
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CheckoutSection;
