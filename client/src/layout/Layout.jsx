import React from "react";
import Navbar from "../components/Nav/Navbar";
import { Home } from "../components/Home";
import { Outlet } from "react-router-dom";
export const Layout = () => {
    return (
        <div>
            <Navbar />
            <Outlet />
        </div>
    );
};
