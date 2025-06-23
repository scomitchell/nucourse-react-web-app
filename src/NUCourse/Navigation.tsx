import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "./Account/reducer";
import "./styles.css";
import * as client from "./Account/client";

export default function NUCourseNavigation() {
    const { pathname } = useLocation();
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const signout = async () => {
        await client.signout();
        dispatch(setCurrentUser(null));
        navigate("/NUCourse");
    }

    return (
        <nav className="main-navbar w-100 d-flex justify-content-center position-fixed top-0 start-0 z-3">
            <Link to="/NUCourse"
                className={`nav-link-hover px-4 py-2 text-decoration-none border-0 me-2 
                    ${pathname === "/NUCourse" ? "active-link" : "text-white"}`}>
                Home
            </Link>
            {!currentUser ?
                <>
                    <Link to="/NUCourse/Account/Signin"
                        className={`nav-link-hover px-4 py-2 text-decoration-none border-0 me-2
                        ${pathname.includes("Signin") ? "active-link" : "text-white"}`}>
                        Signin
                    </Link>
                    <Link to="/NUCourse/Account/Signup"
                        className={`nav-link-hover px-4 py-2 text-decoration-none border-0
                        ${pathname.includes("Signup") ? "active-link" : "text-white"}`}>
                        Signup
                    </Link>
                </>
                :
                <>
                    <Link to={`/NUCourse/Account/Profile/${currentUser.username}`}
                        className={`nav-link-hover px-4 py-2 text-decoration-none border-0 me-2`}>
                        My Profile
                    </Link>
                    <Link to="/NUCourse"
                        onClick={signout}
                        className={`nav-link-hover px-4 py-2 text-decoration-none border-0 me-2`}>
                        Signout
                    </Link>
                    {currentUser.role === "ADMIN" &&
                        <Link to="/NUCourse/Account/Users"
                            className={`nav-link-hover px-4 py-2 text-decoration-none border-0 me-2`}>
                            Manage Users
                        </Link>
                    }
                </>
            }
        </nav>
    );
}