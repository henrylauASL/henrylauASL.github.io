import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CaseManagement from "./pages/CaseManagement";
import Login from "./pages/Login";
import MyCase from "./pages/MyCase";

export const routes = {
    login: '/login',
    myCase: '/task',
    dashboard: '/dashboard',
    caseManagement: '/case_management'
}

export function AppRoutes() {
    return (
        <Routes>
            <Route path={routes.login} element={<Login />}></Route>
            <Route path={routes.myCase} element={<MyCase />}></Route>
            <Route path={routes.dashboard} element={<Dashboard />}></Route>
            <Route path={routes.caseManagement} element={<CaseManagement />}></Route>
        </Routes>
    );
}