import React, { useState } from 'react';
import { DatePicker, Checkbox, Select, Button } from 'antd';
import jsPDF from 'jspdf';

const { RangePicker } = DatePicker;

const CustomReport: React.FC = () => {
  const [dateRange, setDateRange] = useState<[string, string] | null>(null);
  const [includeSummary, setIncludeSummary] = useState(true);
  const [includeDetails, setIncludeDetails] = useState(true);
  const [dataPoints, setDataPoints] = useState<string[]>([]);

  const handleGenerateReport = () => {
    const reportData = {
      range: dateRange
        ? `${dateRange[0]} - ${dateRange[1]}`
        : 'No Date Range Selected',
      summary: includeSummary ? 'Custom Report Summary' : null,
      details: includeDetails ? 'Custom Report Details' : null,
      selectedDataPoints: dataPoints.join(', '),
    };

    const doc = new jsPDF();
    doc.text(
      `Custom Report for ${
        dateRange ? dateRange.join(' to ') : 'Selected Dates'
      }`,
      10,
      10,
    );
    if (includeSummary) doc.text(reportData.summary || '', 10, 20);
    if (includeDetails) doc.text(reportData.details || '', 10, 30);
    doc.text(`Data Points: ${reportData.selectedDataPoints}`, 10, 40);

    doc.save(
      `Custom_Report_${dateRange ? dateRange.join('_to_') : 'NoDate'}.pdf`,
    );
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6">Custom Report Generation</h2>

      <div className="mb-4">
        <label className="block mb-2">Select Date Range</label>
        <RangePicker
          onChange={(dates, dateStrings) =>
            setDateRange(dateStrings as [string, string])
          }
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Select Data Points</label>
        <Select
          mode="multiple"
          placeholder="Select Data Points"
          onChange={setDataPoints}
          style={{ width: '100%' }}
        >
          <Select.Option value="dataPoint1">Data Point 1</Select.Option>
          <Select.Option value="dataPoint2">Data Point 2</Select.Option>
          <Select.Option value="dataPoint3">Data Point 3</Select.Option>
          <Select.Option value="dataPoint4">Data Point 4</Select.Option>
        </Select>
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

export default CustomReport;
