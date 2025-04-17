
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Car, Users, Fuel, Gauge } from 'lucide-react';
import { Car as CarType } from '@/data/cars';

interface CarCardProps {
  car: CarType;
}

const CarCard = ({ car }: CarCardProps) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      {/* Car Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={car.image} 
          alt={car.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <Badge className="absolute top-2 right-2 bg-brand-purple">{car.type}</Badge>
      </div>
      
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-bold text-lg">{car.name}</h3>
            <p className="text-gray-600 text-sm">{car.brand} {car.model} {car.year}</p>
          </div>
          <div className="text-right">
            <span className="font-bold text-lg text-brand-purple">₹{car.pricePerDay}</span>
            <p className="text-gray-600 text-xs">per day</p>
          </div>
        </div>
        
        {/* Car Features */}
        <div className="grid grid-cols-2 gap-2 mt-4">
          <div className="flex items-center text-sm gap-1.5">
            <Car className="h-4 w-4 text-gray-500" />
            <span>{car.transmission}</span>
          </div>
          <div className="flex items-center text-sm gap-1.5">
            <Fuel className="h-4 w-4 text-gray-500" />
            <span>{car.fuelType}</span>
          </div>
          <div className="flex items-center text-sm gap-1.5">
            <Users className="h-4 w-4 text-gray-500" />
            <span>{car.seats} Seats</span>
          </div>
          <div className="flex items-center text-sm gap-1.5">
            <Gauge className="h-4 w-4 text-gray-500" />
            <span>{car.year}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button 
          variant="outline" 
          className="w-1/2 text-brand-purple border-brand-purple hover:bg-brand-purple hover:text-white"
          asChild
        >
          <Link to={`/car/${car.id}`}>View Details</Link>
        </Button>
        <Button 
          className="w-1/2 bg-brand-purple hover:bg-brand-purple/90"
          asChild
        >
          <Link to={`/car/${car.id}?book=true`}>Book Now</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CarCard;
