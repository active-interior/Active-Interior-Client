import React from 'react';
import {
    createBrowserRouter
} from "react-router-dom";
import Main from '../Main/Main';
import Home from '../Home/Home';
import StaffsInterior from '../Staffs_Interior/StaffsInterior';
import Accounts from '../Accounts/Accounts';
import Settings from '../Settings/Settings';
import StaffsHomeInterior from '../Staffs_Interior/StaffsHome';
import CreateNewStaffsInterior from '../Staffs_Interior/CreateNewStaffsInterior';
import StaffsAttendanceInterior from '../Staffs_Interior/StaffsAttendance';
import StaffsTransectionsInterior from '../Staffs_Interior/StaffsTransectionsInterior';
import StaffStatusInterior from '../Staffs_Interior/StaffStatusInterior';
import EditStaffsDataInterior from '../Staffs_Interior/EditStaffsDataInterior';
import InteriorMain from '../Main/InteriorMain';
import ConstructionMain from '../Main/ConstructionMain';
import InteriorHome from '../Home/InteriorHome';
import ConstructionHome from '../Home/ConstructionHome';
import StaffsConstruction from '../Staffs_Construction/StaffsConstruction';
import CreateNewStaffsConstruction from '../Staffs_Construction/CreateNewStaffsConstruction';
import StaffsAttendanceConstruction from '../Staffs_Construction/StaffsAttendanceConstruction';
import StaffsTransectionsConstruction from '../Staffs_Construction/StaffsTransectionsConstruction';
import StaffStatusConstruction from '../Staffs_Construction/StaffStatusConstruction';
import EditStaffsDataConstruction from '../Staffs_Construction/EditStaffsDataConstruction';
import Projects_Construction from '../Projects_Construction/Projects_Construction';
import Projects_Interior from '../Projects_Interior/Projects_Interior';
import CreateNewProjectConstruction from '../Projects_Construction/CreateNewProjectConstruction';
import AllProjectsConstruction from '../Projects_Construction/AllProjectsConstruction';
import RunningProjectsConstruction from '../Projects_Construction/RunningProjectsConstruction';
import CompletedProjectsConstruction from '../Projects_Construction/CompletedProjectsConstruction';
import ChangeProjectsStatusConstruction from '../Projects_Construction/ChangeProjectsStatusConstruction';
import EditProjectsDataConstruction from '../Projects_Construction/EditProjectsDataConstruction';
import ViewProjectDetailsConstruction from '../Projects_Construction/ViewProjectDetailsConstruction';
import StaffsSummaryConstruction from '../Staffs_Construction/StaffsSummaryConstruction';
import EditStffsDataFormConstruction from '../Staffs_Construction/EditStffsDataFormConstruction';
import AllStaffsConstructionHome from '../Staffs_Construction/All_Staffs_Construction/AllStaffsConstructionHome';
import StaffsProfileConstruction from '../Staffs_Construction/All_Staffs_Construction/StaffsProfileConstruction';
import AllStaffsConstruction from '../Staffs_Construction/All_Staffs_Construction/AllStaffsConstruction';
import EditProjectDataFormConstruction from '../Projects_Construction/EditProjectDataFormConstruction';
import CreateNewVoucherConstruction from '../Accounts/CreateNewVoucherConstruction';
import CreateCustomVoucherConstruction from '../Accounts/CreateCustomVoucherConstruction';
import CreateProjectVoucherConstruction from '../Accounts/CreateProjectVoucherConstruction';
import AccountsHome from '../Accounts/AccountsHome';
import CashIn from '../Accounts/CashIn';
import CashOut from '../Accounts/CashOut';
import CashInProject from '../Accounts/CashInProject';
import CashInLoan from '../Accounts/CashInLoan';
import CashInInvestment from '../Accounts/CashInInvestment';
import CashInOthers from '../Accounts/CashInOthers';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>,
            }
        ]
    },
    {
        path: '/interior',
        element: <InteriorMain></InteriorMain>,
        children: [
            {
                path: '/interior',
                element: <InteriorHome></InteriorHome>
            },
            {
                path: '/interior/staffs',
                element: <StaffsInterior></StaffsInterior>,
                children: [
                    {
                        path: '/interior/staffs',
                        element: <StaffsHomeInterior></StaffsHomeInterior>
                    },
                    {
                        path: '/interior/staffs/create_new_staffs',
                        element: <CreateNewStaffsInterior></CreateNewStaffsInterior>
                    },
                    {
                        path: '/interior/staffs/staffs_attendance',
                        element: <StaffsAttendanceInterior></StaffsAttendanceInterior>
                    },
                    {
                        path: '/interior/staffs/staffs_transections',
                        element: <StaffsTransectionsInterior></StaffsTransectionsInterior>
                    },
                    {
                        path: '/interior/staffs/staffs_status',
                        element: <StaffStatusInterior></StaffStatusInterior>
                    },
                    {
                        path: '/interior/staffs/edit_staffs_data',
                        element: <EditStaffsDataInterior></EditStaffsDataInterior>
                    }
                ]
            },
            {
                path: '/interior/projects',
                element: <Projects_Interior></Projects_Interior>
            },
            {
                path: '/interior/accounts',
                element: <Accounts></Accounts>
            },
            {
                path: '/interior/settings',
                element: <Settings></Settings>
            }
        ]
    },
    {
        path: '/construction',
        element: <ConstructionMain></ConstructionMain>,
        children: [
            {
                path: '/construction',
                element: <ConstructionHome></ConstructionHome>
            },
            {
                path: '/construction/staffs',
                element: <StaffsConstruction></StaffsConstruction>,
                children: [
                    {
                        path: '/construction/staffs/',
                        element: <AllStaffsConstructionHome></AllStaffsConstructionHome>,
                        children: [
                            {
                                path: '/construction/staffs/:category',
                                element: <AllStaffsConstruction></AllStaffsConstruction>
                            },
                            {
                                path: '/construction/staffs/profile/:staff_id',
                                element: <StaffsProfileConstruction></StaffsProfileConstruction>
                            }
                        ]
                    },
                    {
                        path: '/construction/staffs/create_new_staffs',
                        element: <CreateNewStaffsConstruction></CreateNewStaffsConstruction>
                    },
                    {
                        path: '/construction/staffs/staffs_attendance',
                        element: <StaffsAttendanceConstruction></StaffsAttendanceConstruction>
                    },
                    {
                        path: '/construction/staffs/staffs_transections',
                        element: <StaffsTransectionsConstruction></StaffsTransectionsConstruction>
                    },
                    {
                        path: '/construction/staffs/staffs_summary',
                        element: <StaffsSummaryConstruction></StaffsSummaryConstruction>
                    },
                    {
                        path: '/construction/staffs/staffs_status',
                        element: <StaffStatusConstruction></StaffStatusConstruction>
                    },
                    {
                        path: '/construction/staffs/edit_staffs_data',
                        element: <EditStaffsDataConstruction></EditStaffsDataConstruction>,
                        loader: (() => fetch(`http://localhost:3000/construction_staffs`))
                    },
                    {
                        path: '/construction/staffs/edit_staffs_form/:id',
                        element: <EditStffsDataFormConstruction></EditStffsDataFormConstruction>
                    }
                ]
            },
            {
                path: '/construction/projects',
                element: <Projects_Construction></Projects_Construction>,
                children: [
                    {
                        path: '/construction/projects/all_projects',
                        element: <AllProjectsConstruction></AllProjectsConstruction>,
                        loader: (() => fetch(`http://localhost:3000/construction_projects`))
                    },
                    {
                        path: '/construction/projects/create_new_project',
                        element: <CreateNewProjectConstruction></CreateNewProjectConstruction>
                    },
                    {
                        path: '/construction/projects/view_project_details/:id',
                        element: <ViewProjectDetailsConstruction></ViewProjectDetailsConstruction>,
                    },
                    {
                        path: '/construction/projects/running_projects',
                        element: <RunningProjectsConstruction></RunningProjectsConstruction>
                    },
                    {
                        path: '/construction/projects/completed_projects',
                        element: <CompletedProjectsConstruction></CompletedProjectsConstruction>
                    },
                    {
                        path: '/construction/projects/change_projects_status',
                        element: <ChangeProjectsStatusConstruction></ChangeProjectsStatusConstruction>
                    },
                    {
                        path: '/construction/projects/edit_projects_data',
                        element: <EditProjectsDataConstruction></EditProjectsDataConstruction>
                    },
                    {
                        path: '/construction/projects/edit_projects_data/:id',
                        element: <EditProjectDataFormConstruction></EditProjectDataFormConstruction>
                    }
                ]
            },
            {
                path: '/construction/accounts',
                element: <Accounts></Accounts>,
                children: [
                    {
                        path: '/construction/accounts/dashboard',
                        element: <AccountsHome></AccountsHome>,
                    },
                    {
                        path: '/construction/accounts/create_new_voucher',
                        element: <CreateNewVoucherConstruction></CreateNewVoucherConstruction>,
                        children: [
                            {
                                path: '/construction/accounts/create_new_voucher/',
                                element: <CreateCustomVoucherConstruction></CreateCustomVoucherConstruction>
                            },
                            {
                                path: '/construction/accounts/create_new_voucher/projects_voucher',
                                element: <CreateProjectVoucherConstruction></CreateProjectVoucherConstruction>
                            }
                        ]
                    },
                    {
                        path: '/construction/accounts/cash_in',
                        element: <CashIn></CashIn>,
                        children: [
                            {
                                path: '/construction/accounts/cash_in/project',
                                element: <CashInProject></CashInProject>
                            },
                            {
                                path: '/construction/accounts/cash_in/loan',
                                element: <CashInLoan></CashInLoan>
                            },
                            {
                                path: '/construction/accounts/cash_in/investment',
                                element: <CashInInvestment></CashInInvestment>
                            },
                            {
                                path: '/construction/accounts/cash_in/others',
                                element: <CashInOthers></CashInOthers>
                            },
                        ]
                    },
                    {
                        path: '/construction/accounts/cash_out',
                        element: <CashOut></CashOut>
                    }
                ]
            },
            {
                path: '/construction/settings',
                element: <Settings></Settings>
            }
        ]
    }
])

export default router;