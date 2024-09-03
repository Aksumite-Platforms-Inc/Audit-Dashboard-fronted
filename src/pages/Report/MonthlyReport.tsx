import React, { useState } from 'react';
import { DatePicker, Checkbox, Button } from 'antd';
import moment, { Moment } from 'moment'; // Import the Moment type from 'moment'
import { Dayjs } from 'dayjs'; // Import the Dayjs type from 'dayjs'
import jsPDF from 'jspdf';

const MonthlyReport: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [includeSummary, setIncludeSummary] = useState(true);
  const [includeDetails, setIncludeDetails] = useState(true);

  const handleGenerateReport = () => {
    const reportData = {
      month: selectedMonth,
      summary: includeSummary ? 'Monthly Summary Data' : null,
      details: includeDetails ? 'Monthly Detailed Data' : null,
    };

    const doc = new jsPDF();
    doc.text(`Monthly Report for ${selectedMonth}`, 10, 10);
    if (includeSummary) doc.text(reportData.summary || '', 10, 20);
    if (includeDetails) doc.text(reportData.details || '', 10, 30);

    doc.save(`Monthly_Report_${selectedMonth}.pdf`);
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6">Monthly Report Generation</h2>

      <div className="mb-4">
        <label className="block mb-2">Select Month</label>
        <DatePicker.MonthPicker
          onChange={(date, dateString) =>
            setSelectedMonth(dateString.toString())
          }
          defaultPickerValue={moment().startOf('month') as Dayjs}
        />
      </div>

      <div className="mb-4">
        <Checkbox
          checked={includeSummary}
          onChange={(e) => setIncludeSummary(e.target.checked)}
        >
          Include Summary
        </Checkbox>
      </div>

      <div className="mb-4">
        <Checkbox
          checked={includeDetails}
          onChange={(e) => setIncludeDetails(e.target.checked)}
        >
          Include Details
        </Checkbox>
      </div>

      <Button
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        type="primary"
        onClick={handleGenerateReport}
      >
        Generate Report
      </Button>
    </div>
  );
};

export default MonthlyReport;
