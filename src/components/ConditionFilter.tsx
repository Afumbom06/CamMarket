import { RadioGroup, RadioGroupItem } from './ui/radio-group';

interface ConditionFilterProps {
  language: 'en' | 'fr';
  selectedCondition: 'all' | 'new' | 'used';
  onSelect: (condition: 'all' | 'new' | 'used') => void;
}

export function ConditionFilter({ language, selectedCondition, onSelect }: ConditionFilterProps) {
  const conditionOptions = [
    { value: 'all', label: language === 'en' ? 'All Items' : 'Tous les Articles' },
    { value: 'new', label: language === 'en' ? 'New' : 'Neuf' },
    { value: 'used', label: language === 'en' ? 'Fairly Used' : 'Occasion' }
  ];

  return (
    <div className="space-y-3">
      <h3 className="font-medium">
        {language === 'en' ? 'Condition' : 'État'}
      </h3>
      
      <RadioGroup value={selectedCondition} onValueChange={(val) => onSelect(val as 'all' | 'new' | 'used')}>
        <div className="space-y-2">
          {conditionOptions.map((option) => (
            <label 
              key={option.value}
              className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors"
            >
              <RadioGroupItem value={option.value} />
              <span className="text-sm">{option.label}</span>
            </label>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
}
