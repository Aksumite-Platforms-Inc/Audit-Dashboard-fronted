import { ApexOptions } from 'apexcharts';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';

const options: ApexOptions = {
  legend: {
    show: false,
    position: 'top',
    horizontalAlign: 'left',
  },
  colors: ['#3C50E0', '#80CAEE'],
  chart: {
    fontFamily: 'Satoshi, sans-serif',
    height: 335,
    type: 'area',
    dropShadow: {
      enabled: true,
      color: '#623CEA14',
      top: 10,
      blur: 4,
      left: 0,
      opacity: 0.1,
    },
    toolbar: {
      show: false,
    },
  },
  responsive: [
    {
      breakpoint: 1024,
      options: {
        chart: {
          height: 300,
        },
      },
    },
    {
      breakpoint: 1366,
      options: {
        chart: {
          height: 350,
        },
      },
    },
  ],
  stroke: {
    width: [2, 2],
    curve: 'smooth',
  },
  grid: {
    xaxis: {
      lines: {
        show: true,
      },
    },
    yaxis: {
      lines: {
        show: true,
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  markers: {
    size: 4,
    colors: '#fff',
    strokeColors: ['#3056D3', '#80CAEE'],
    strokeWidth: 3,
  },
  xaxis: {
    type: 'category',
    categories: [], // This will be set dynamically
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    title: {
      style: {
        fontSize: '0px',
      },
    },
    min: 0,
    max: 100,
  },
};

interface ChartOneState {
  series: {
    name: string;
    data: number[];
  }[];
  categories: string[];
}
interface GovAuditData {
  id: number;
  organization: string;
  organizationType: string;
  auditType: string;
  riskLevel: string;
  findings: string;
  recommendations: string;
  auditor: string;
  date: string; // ISO date string
  governmentType: string;
}
interface PriAuditData {
  id: number;
  organization: string;
  organizationType: string;
  auditType: string;
  riskLevel: string;
  findings: string;
  recommendations: string;
  auditor: string;
  date: string; // ISO date string
  privateType: string;
}

const ChartOne: React.FC = () => {
  const [state, setState] = useState<ChartOneState>({
    series: [
      {
        name: 'Private Audits',
        data: [],
      },
      {
        name: 'Government Audits',
        data: [],
      },
    ],
    categories: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      console.log(token);

      if (!token) {
        console.error('No token found');
        return;
      }

      try {
        const parseJwt = (token: string) => {
          const base64Url = token.split('.')[1];
          const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
          const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          }).join(''));

          return JSON.parse(jsonPayload);
        };

        const role = parseJwt(token).role;
        if (role !== 'ADMIN') {
          console.error('Unauthorized: User does not have ADMIN role');
          return;
        }

        const response = await axios.get('http://localhost:8081/api/governmentaudits/getall', {
          headers: {
            'Authorization': `Bearer ${token}` // Include the token in the request headers
          }
        });
        const priresponse = await axios.get('http://localhost:8081/api/privateaudits/getall', {
          headers: {
            'Authorization': `Bearer ${token}` // Include the token in the request headers
          }
        });

        console.log(response.data);
        console.log(priresponse.data);

        // Function to extract year and month from date string
        const getYearAndMonth = (dateStr: string) => {
          const date = new Date(dateStr);
          return { year: date.getFullYear(), month: date.getMonth() };
        };

        // Function to get years range and format data
        const processData = (data: GovAuditData[] | PriAuditData[]) => {
          const monthCounts: number[] = Array(12).fill(0);
          const years: Set<number> = new Set();

          data.forEach((item) => {
            const { year, month } = getYearAndMonth(item.date);
            years.add(year);
            monthCounts[month] += 1;
          });

          const yearArray = Array.from(years).sort((a, b) => a - b);
          const categories = yearArray.map(year => year.toString());

          return {
            monthCounts,
            categories,
          };
        };

        const govData = processData(response.data);
        const priData = processData(priresponse.data);

        setState({
          series: [
            {
              name: 'Private Audits',
              data: priData.monthCounts,
            },
            {
              name: 'Government Audits',
              data: govData.monthCounts,
            },
          ],
          categories: govData.categories,
        });

        //options.xaxis.categories = state.categories; // Update x-axis categories dynamically

      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response) {
            console.error('Error response:', error.response.data);
            console.error('Error status:', error.response.status);
          } else if (error.request) {
            console.error('Error request:', error.request);
          } else {
            console.error('Error message:', error.message);
          }
        } else if (error instanceof Error) {
          console.error('Error fetching audits:', error.message);
        } else {
          console.error('An unknown error occurred:', error);
        }
      }
    };

    fetchData();
  }, []);

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex w-full flex-wrap gap-3 sm:gap-5">
          <div className="flex min-w-47.5">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-primary"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-primary">Private Audits</p>
              {/* <p className="text-sm font-medium">12.04.2023 - 12.05.2023</p> */}
            </div>
          </div>
          <div className="flex min-w-47.5">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-secondary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-secondary"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-secondary">Government Audits</p>
              {/* <p className="text-sm font-medium">12.04.2023 - 12.05.2023</p> */}
            </div>
          </div>
        </div>
        <div className="flex w-full max-w-45 justify-end">
          <div className="inline-flex items-center rounded-md bg-white p-1.5 dark:bg-meta-4">
            <button className="rounded bg-white py-1 px-3 text-xs font-medium text-black shadow-card hover:bg-white hover:shadow-card dark:bg-boxdark dark:text-white dark:hover:bg-boxdark">
              Day
            </button>
            <button className="rounded py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark">
              Week
            </button>
            <button className="rounded py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark">
              Month
            </button>
          </div>
        </div>
      </div>

      <div>
        <div id="chartOne" className="-ml-5">
          <ReactApexChart
            options={options}
            series={state.series}
            type="area"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartOne;
