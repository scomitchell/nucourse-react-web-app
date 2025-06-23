import { Route, Routes } from "react-router-dom";
import CoursePage from "./CoursePage";

export default function Courses() {
    return (
        <div id="wd-courses-screen">
            <Routes>
                <Route path=":courseNum/*" element={<CoursePage /> } />
            </Routes>
        </div>
    );
}