
import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useCars } from '@/contexts/CarsContext';
import { useAuth } from '@/contexts/AuthContext';
import { Car as CarType } from '@/data/cars';
import { Calendar, MapPin, CreditCard, Check, ShieldCheck } from 'lucide-react';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { getCar, addBooking } = useCars();
  const { isAuthenticated, user } = useAuth();
  
  const [car, setCar] = useState<CarType | null>(null);
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [pickupDate, setPickupDate] = useState<Date | null>(null);
  const [returnDate, setReturnDate] = useState<Date | null>(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    // Parse URL params
    const carId = searchParams.get('carId');
    if (!carId) {
      navigate('/cars');
      return;
    }
    
    const pickup = searchParams.get('pickupLocation');
    const dropoff = searchParams.get('dropoffLocation');
    const pickupDateStr = searchParams.get('pickupDate');
    const returnDateStr = searchParams.get('returnDate');
    const price = searchParams.get('totalPrice');
    
    // Validate required params
    if (!pickup || !dropoff || !pickupDateStr || !returnDateStr) {
      navigate('/car/' + carId);
      return;
    }
    
    const carData = getCar(carId);
    if (!carData) {
      navigate('/cars');
      return;
    }
    
    setCar(carData);
    setPickupLocation(pickup);
    setDropoffLocation(dropoff);
    setPickupDate(pickupDateStr ? new Date(pickupDateStr) : null);
    setReturnDate(returnDateStr ? new Date(returnDateStr) : null);
    
    if (price) {
      setTotalPrice(parseFloat(price));
    } else if (pickupDateStr && returnDateStr && carData) {
      const start = new Date(pickupDateStr);
      const end = new Date(returnDateStr);
      const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
      setTotalPrice(days * carData.pricePerDay);
    }
    
    setLoading(false);
  }, [isAuthenticated, navigate, searchParams, getCar]);
  
  const formatDate = (date: Date | null) => {
    if (!date) return 'N/A';
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  const handleConfirmBooking = () => {
    if (!user || !car || !pickupDate || !returnDate) return;
    
    setProcessing(true);
    
    // Simulate processing delay
    setTimeout(() => {
      const newBooking = {
        id: Date.now().toString(),
        userId: user.id,
        carId: car.id,
        pickupLocation,
        dropoffLocation,
        pickupDate,
        returnDate,
        totalPrice,
        status: 'confirmed' as const,
        createdAt: new Date()
      };
      
      addBooking(newBooking);
      
      // Navigate to bookings page
      navigate('/bookings');
    }, 1500);
  };
  
  if (loading) {
    return (
      <Layout>
        <div className="min-h-[70vh] flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-brand-purple border-r-transparent"></div>
            <p className="mt-4 text-gray-600">Loading checkout...</p>
          </div>
        </div>
      </Layout>
    );
  }
  
  if (!car || !pickupDate || !returnDate) {
    return (
      <Layout>
        <div className="min-h-[70vh] flex items-center justify-center bg-gray-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-center text-xl">Checkout Error</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center mb-6">
                There was an error processing your booking. Please try again.
              </p>
              <Button 
                onClick={() => navigate('/cars')} 
                className="w-full bg-brand-purple hover:bg-brand-purple/90"
              >
                Browse Cars
              </Button>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="bg-gray-50 py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Complete Your Booking</h1>
            <p className="text-gray-600">Review your details and confirm your reservation</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Booking Summary */}
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Booking Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Car Details */}
                  <div className="flex gap-4 pb-4 border-b">
                    <div className="w-24 h-20 overflow-hidden rounded-md bg-gray-100">
                      <img
                        src={car.image}
                        alt={car.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold">{car.name}</h3>
                      <p className="text-sm text-gray-600">{car.brand} {car.model} · {car.year}</p>
                      <p className="text-sm mt-1 text-gray-600">
                        {car.type}
                      </p>
                    </div>
                  </div>
                  
                  {/* Rental Details */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-3">Pickup Details</h4>
                      <div className="space-y-3">
                        <div className="flex items-start gap-2">
                          <Calendar className="h-4 w-4 text-brand-purple mt-1" />
                          <div>
                            <p className="text-xs text-gray-500">Date</p>
                            <p className="font-medium">{formatDate(pickupDate)}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 text-brand-purple mt-1" />
                          <div>
                            <p className="text-xs text-gray-500">Location</p>
                            <p className="font-medium">{pickupLocation}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-3">Return Details</h4>
                      <div className="space-y-3">
                        <div className="flex items-start gap-2">
                          <Calendar className="h-4 w-4 text-brand-red mt-1" />
                          <div>
                            <p className="text-xs text-gray-500">Date</p>
                            <p className="font-medium">{formatDate(returnDate)}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 text-brand-red mt-1" />
                          <div>
                            <p className="text-xs text-gray-500">Location</p>
                            <p className="font-medium">{dropoffLocation}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Rental Duration */}
                  <div className="pt-2 pb-2 border-t">
                    <div className="flex justify-between items-center">
                      <span>Rental Duration</span>
                      <span>
                        {Math.ceil((returnDate.getTime() - pickupDate.getTime()) / (1000 * 60 * 60 * 24))} days
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Included in Your Rental */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-lg">Included in Your Rental</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-500 shrink-0" />
                      <span>Unlimited mileage</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-500 shrink-0" />
                      <span>Collision Damage Waiver</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-500 shrink-0" />
                      <span>Third Party Liability</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-500 shrink-0" />
                      <span>Theft Protection</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-500 shrink-0" />
                      <span>24/7 Breakdown Assistance</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-500 shrink-0" />
                      <span>Local Taxes</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Price Summary */}
            <div className="md:col-span-1">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle>Price Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Car Rental Rate</span>
                    <span>₹{car.pricePerDay} / day</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Rental Duration</span>
                    <span>
                      {Math.ceil((returnDate.getTime() - pickupDate.getTime()) / (1000 * 60 * 60 * 24))} days
                    </span>
                  </div>
                  <div className="pt-4 border-t">
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>Total Price</span>
                      <span>₹{totalPrice}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Inclusive of all taxes and fees</p>
                  </div>
                  
                  <div className="flex items-center gap-2 mt-6 p-3 bg-green-50 text-green-700 rounded-md border border-green-200">
                    <ShieldCheck className="h-5 w-5 shrink-0" />
                    <span className="text-sm">Secure payment processing. Your payment details are protected.</span>
                  </div>
                </CardContent>
                <CardFooter className="flex-col space-y-4">
                  <Button 
                    className="w-full bg-brand-purple hover:bg-brand-purple/90 py-6"
                    onClick={handleConfirmBooking}
                    disabled={processing}
                  >
                    {processing ? (
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent"></div>
                        <span>Processing...</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4" />
                        <span>Confirm & Pay</span>
                      </div>
                    )}
                  </Button>
                  <p className="text-xs text-center text-gray-500">
                    By confirming, you agree to our <a href="#" className="underline">Terms & Conditions</a> and <a href="#" className="underline">Privacy Policy</a>
                  </p>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CheckoutPage;
