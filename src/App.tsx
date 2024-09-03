import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignUp from './pages/Authentication/SignUp';
import SignIn from './pages/Authentication/SignIn';
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
       path="/"
       element={<Navigate to="/auth/signin" replace />
        
       }
       
          
          
        />
          <Route
            path="/dashboard"
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
              <Profile user={undefined} projects={undefined} />
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
