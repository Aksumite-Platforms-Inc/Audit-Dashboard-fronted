import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import AuditDetails from './pages/audit-details';
import OrganizationAuditTable from './components/Tables/OrganizationAuditTable';
import AuthenticatedLayout from './layout/AuthenticatedLayout';
import UnauthenticatedLayout from './layout/unAuthanticatedLayout';
import AuditDashBoard from './pages/Dashboard/AuditDahsBoard';
import NewAudit from './pages/Audit/NewAudit';
import AuditProjects from './pages/Audit/ManageAuditProjects';
import AuditAssignments from './pages/Audit/AuditAssignments';
import AuditSettings from './pages/Audit/AuditSetting'; // Adjust the path as needed
import Admin from './pages/Admin/Admin';
import AddUser from './pages/Admin/AddUser';
import { useAuth } from './context/AuthContext'; // Assuming you have an AuthContext

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();
  const { isAuthenticated } = useAuth(); // Get authentication state from context

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <Routes>
      {isAuthenticated ? (
        <Route
          path="*"
          element={
            <AuthenticatedLayout>
              <Routes>
              
                <Route path="/add-user" element={<AddUser />} />
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
                      <Profile />
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
                <Route path="*" element={<Navigate to="/" />} />
                <Route path="/" element={<OrganizationAuditTable />} />
                <Route path="/audit-details/:id" element={<AuditDetails />} />
              </Routes>
            </AuthenticatedLayout>
          }
        />
      ) : (
        <Route
          path="*"
          element={
            <UnauthenticatedLayout>
              <Routes>
                <Route
                  path="/auth/signin"
                  element={
                    <>
                      <PageTitle title="Signin | Audit Dashboard | INSA" />
                      <SignIn />
                    </>
                  }
                />
                <Route path="*" element={<Navigate to="/auth/signin" />} />
              </Routes>
            </UnauthenticatedLayout>
          }
        />
      )}
    </Routes>
  );
}

export default App;