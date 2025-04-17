
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import CarCard from '@/components/CarCard';
import CarFilters from '@/components/CarFilters';
import { useCars, CarFilters as CarFiltersType } from '@/contexts/CarsContext';
import { Car } from '@/data/cars';

const CarsPage = () => {
  const { cars, filteredCars, filterCars } = useCars();
  const [searchParams] = useSearchParams();
  const [displayedCars, setDisplayedCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Check if we have search params from the booking form
  useEffect(() => {
    const pickupLocation = searchParams.get('pickupLocation');
    const dropoffLocation = searchParams.get('dropoffLocation');
    const pickupDate = searchParams.get('pickupDate');
    const returnDate = searchParams.get('returnDate');
    
    // For demo purposes, we're just showing all cars
    // In a real app, you would filter based on availability for the dates
    setDisplayedCars(cars);
    setLoading(false);
  }, [cars, searchParams]);
  
  const handleFilterChange = (filters: CarFiltersType) => {
    filterCars(filters);
    setDisplayedCars(filteredCars);
  };
  
  return (
    <Layout>
      <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Our Car Collection</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Browse our wide selection of rental vehicles. Filter by brand, type, and price
              to find the perfect car for your needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="md:col-span-1">
              <CarFilters onFilterChange={handleFilterChange} />
            </div>
            
            {/* Car Listings */}
            <div className="md:col-span-3">
              {loading ? (
                <div className="text-center py-12">
                  <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-brand-purple border-r-transparent"></div>
                  <p className="mt-4 text-gray-600">Loading cars...</p>
                </div>
              ) : displayedCars.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {displayedCars.map(car => (
                    <CarCard key={car.id} car={car} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-2">No cars found</h3>
                  <p className="text-gray-600">
                    Try adjusting your filters to see more results.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CarsPage;
