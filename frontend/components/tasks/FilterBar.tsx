import React from 'react';
import { FilterOption } from '@/hooks/useTasks';

interface FilterBarProps {
  activeFilter: FilterOption;
  onFilterChange: (filter: FilterOption) => void;
  taskCounts: {
    all: number;
    active: number;
    completed: number;
  };
}

const FilterBar: React.FC<FilterBarProps> = ({
  activeFilter,
  onFilterChange,
  taskCounts,
}) => {
  const filters: { label: string; value: FilterOption; count: number }[] = [
    { label: 'All', value: 'all', count: taskCounts.all },
    { label: 'Active', value: 'active', count: taskCounts.active },
    { label: 'Completed', value: 'completed', count: taskCounts.completed },
  ];

  return (
    <div className="flex space-x-2">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
            activeFilter === filter.value
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {filter.label} ({filter.count})
        </button>
      ))}
    </div>
  );
};

export default FilterBar;
