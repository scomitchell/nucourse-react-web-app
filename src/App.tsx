import NUCourse from "./NUCourse";
import Account from "./NUCourse/Account";
import Courses from "./NUCourse/Courses"
import "../styles.css"
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import store from "./NUCourse/store";
import Navigation from "./NUCourse/Navigation";
import { Provider } from "react-redux";

export default function App() {
    return (
        <HashRouter>
            <Provider store={store}>
                <div id="wd-main-app">
                    <Navigation />
                    <div className="wd-main-content-offset p-3">
                        <Routes>
                            <Route path="/" element={<Navigate to="NUCourse" />} />
                            <Route path="/NUCourse/*" element={<NUCourse />} />
                            <Route path="/NUCourse/Account/*" element={<Account />} />
                            <Route path="/NUCourse/Courses/*" element={<Courses />} />
                        </Routes>
                    </div>
                </div>
            </Provider>
        </HashRouter>
    );
}
