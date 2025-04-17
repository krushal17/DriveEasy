
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { carBrands, carTypes } from '@/data/cars';
import { CarFilters as CarFiltersType } from '@/contexts/CarsContext';
import { Filter, ArrowUpDown } from 'lucide-react';

interface CarFiltersProps {
  onFilterChange: (filters: CarFiltersType) => void;
}

const CarFilters = ({ onFilterChange }: CarFiltersProps) => {
  const [brand, setBrand] = useState<string>('All');
  const [type, setType] = useState<string>('All');
  const [priceRange, setPriceRange] = useState<[number, number]>([1000, 100000]);
  const [sortBy, setSortBy] = useState<'priceAsc' | 'priceDesc' | 'newest'>('priceAsc');
  
  const handlePriceChange = (value: number[]) => {
    setPriceRange([value[0], value[1]]);
  };
  
  // Apply filters when any filter value changes
  useEffect(() => {
    onFilterChange({
      brand: brand !== 'All' ? brand : undefined,
      type: type !== 'All' ? type as any : undefined,
      priceRange,
      sortBy
    });
  }, [brand, type, priceRange, sortBy, onFilterChange]);
  
  const handleReset = () => {
    setBrand('All');
    setType('All');
    setPriceRange([1000, 100000]);
    setSortBy('priceAsc');
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-5 space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Filter className="h-5 w-5 text-brand-purple" />
          Filter Cars
        </h3>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleReset} 
          className="text-brand-purple hover:text-brand-purple/90 hover:bg-brand-purple/10"
        >
          Reset
        </Button>
      </div>
      
      {/* Brand Filter */}
      <div className="space-y-2">
        <Label htmlFor="brand">Car Brand</Label>
        <Select value={brand} onValueChange={setBrand}>
          <SelectTrigger id="brand">
            <SelectValue placeholder="Select brand" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Brands</SelectItem>
            {carBrands.map(brand => (
              <SelectItem key={brand} value={brand}>{brand}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {/* Car Type Filter */}
      <div className="space-y-2">
        <Label htmlFor="type">Car Type</Label>
        <Select value={type} onValueChange={setType}>
          <SelectTrigger id="type">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Types</SelectItem>
            {carTypes.map(type => (
              <SelectItem key={type} value={type}>{type}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {/* Price Range Filter */}
      <div className="space-y-4">
        <div className="flex justify-between">
          <Label>Price Range (per day)</Label>
          <span className="text-sm text-gray-600">
          ₹{priceRange[0]} - ₹{priceRange[1]}
          </span>
        </div>
        <Slider
          defaultValue={[1000, 100000]}
          max={100000}
          min={1000}
          step={100}
          value={[priceRange[0], priceRange[1]]}
          onValueChange={handlePriceChange}
        />
      </div>
      
      {/* Sort By */}
      <div className="space-y-2">
        <Label htmlFor="sortBy" className="flex items-center gap-2">
          <ArrowUpDown className="h-4 w-4 text-gray-500" />
          Sort By
        </Label>
        <Select 
          value={sortBy} 
          onValueChange={(value) => setSortBy(value as any)}
        >
          <SelectTrigger id="sortBy">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="priceAsc">Price: Low to High</SelectItem>
            <SelectItem value="priceDesc">Price: High to Low</SelectItem>
            <SelectItem value="newest">Newest First</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default CarFilters;
