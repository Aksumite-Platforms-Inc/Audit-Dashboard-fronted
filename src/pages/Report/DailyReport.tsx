import React, { useState } from 'react';
import { DatePicker, Checkbox, Button } from 'antd'; // Ant Design for UI components
import { saveAs } from 'file-saver'; // Library to save files
import jsPDF from 'jspdf'; // For PDF generation

const DailyReport: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [includeSummary, setIncludeSummary] = useState(true);
  const [includeDetails, setIncludeDetails] = useState(true);

  const handleGenerateReport = () => {
    // Fetch data from API based on selectedDate and options
    const reportData = {
      date: selectedDate,
      summary: includeSummary ? 'Summary Data' : null,
      details: includeDetails ? 'Detailed Data' : null,
    };

    // Generate the PDF report
    const doc = new jsPDF();
    doc.text(`Daily Report for ${selectedDate}`, 10, 10);
    if (includeSummary) doc.text(reportData.summary || '', 10, 20);
    if (includeDetails) doc.text(reportData.details || '', 10, 30);

    // Save the PDF
    doc.save(`Daily_Report_${selectedDate}.pdf`);
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6">Daily Report Generation</h2>

      <div className="mb-4">
        <label className="block mb-2">Select Date</label>
        <DatePicker
          onChange={(date, dateString) => setSelectedDate(dateString[0])}
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

export default DailyReport;
