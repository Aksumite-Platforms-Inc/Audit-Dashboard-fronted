import React, { useState, ReactNode } from 'react';
import Header from '../components/Header/index';
import Sidebar from '../components/Sidebar/index';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';

const AuthenticatedLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="dark:bg-boxdark-2 dark:text-bodydark min-h-screen flex">
            {/* <!-- ===== Sidebar Start ===== --> */}
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            {/* <!-- ===== Sidebar End ===== --> */}

            <div className="flex flex-1 flex-col overflow-hidden">
                {/* <!-- ===== Header Start ===== --> */}
                <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                {/* <!-- ===== Header End ===== --> */}

                {/* <!-- ===== Main Content Start ===== --> */}
                <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                    {/* <!-- ===== Breadcrumb Start ===== --> */}
                    <div className="p-4 md:p-6 2xl:p-10 bg-white dark:bg-boxdark shadow-sm">
                        <Breadcrumb pageName="Your Page Name" />
                    </div>
                    {/* <!-- ===== Breadcrumb End ===== --> */}

                    <main className="flex-1">
                        <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                            {children}
                        </div>
                    </main>
                </div>
                {/* <!-- ===== Main Content End ===== --> */}
            </div>
        </div>
    );
};

export default AuthenticatedLayout;
