import React from "react";
// import { Route, Routes } from "react-router";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CaseManagement from "./pages/CaseManagement";

export function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/dashboard" element={<Dashboard />}></Route>
                <Route path="/case_management" element={<CaseManagement />}></Route>
            </Routes>
        </BrowserRouter>
    );
}