
import Layout from "@/components/Layout";
import BookingForm from "@/components/BookingForm";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Car, Check, Shield, Clock, ThumbsUp } from "lucide-react";
import { useCars } from "@/contexts/CarsContext";

const HomePage = () => {
  const { cars } = useCars();
  const featuredCars = cars.slice(0, 4);
  
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-brand-blue py-20 px-4 md:px-8 lg:px-16">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="text-white space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Find Your Perfect <span className="text-brand-purple">Rental Car</span>
              </h1>
              <p className="text-lg md:text-xl opacity-90 max-w-lg">
                Discover our wide range of vehicles for any occasion. From economy to luxury, we have the perfect car for your journey.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button 
                  className="bg-brand-purple hover:bg-brand-purple/90 text-white px-8 py-6 text-lg"
                  asChild
                >
                  <Link to="/cars">Browse Cars</Link>
                </Button>
                <Button 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-brand-blue px-8 py-6 text-lg"
                  asChild
                >
                  <Link to="/about">Learn More</Link>
                </Button>
              </div>
            </div>
            <div className="hidden md:block">
              <img 
                src="https://images.unsplash.com/photo-1533106418989-88406c7cc8ca?q=80&w=1660&auto=format&fit=crop"
                alt="Luxury SUV" 
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Search Form Section */}
      <section className="container mx-auto max-w-6xl px-4 -mt-10 relative z-10">
        <BookingForm onHomePage={true} />
      </section>
      
      {/* Featured Cars Section */}
      <section className="py-20 px-4 md:px-8 bg-gray-50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Vehicles</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our selection of premium vehicles perfect for any occasion.
              From compact cars to luxury sedans, we have it all.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCars.map(car => (
              <div key={car.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={car.image} 
                    alt={car.name} 
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1">{car.name}</h3>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-gray-600">{car.type}</span>
                    <span className="font-bold text-brand-purple">₹{car.pricePerDay}/day</span>
                  </div>
                  <Button 
                    className="w-full bg-brand-purple hover:bg-brand-purple/90"
                    asChild
                  >
                    <Link to={`/car/${car.id}`}>View Details</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Button 
              variant="outline" 
              className="text-brand-purple border-brand-purple hover:bg-brand-purple hover:text-white px-8"
              asChild
            >
              <Link to="/cars">View All Cars</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Why Choose Us Section */}
      <section className="py-20 px-4 md:px-8 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose DriveEasy</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're committed to providing exceptional service and the best rental experience possible.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg text-center hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-brand-purple/10 text-brand-purple mb-4">
                <Car className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Diverse Fleet</h3>
              <p className="text-gray-600">
                Choose from our wide range of vehicles to match any occasion or budget.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg text-center hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-brand-purple/10 text-brand-purple mb-4">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Safety First</h3>
              <p className="text-gray-600">
                All vehicles are regularly maintained and sanitized for your safety.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg text-center hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-brand-purple/10 text-brand-purple mb-4">
                <Clock className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">24/7 Support</h3>
              <p className="text-gray-600">
                Our customer service team is available around the clock to assist you.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg text-center hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-brand-purple/10 text-brand-purple mb-4">
                <ThumbsUp className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Best Rates</h3>
              <p className="text-gray-600">
                Competitive pricing with no hidden fees. Transparent costs always.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-20 px-4 md:px-8 bg-gray-50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Renting a car with DriveEasy is quick and easy. Follow these simple steps.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8 justify-between">
            <div className="flex-1 text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-brand-purple text-white text-2xl font-bold mb-4">
                1
              </div>
              <h3 className="text-xl font-bold mb-2">Choose Your Car</h3>
              <p className="text-gray-600">
                Browse our selection and pick a vehicle that suits your needs.
              </p>
            </div>
            
            <div className="hidden md:block w-12 self-center">
              <div className="border-t-2 border-dashed border-gray-300 w-full"></div>
            </div>
            
            <div className="flex-1 text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-brand-purple text-white text-2xl font-bold mb-4">
                2
              </div>
              <h3 className="text-xl font-bold mb-2">Make a Reservation</h3>
              <p className="text-gray-600">
                Select your dates, location, and complete the booking process.
              </p>
            </div>
            
            <div className="hidden md:block w-12 self-center">
              <div className="border-t-2 border-dashed border-gray-300 w-full"></div>
            </div>
            
            <div className="flex-1 text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-brand-purple text-white text-2xl font-bold mb-4">
                3
              </div>
              <h3 className="text-xl font-bold mb-2">Enjoy Your Ride</h3>
              <p className="text-gray-600">
                Pick up your car and enjoy your journey with peace of mind.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Button 
              className="bg-brand-purple hover:bg-brand-purple/90 px-8"
              asChild
            >
              <Link to="/cars">Book Your Car Now</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
