import React, { useState } from 'react';
import DailyReport from './DailyReport';
import WeeklyReport from './WeeklyReport';
import MonthlyReport from './MonthlyReport';
import CustomReport from './CustomReport';

const ReportGeneration: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Daily');

  return (
    <div className="p-6">
      <div className="mb-4 flex space-x-4 border-b-2 border-gray-200">
        <button
          className={`${
            activeTab === 'Daily' ? 'border-b-2 border-blue-500' : ''
          } px-4 py-2`}
          onClick={() => setActiveTab('Daily')}
        >
          Daily Reports
        </button>
        <button
          className={`${
            activeTab === 'Weekly' ? 'border-b-2 border-blue-500' : ''
          } px-4 py-2`}
          onClick={() => setActiveTab('Weekly')}
        >
          Weekly Reports
        </button>
        <button
          className={`${
            activeTab === 'Monthly' ? 'border-b-2 border-blue-500' : ''
          } px-4 py-2`}
          onClick={() => setActiveTab('Monthly')}
        >
          Monthly Reports
        </button>
        <button
          className={`${
            activeTab === 'Custom' ? 'border-b-2 border-blue-500' : ''
          } px-4 py-2`}
          onClick={() => setActiveTab('Custom')}
        >
          Custom Reports
        </button>
      </div>

      <div className="mt-4">
        {activeTab === 'Daily' && <DailyReport />}
        {activeTab === 'Weekly' && <WeeklyReport />}
        {activeTab === 'Monthly' && <MonthlyReport />}
        {activeTab === 'Custom' && <CustomReport />}
      </div>
    </div>
  );
};

export default ReportGeneration;
