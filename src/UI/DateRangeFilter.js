import React from "react";
import { useNewsContext } from "../Context/NewsContext";

const DateRangeFilter = () => {
  const { selectedDateRange, setSelectedDateRange } = useNewsContext();

  const handleStartDateChange = (e) => {
    setSelectedDateRange({
      ...selectedDateRange,
      startDate: e.target.value,
    });
  };

  const handleEndDateChange = (e) => {
    setSelectedDateRange({
      ...selectedDateRange,
      endDate: e.target.value,
    });
  };

  return (
    <div>
      <div className="flex items-center space-x-4">
        <div>
          <input
            type="date"
            value={selectedDateRange.startDate || ""}
            onChange={handleStartDateChange}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <input
            type="date"
            value={selectedDateRange.endDate || ""}
            onChange={handleEndDateChange}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

export default DateRangeFilter;
