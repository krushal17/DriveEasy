
import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import BookingForm from '@/components/BookingForm';
import { useCars } from '@/contexts/CarsContext';
import { Car as CarType } from '@/data/cars';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Car, Calendar, MapPin, Fuel, Users, Gauge, Check } from 'lucide-react';

const CarDetailsPage = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const { getCar } = useCars();
  const [car, setCar] = useState<CarType | null>(null);
  const [loading, setLoading] = useState(true);
  const [showBookingForm, setShowBookingForm] = useState(searchParams.get('book') === 'true');
  
  useEffect(() => {
    if (id) {
      const carData = getCar(id);
      setCar(carData || null);
      setLoading(false);
    }
  }, [id, getCar]);
  
  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto max-w-7xl py-16 px-4">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-brand-purple border-r-transparent"></div>
            <p className="mt-4 text-gray-600">Loading car details...</p>
          </div>
        </div>
      </Layout>
    );
  }
  
  if (!car) {
    return (
      <Layout>
        <div className="container mx-auto max-w-7xl py-16 px-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Car Not Found</h2>
            <p className="text-gray-600 mb-6">The car you're looking for doesn't exist or has been removed.</p>
            <Button asChild>
              <a href="/cars">Browse All Cars</a>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="bg-gray-50 py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Car Details */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
            <div className="md:flex">
              {/* Car Image */}
              <div className="md:w-1/2">
                <div className="h-64 md:h-full">
                  <img 
                    src={car.image} 
                    alt={car.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              {/* Car Info */}
              <div className="md:w-1/2 p-6 md:p-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h1 className="text-3xl font-bold">{car.name}</h1>
                    <p className="text-gray-600">{car.brand} {car.model} {car.year}</p>
                  </div>
                  <Badge className="bg-brand-purple">{car.type}</Badge>
                </div>
                
                <div className="mb-6">
                  <span className="text-3xl font-bold text-brand-purple">₹{car.pricePerDay}</span>
                  <span className="text-gray-600"> / day</span>
                </div>
                
                <p className="text-gray-700 mb-6">
                  {car.description}
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Car className="h-5 w-5 text-brand-purple" />
                    <span>{car.transmission}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Fuel className="h-5 w-5 text-brand-purple" />
                    <span>{car.fuelType}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-brand-purple" />
                    <span>{car.seats} Seats</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Gauge className="h-5 w-5 text-brand-purple" />
                    <span>{car.year}</span>
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-brand-purple hover:bg-brand-purple/90"
                  onClick={() => setShowBookingForm(!showBookingForm)}
                >
                  {showBookingForm ? 'Hide Booking Form' : 'Book This Car'}
                </Button>
              </div>
            </div>
          </div>
          
          {/* Booking Form (conditional) */}
          {showBookingForm && (
            <div className="mb-12">
              <BookingForm onCarPage={true} carId={car.id} pricePerDay={car.pricePerDay} />
            </div>
          )}
          
          {/* Car Details Tabs */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <Tabs defaultValue="features">
              <TabsList className="mb-6">
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="specs">Specifications</TabsTrigger>
                <TabsTrigger value="rental">Rental Policy</TabsTrigger>
              </TabsList>
              
              <TabsContent value="features" className="space-y-4">
                <h3 className="text-xl font-bold mb-4">Car Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {car.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-brand-purple" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="specs" className="space-y-4">
                <h3 className="text-xl font-bold mb-4">Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-600">Brand</h4>
                      <p>{car.brand}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-600">Model</h4>
                      <p>{car.model}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-600">Year</h4>
                      <p>{car.year}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-600">Type</h4>
                      <p>{car.type}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-600">Transmission</h4>
                      <p>{car.transmission}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-600">Fuel Type</h4>
                      <p>{car.fuelType}</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="rental" className="space-y-4">
                <h3 className="text-xl font-bold mb-4">Rental Policy</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold">Required Documents</h4>
                    <p className="text-gray-600">Valid driver's license, credit card, and proof of insurance.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Mileage Policy</h4>
                    <p className="text-gray-600">Unlimited mileage included in the rental price.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Fuel Policy</h4>
                    <p className="text-gray-600">The vehicle must be returned with the same amount of fuel as at pickup.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Cancellation</h4>
                    <p className="text-gray-600">Free cancellation up to 48 hours before your pickup time.</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CarDetailsPage;
