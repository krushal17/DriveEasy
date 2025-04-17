
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Car, MapPin } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useCars, Booking } from '@/contexts/CarsContext';


const BookingsPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const { getBookingsForUser, getCar, cancelBooking } = useCars();
  const [bookings, setBookings] = useState<Booking[]>([]);
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    if (user) {
      const userBookings = getBookingsForUser(user.id);
      setBookings(userBookings);
    }
  }, [isAuthenticated, user, navigate, getBookingsForUser]);
  
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  return (
    <Layout>
      <div className="bg-gray-50 py-12 px-4 min-h-[70vh]">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Your Bookings</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              View and manage your car rental bookings
            </p>
          </div>
          
          {bookings.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {bookings.map((booking) => {
                const car = getCar(booking.carId);
                return (
                  <Card key={booking.id} className="overflow-hidden">
                    <div className="flex border-b">
                      <div className="w-1/3 h-36 bg-gray-200">
                        {car && (
                          <img 
                            src={car.image} 
                            alt={car.name} 
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <CardHeader className="w-2/3">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">{car ? car.name : 'Car Details Unavailable'}</CardTitle>
                            {car && <p className="text-sm text-gray-500">{car.brand} {car.model}</p>}
                          </div>
                          <Badge className={
                            booking.status === 'confirmed' ? 'bg-green-600' : 
                            booking.status === 'cancelled' ? 'bg-red-600' : 
                            'bg-blue-600'
                          }>
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </Badge>
                        </div>
                      </CardHeader>
                    </div>
                    
                    <CardContent className="p-4">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex items-start gap-2">
                          <Calendar className="h-4 w-4 text-brand-purple mt-1" />
                          <div>
                            <p className="text-xs text-gray-500">Pickup Date</p>
                            <p className="text-sm font-medium">{formatDate(booking.pickupDate)}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Calendar className="h-4 w-4 text-brand-red mt-1" />
                          <div>
                            <p className="text-xs text-gray-500">Return Date</p>
                            <p className="text-sm font-medium">{formatDate(booking.returnDate)}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 text-brand-purple mt-1" />
                          <div>
                            <p className="text-xs text-gray-500">Pickup Location</p>
                            <p className="text-sm font-medium">{booking.pickupLocation}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 text-brand-red mt-1" />
                          <div>
                            <p className="text-xs text-gray-500">Dropoff Location</p>
                            <p className="text-sm font-medium">{booking.dropoffLocation}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 bg-gray-50 p-3 rounded-md">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Total Price</span>
                          <span className="font-bold text-brand-purple">₹{booking.totalPrice}</span>
                        </div>
                      </div>
                    </CardContent>
                    
                    {booking.status === 'confirmed' && (
                      <CardFooter className="bg-gray-50 p-4 border-t flex gap-3">
                        <Button 
                          variant="outline" 
                          className="flex-1 text-brand-purple border-brand-purple hover:bg-brand-purple hover:text-white"
                          onClick={() => {
                            localStorage.setItem("bookingToModify", JSON.stringify(booking));
                            navigate("/checkout");
                          }}
                        >
                          Modify
                        </Button>
                        <Button 
                          variant="outline" 
                          className="flex-1 text-red-500 border-red-500 hover:bg-red-500 hover:text-white"
                          onClick={() => cancelBooking(booking.id)}
                        >
                          Cancel
                        </Button>
                      </CardFooter>
                    )}
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-lg shadow-md">
              <Car className="h-16 w-16 mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold mb-2">No bookings found</h3>
              <p className="text-gray-600 mb-6">
                You don't have any car rental bookings yet.
              </p>
              <Button 
                className="bg-brand-purple hover:bg-brand-purple/90"
                onClick={() => navigate('/cars')}
              >
                Browse Cars
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default BookingsPage;
