import { useState, useEffect } from 'react';
import { Slider } from './ui/slider';
import { Input } from './ui/input';
import { Button } from './ui/button';

interface PriceRangeFilterProps {
  language: 'en' | 'fr';
  minPrice: number;
  maxPrice: number;
  onApply: (min: number, max: number) => void;
}

export function PriceRangeFilter({ language, minPrice, maxPrice, onApply }: PriceRangeFilterProps) {
  const [localMin, setLocalMin] = useState(minPrice);
  const [localMax, setLocalMax] = useState(maxPrice);
  const [sliderValues, setSliderValues] = useState([minPrice, maxPrice]);

  // Update local state when props change
  useEffect(() => {
    setLocalMin(minPrice);
    setLocalMax(maxPrice);
    setSliderValues([minPrice, maxPrice]);
  }, [minPrice, maxPrice]);

  const handleApply = () => {
    onApply(localMin, localMax);
  };

  const handleSliderChange = (values: number[]) => {
    setSliderValues(values);
    setLocalMin(values[0]);
    setLocalMax(values[1]);
  };

  return (
    <div className="space-y-4">
      <h3 className="font-medium">
        {language === 'en' ? 'Price Range (FCFA)' : 'Fourchette de Prix (FCFA)'}
      </h3>
      
      {/* Slider */}
      <div className="px-2">
        <Slider
          min={0}
          max={500000}
          step={1000}
          value={sliderValues}
          onValueChange={handleSliderChange}
          className="w-full"
        />
      </div>

      {/* Input Fields */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-sm text-gray-600 mb-1 block">
            {language === 'en' ? 'Min' : 'Min'}
          </label>
          <Input
            type="number"
            value={localMin}
            onChange={(e) => setLocalMin(Number(e.target.value))}
            placeholder="0"
            className="w-full"
          />
        </div>
        <div>
          <label className="text-sm text-gray-600 mb-1 block">
            {language === 'en' ? 'Max' : 'Max'}
          </label>
          <Input
            type="number"
            value={localMax}
            onChange={(e) => setLocalMax(Number(e.target.value))}
            placeholder="500000"
            className="w-full"
          />
        </div>
      </div>

      {/* Apply Button */}
      <Button 
        onClick={handleApply} 
        className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
      >
        {language === 'en' ? 'Apply' : 'Appliquer'}
      </Button>
    </div>
  );
}
