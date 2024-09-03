import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import DefaultLayout from './layout/DefaultLayout';
import AuditDashBoard from './pages/Dashboard/AuditDahsBoard';
import NewAudit from './pages/Audit/NewAudit';
import AuditProjects from './pages/Audit/ManageAuditProjects';
import AuditAssignments from './pages/Audit/AuditAssignments';
import AuditSettings from './pages/Audit/AuditSetting';
import Sidebar from './components/Sidebar'; // Adjust the path as needed
import Admin from './pages/Admin/Admin';
import ReportGeneration from './pages/Report/ReportGeneration';
import DailyReport from './pages/Report/DailyReport';
import WeeklyReport from './pages/Report/WeeklyReport';
import MonthlyReport from './pages/Report/MonthlyReport';
import CustomReport from './pages/Report/CustomReport';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <DefaultLayout>
      <Routes>
        <Route path="/audit/new" element={<NewAudit />} />
        <Route path="/audit/projects" element={<AuditProjects />} />
        <Route path="/audit/assignments" element={<AuditAssignments />} />
        <Route path="/audit/auditSetting" element={<AuditSettings />} />
        <Route path="/admin" element={<Admin />} />
        {/* Report Generation Routes */}
        <Route path="/ReportGeneration" element={<ReportGeneration />} />
        <Route path="/report/daily" element={<DailyReport />} />
        <Route path="/report/weekly" element={<WeeklyReport />} />
        <Route path="/report/monthly" element={<MonthlyReport />} />
        <Route path="/report/custom" element={<CustomReport />} />
        <Route
          path="/"
          element={
            <>
              <PageTitle title="Audit Dashboard | INSA" />
              <AuditDashBoard />
            </>
          }
        />
        <Route
          path="/Dashboard"
          element={
            <>
              <PageTitle title="Audit Dashboard | INSA" />
              <AuditDashBoard />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <PageTitle title="Profile | Audit Dashboard | INSA" />
              <Profile />
              {/* <Profile user={undefined} projects={undefined} /> */}
            </>
          }
        />
        <Route
          path="/tables"
          element={
            <>
              <PageTitle title="Tables | Audit Dashboard | INSA" />
              <Tables />
            </>
          }
        />
        <Route
          path="/settings"
          element={
            <>
              <PageTitle title="Settings | Audit Dashboard | INSA" />
              <Settings />
            </>
          }
        />
        <Route
          path="/auth/signin"
          element={
            <>
              <PageTitle title="Signin | Audit Dashboard | INSA" />
              <SignIn />
            </>
          }
        />
        <Route
          path="/auth/signup"
          element={
            <>
              <PageTitle title="Signup | Audit Dashboard | INSA" />
              <SignUp />
            </>
          }
        />
      </Routes>
    </DefaultLayout>
  );
}

export default App;
