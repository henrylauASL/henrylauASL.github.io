import React from "react";
// import { Route, Routes } from "react-router";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CaseManagement from "./pages/CaseManagement";
import MyCase from "./pages/MyCase";
import Login from "./pages/Login";

export const routes = {
    dashboard: '/',
    caseManagement: '/case_management'
}

export function AppRoutes() {
    return (
        <Routes>
            {/* <Route path="/" element={<MyCase />}></Route> */}
            <Route path={routes.dashboard} element={<Dashboard />}></Route>
            <Route path={routes.caseManagement} element={<CaseManagement />}></Route>
            <Route path="/login" element={<Login />}></Route>
        </Routes>
    );
}