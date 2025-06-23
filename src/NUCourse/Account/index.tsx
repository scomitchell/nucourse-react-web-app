import { useSelector } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";
import * as client from "./client";
import Signin from "./Signin";
import Signup from "./Signup";
import Profile from "./Profile";
import Users from "./Users";
import "../styles.css"

export default function Account() {
    return (
        <div id="wd-account-screen">
            <Routes>
                <Route index element={<Navigate to="Signin" />} />
                <Route path="Signin/*" element={<Signin />} />
                <Route path="Signup/*" element={<Signup />} />
                <Route path="Profile/:username" element={<Profile />} />
                <Route path="Users/*" element={<Users /> } />
            </Routes>
        </div>
    );
}