import { ApexOptions } from 'apexcharts';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';

const options: ApexOptions = {
  colors: ['#3C50E0', '#80CAEE'],
  chart: {
    fontFamily: 'Satoshi, sans-serif',
    type: 'bar',
    height: 335,
    stacked: true,
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
  },
  responsive: [
    {
      breakpoint: 1536,
      options: {
        plotOptions: {
          bar: {
            borderRadius: 0,
            columnWidth: '25%',
          },
        },
      },
    },
  ],
  plotOptions: {
    bar: {
      horizontal: false,
      borderRadius: 0,
      columnWidth: '25%',
      borderRadiusApplication: 'end',
      borderRadiusWhenStacked: 'last',
    },
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  },
  legend: {
    position: 'top',
    horizontalAlign: 'left',
    fontFamily: 'Satoshi',
    fontWeight: 500,
    fontSize: '14px',
    markers: {
      radius: 99,
    },
  },
  fill: {
    opacity: 1,
  },
};

interface ChartTwoState {
  series: {
    name: string;
    data: number[];
  }[];
}

interface AuditData {
  id: number;
  organization: string;
  organizationType: string;
  auditType: string;
  auditStatus: string;
  riskLevel: string;
  findings: string;
  recommendations: string;
  auditor: string;
  date: string; // ISO date string
}

const ChartTwo: React.FC = () => {
  const [state, setState] = useState<ChartTwoState>({
    series: [
      {
        name: 'Completed Audits',
        data: [0, 0, 0, 0, 0, 0, 0], // Placeholder data
      },
      {
        name: 'Pending Audits',
        data: [0, 0, 0, 0, 0, 0, 0], // Placeholder data
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
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

        const responseGov = await axios.get('http://localhost:8081/api/governmentaudits/getall', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const responsePri = await axios.get('http://localhost:8081/api/privateaudits/getall', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const govData: AuditData[] = responseGov.data;
        const priData: AuditData[] = responsePri.data;

        console.log('Government Data:', govData);
        console.log('Private Data:', priData);

        // Extract current week's start and end dates
        const today = new Date();
        const firstDayOfWeek = today.getDate() - today.getDay(); // Sunday
        const lastDayOfWeek = firstDayOfWeek + 6; // Saturday
        const weekStart = new Date(today.setDate(firstDayOfWeek)).toISOString().split('T')[0];
        const weekEnd = new Date(today.setDate(lastDayOfWeek)).toISOString().split('T')[0];

        console.log('Week Start:', weekStart);
        console.log('Week End:', weekEnd);

        // Count audits by status for each day of the week
        const getCountByDay = (data: AuditData[], status: string) => {
          const counts = Array(7).fill(0); // Initialize counts for each day of the week

          data.forEach((item) => {
            const date = new Date(item.date);
            if (date >= new Date(weekStart) && date <= new Date(weekEnd)) {
              const dayIndex = date.getDay(); // 0 = Sunday, 1 = Monday, etc.
              if (item.auditStatus === status) {
                counts[dayIndex] += 1;
              }
            }
          });

          return counts;
        };

        const completedCounts = getCountByDay(govData, 'Completed');
        const pendingCounts = getCountByDay(priData, 'Pending');

        console.log('Completed Counts:', completedCounts);
        console.log('Pending Counts:', pendingCounts);

        setState({
          series: [
            {
              name: 'Completed Audits',
              data: completedCounts,
            },
            {
              name: 'Pending Audits',
              data: pendingCounts,
            },
          ],
        });
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error('Error response:', error.response?.data);
          console.error('Error status:', error.response?.status);
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
    <div className="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <div className="mb-4 justify-between gap-4 sm:flex">
        <div>
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Audit Progress This Week
          </h4>
        </div>
        <div>
          <div className="relative z-20 inline-block">
            <select
              name="#"
              id="#"
              className="relative z-20 inline-flex appearance-none bg-transparent py-1 pl-3 pr-8 text-sm font-medium outline-none"
            >
              <option value="" className='dark:bg-boxdark'>This Week</option>
              <option value="" className='dark:bg-boxdark'>Last Week</option>
            </select>
            <span className="absolute top-1/2 right-3 z-10 -translate-y-1/2">
              <svg
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.47072 1.08816C0.47072 1.02932 0.500141 0.955772 0.54427 0.911642C0.647241 0.808672 0.809051 0.808672 0.912022 0.896932L4.85431 4.60386C4.92785 4.67741 5.06025 4.67741 5.14851 4.60386L9.09079 0.896932C9.19376 0.793962 9.35557 0.808672 9.45854 0.911642C9.56151 1.01461 9.5468 1.17642 9.44383 1.27939L5.50155 4.98632C5.22206 5.23639 4.78076 5.23639 4.51598 4.98632L0.558981 1.27939C0.50014 1.22055 0.47072 1.16171 0.47072 1.08816Z"
                  fill="#637381"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M1.22659 0.546578L5.00141 4.09604L8.76422 0.557869C9.08459 0.244537 9.54201 0.329403 9.79139 0.578788C10.112 0.899434 10.0277 1.36122 9.77668 1.61224L9.76644 1.62248L5.81552 5.33722C5.36257 5.74249 4.6445 5.7544 4.19352 5.32924C4.19327 5.32901 4.19377 5.32948 4.19352 5.32924L0.225953 1.61241C0.102762 1.48922 -4.20186e-08 1.31674 -3.20269e-08 1.08816C-2.40601e-08 0.905899 0.0780105 0.712197 0.211421 0.578787C0.494701 0.295506 0.935574 0.297138 1.21836 0.539529L1.22659 0.546578ZM4.51598 4.98632C4.78076 5.23639 5.22206 5.23639 5.50155 4.98632L9.44383 1.27939C9.5468 1.17642 9.56151 1.01461 9.45854 0.911642C9.35557 0.808672 9.19376 0.793962 9.09079 0.896932L5.14851 4.60386C5.06025 4.67741 4.92785 4.67741 4.85431 4.60386L0.912022 0.896932C0.809051 0.808672 0.647241 0.808672 0.54427 0.911642C0.500141 0.955772 0.47072 1.02932 0.47072 1.08816C0.47072 1.16171 0.50014 1.22055 0.558981 1.27939L4.51598 4.98632Z"
                  fill="#637381"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>

      <div>
        <div id="chartTwo" className="-ml-5 -mb-9">
          <ReactApexChart
            options={options}
            series={state.series}
            type="bar"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartTwo;
