import React from "react";
// import { Route, Routes } from "react-router";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CaseManagement from "./pages/CaseManagement";
import Login from "./pages/Login";

export const routes = {
    login: '/login',
    dashboard: '/dashboard',
    caseManagement: '/case_management'
}

export function AppRoutes() {
    return (
        <Routes>
            <Route path={routes.login} element={<Login />}></Route>
            <Route path={routes.dashboard} element={<Dashboard />}></Route>
            <Route path={routes.caseManagement} element={<CaseManagement />}></Route>
        </Routes>
    );
}