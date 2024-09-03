import React, { useState } from 'react';
import { DatePicker, Checkbox, Button } from 'antd';
import dayjs from 'dayjs';
import jsPDF from 'jspdf';

const WeeklyReport: React.FC = () => {
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [includeSummary, setIncludeSummary] = useState(true);
  const [includeDetails, setIncludeDetails] = useState(true);

  const handleGenerateReport = () => {
    const reportData = {
      range: `${startDate} - ${endDate}`,
      summary: includeSummary ? 'Weekly Summary Data' : null,
      details: includeDetails ? 'Weekly Detailed Data' : null,
    };

    const doc = new jsPDF();
    doc.text(`Weekly Report: ${startDate} to ${endDate}`, 10, 10);
    if (includeSummary) doc.text(reportData.summary ?? '', 10, 20);
    if (includeDetails) doc.text(reportData.details ?? '', 10, 30);

    doc.save(`Weekly_Report_${startDate}_to_${endDate}.pdf`);
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6">Weekly Report Generation</h2>

      <div className="mb-4">
        <label className="block mb-2">Select Week Range</label>
        <DatePicker.RangePicker
          onChange={(dates, dateStrings) => {
            setStartDate(dateStrings[0]);
            setEndDate(dateStrings[1]);
          }}
          defaultPickerValue={[dayjs(), dayjs().add(7, 'days')]}
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

      <Button type="primary" onClick={handleGenerateReport}>
        Generate Report
      </Button>
    </div>
  );
};

export default WeeklyReport;
