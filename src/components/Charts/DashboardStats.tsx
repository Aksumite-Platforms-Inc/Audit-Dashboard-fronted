import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { fetchGovernmentAudits, fetchPrivateAudits, parseJwt } from '../../api/AuditApi';


// Removed unused interface PriAuditData

const CardDataStats = ({
  title,
  total,
  rate,
  levelUp,
  levelDown,
  children,
}: {
  title: string;
  total: string | number;
  rate: string;
  levelUp: boolean;
  levelDown: boolean;
  children?: React.ReactNode;
}) => {
  return (
    <div className="rounded-lg border border-stroke bg-white p-6 shadow-md dark:border-strokedark dark:bg-boxdark">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-base font-medium text-black dark:text-white">{title}</h4>
          <p className="mt-1 text-2xl font-semibold text-primary dark:text-white">{total}</p>
        </div>
        <div className="flex items-center">
          <span
            className={`text-base font-medium ${levelUp ? 'text-green-500' : levelDown ? 'text-red-500' : 'text-gray-500'
              }`}
          >
            {rate}
          </span>
          <div className="ml-3">{children}</div>
        </div>
      </div>
    </div>
  );
};

const DashboardStats = () => {
  const [governmentCount, setGovernmentCount] = useState(0);
  const [privateCount, setPrivateCount] = useState(0); // New state for counting government audits
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      console.log(token);

      if (!token) {
        console.error('No token found');
        // Handle token absence (e.g., redirect to login)
        return;
      }

      try {
        const role = parseJwt(token).role;
        if (role !== 'ADMIN') {
          console.error('Unauthorized: User does not have ADMIN role');
          return;
        }

        const governmentAudits = await fetchGovernmentAudits(token);
        const privateAudits = await fetchPrivateAudits(token);

        console.log(governmentAudits);
        console.log(privateAudits);

        setGovernmentCount(governmentAudits.length);
        setPrivateCount(privateAudits.length);
        setLoading(false);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          // Handle axios errors
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

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
      <CardDataStats title="Total Audits" total={privateCount + governmentCount} rate="+5%" levelUp levelDown={false}>
        <svg
          className="fill-primary dark:fill-white"
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.75 5.5C2.75 4.25736 3.75736 3.25 5 3.25H17C18.2426 3.25 19.25 4.25736 19.25 5.5V16.5C19.25 17.7426 18.2426 18.75 17 18.75H5C3.75736 18.75 2.75 17.7426 2.75 16.5V5.5Z"
            fill="currentColor"
          />
          <path
            d="M7.75 7.25H8.25C8.66421 7.25 9 7.58579 9 8V14C9 14.4142 8.66421 14.75 8.25 14.75H7.75C7.33579 14.75 7 14.4142 7 14V8C7 7.58579 7.33579 7.25 7.75 7.25Z"
            fill="white"
          />
          <path
            d="M11.25 10.25H11.75C12.1642 10.25 12.5 10.5858 12.5 11V14C12.5 14.4142 12.1642 14.75 11.75 14.75H11.25C10.8358 14.75 10.5 14.4142 10.5 14V11C10.5 10.5858 10.8358 10.25 11.25 10.25Z"
            fill="white"
          />
          <path
            d="M14.75 6.25H15.25C15.6642 6.25 16 6.58579 16 7V14C16 14.4142 15.6642 14.75 15.25 14.75H14.75C14.3358 14.75 14 14.4142 14 14V7C14 6.58579 14.3358 6.25 14.75 6.25Z"
            fill="white"
          />
        </svg>
      </CardDataStats>

      {/* Card for Government Audits */}
      <CardDataStats
        title="Government Audits"
        total={governmentCount} // Dynamically display the number of government audits
        rate="+10%"
        levelUp
        levelDown={false}
      >
        <svg
          className="fill-primary dark:fill-white"
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.95 2.686C11.9835 2.60972 12.0165 2.60972 12.05 2.686L14.8 8.565C14.8335 8.64128 14.8994 8.71814 14.9698 8.74888L21.6 11.524C21.6747 11.5584 21.6747 11.6281 21.6 11.6625L14.9698 14.4376C14.8994 14.4683 14.8335 14.5452 14.8 14.6215L12.05 20.5C12.0165 20.5763 11.9835 20.5763 11.95 20.5L9.20005 14.6215C9.16652 14.5452 9.10061 14.4683 9.03024 14.4376L2.40005 11.6625C2.32528 11.6281 2.32528 11.5584 2.40005 11.524L9.03024 8.74888C9.10061 8.71814 9.16652 8.64128 9.20005 8.565L11.95 2.686Z"
            fill="currentColor"
          />
        </svg>
      </CardDataStats>

      <CardDataStats title="Private Audits" total={privateCount} rate="-2%" levelUp={false} levelDown>
        {/* Your SVG content */}
      </CardDataStats>

      <CardDataStats title="Average Audit Duration" total="3 days" rate="-1 day" levelDown levelUp={false}>
        {/* Your SVG content */}
      </CardDataStats>
    </div>
  );
};

export default DashboardStats;