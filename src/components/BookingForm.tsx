
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import LocationAutocomplete from './ui/LocationAutocomplete';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Calendar } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

interface BookingFormProps {
  onHomePage?: boolean;
  onCarPage?: boolean;
  carId?: string;
  pricePerDay?: number;
}

const locations = [
  "Downtown Office",
  "Airport Terminal",
  "Central Station",
  "North Suburb Center",
  "South City Mall",
  "West End Plaza",
  "East Side Garage"
];

const BookingForm = ({ onHomePage = false, onCarPage = false, carId, pricePerDay }: BookingFormProps) => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [pickupDate, setPickupDate] = useState<Date | null>(new Date());
  const [returnDate, setReturnDate] = useState<Date | null>(
    new Date(new Date().setDate(new Date().getDate() + 3))
  );
  const [isLocating, setIsLocating] = useState(false);
  const [isLocatingDropoff, setIsLocatingDropoff] = useState(false);

  const handleDetectPickup = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }
  
    setIsLocating(true);
  
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
  
        const geocoder = new window.google.maps.Geocoder();
        const latlng = { lat: latitude, lng: longitude };
  
        geocoder.geocode({ location: latlng }, (results, status) => {
          if (status === "OK" && results && results.length > 0) {
            const address = results[0].formatted_address;
            setPickupLocation(address);
          } else {
            alert("Failed to fetch address. Please enter manually.");
            console.error("Geocoder failed due to: " + status);
          }
          setIsLocating(false);
        });
      },
      (error) => {
        alert("Failed to detect your location.");
        console.error(error);
        setIsLocating(false);
      }
    );
  };

  const handleDetectDropoff = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }
  
    setIsLocatingDropoff(true);
  
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
  
        const geocoder = new window.google.maps.Geocoder();
        const latlng = { lat: latitude, lng: longitude };
  
        geocoder.geocode({ location: latlng }, (results, status) => {
          if (status === "OK" && results && results.length > 0) {
            const address = results[0].formatted_address;
            setDropoffLocation(address);
          } else {
            alert("Failed to fetch address. Please enter manually.");
            console.error("Geocoder failed due to: " + status);
          }
          setIsLocatingDropoff(false);
        });
      },
      (error) => {
        alert("Failed to detect your location.");
        console.error(error);
        setIsLocatingDropoff(false);
      }
    );
  };
  
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!pickupLocation || !dropoffLocation || !pickupDate || !returnDate) {
      alert('Please fill all the fields');
      return;
    }
    
    if (returnDate <= pickupDate) {
      alert('Return date must be after pickup date');
      return;
    }
    
    if (!isAuthenticated) {
      // Store form data and redirect to login
      const formData = {
        pickupLocation,
        dropoffLocation,
        pickupDate,
        returnDate,
        carId
      };
      
      localStorage.setItem('pendingBooking', JSON.stringify(formData));
      navigate('/login');
      return;
    }
    
    if (onHomePage) {
      // Redirect to cars page with search params
      const searchParams = new URLSearchParams();
      searchParams.append('pickupLocation', pickupLocation);
      searchParams.append('dropoffLocation', dropoffLocation);
      searchParams.append('pickupDate', pickupDate.toISOString());
      searchParams.append('returnDate', returnDate.toISOString());
      
      navigate(`/cars?${searchParams.toString()}`);
    } else if (onCarPage && carId) {
      // Redirect to checkout page
      const searchParams = new URLSearchParams();
      searchParams.append('carId', carId);
      searchParams.append('pickupLocation', pickupLocation);
      searchParams.append('dropoffLocation', dropoffLocation);
      searchParams.append('pickupDate', pickupDate.toISOString());
      searchParams.append('returnDate', returnDate.toISOString());
      
      if (pricePerDay) {
        const days = Math.ceil((returnDate.getTime() - pickupDate.getTime()) / (1000 * 60 * 60 * 24));
        searchParams.append('totalPrice', (days * pricePerDay).toString());
      }
      
      navigate(`/checkout?${searchParams.toString()}`);
    }
  };
  
  return (
    <Card className={`shadow-lg ${onHomePage ? 'w-full max-w-3xl mx-auto' : 'w-full'}`}>
      <CardHeader className={onHomePage ? 'text-center' : ''}>
        <CardTitle className="text-2xl font-bold">
          {onHomePage ? 'Find Your Perfect Ride' : 'Book This Car'}
        </CardTitle>
        <CardDescription>
          {onHomePage 
            ? 'Enter your details to search for available vehicles'
            : 'Complete your booking details'
          }
        </CardDescription>
      </CardHeader>
      
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className={`grid ${onHomePage ? 'md:grid-cols-2' : 'grid-cols-1'} gap-4`}>
            {/* Pickup Location */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-brand-purple" />
                  Pickup Location
                </span>
                <button
                  type="button"
                  onClick={handleDetectPickup}
                  className="text-xs text-brand-purple hover:underline disabled:opacity-50"
                  disabled={isLocating}
                >
                   {isLocating ? "Detecting..." : "Use My Location"}
                </button>
              </label>
              <LocationAutocomplete
                value={pickupLocation}
                onChange={setPickupLocation}
                placeholder="Enter pickup location"
              />
            </div>
            
            {/* Dropoff Location */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-brand-red" />
                  Dropoff Location
                </span>
                <button
                  type="button"
                  onClick={handleDetectDropoff}
                  className="text-xs text-brand-red hover:underline disabled:opacity-50"
                  disabled={isLocatingDropoff}
                > 
                  {isLocatingDropoff ? "Detecting..." : "Use My Location"}
                </button>
              </label>
              <LocationAutocomplete
                value={dropoffLocation}
                onChange={setDropoffLocation}
                placeholder="Enter dropoff location"
              />
            </div>
            
            {/* Pickup Date */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Calendar className="h-4 w-4 text-brand-purple" />
                Pickup Date
              </label>
              <div className="relative">
                <DatePicker
                  selected={pickupDate}
                  onChange={(date: Date) => setPickupDate(date)}
                  minDate={new Date()}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  wrapperClassName="w-full"
                  placeholderText="Select pickup date"
                  dateFormat="MM/dd/yyyy"
                />
              </div>
            </div>
            
            {/* Return Date */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Calendar className="h-4 w-4 text-brand-red" />
                Return Date
              </label>
              <div className="relative">
                <DatePicker
                  selected={returnDate}
                  onChange={(date: Date) => setReturnDate(date)}
                  minDate={pickupDate || new Date()}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  wrapperClassName="w-full"
                  placeholderText="Select return date"
                  dateFormat="MM/dd/yyyy"
                />
              </div>
            </div>
          </div>
          
          {pricePerDay && returnDate && pickupDate && (
            <div className="mt-4 bg-brand-gray p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Price Calculation</span>
                <span className="font-semibold">
                  ₹{pricePerDay} × {Math.ceil((returnDate.getTime() - pickupDate.getTime()) / (1000 * 60 * 60 * 24))} days
                </span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-base font-semibold">Total Price</span>
                <span className="font-bold text-lg">
                 ₹{pricePerDay * Math.ceil((returnDate.getTime() - pickupDate.getTime()) / (1000 * 60 * 60 * 24))}
                </span>
              </div>
            </div>
          )}
        </CardContent>
        
        <CardFooter>
          <Button 
            type="submit" 
            className="w-full bg-brand-purple hover:bg-brand-purple/90"
          >
            {onHomePage ? 'Search Cars' : 'Continue to Booking'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default BookingForm;
