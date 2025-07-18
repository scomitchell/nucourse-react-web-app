import { FormControl, Button } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";
import * as client from "./client";

export default function Signup() {
    const [user, setUser] = useState<any>({});
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const signup = async () => {
        const currentUser = await client.signup(user);
        dispatch(setCurrentUser(currentUser));
        navigate("/NUCourse");
    }

    return (
        <div id="wd-sign-up-screen">
            <h1>Sign Up</h1>
            <FormControl placeholder="Username" id="wd-username" className="mb-2"
                onChange={(e) => setUser({ ...user, username: e.target.value })} />
            <FormControl placeholder="Password" id="wd-password" type="password" className="mb-2"
                onChange={(e) => setUser({ ...user, password: e.target.value })} />
            <FormControl placeholder="First Name" id="wd-firstName" className="mb-2"
                onChange={(e) => setUser({ ...user, firstName: e.target.value })} />
            <FormControl placeholder="Last Name" id="wd-lastName" className="mb-2"
                onChange={(e) => setUser({ ...user, lastName: e.target.value })} />
            <select onChange={(e) => setUser({ ...user, role: e.target.value })}
                className="form-control mb-2" id="wd-role" value={user.role}>
                <option value="USER">User</option>
                <option value="FACULTY">School Faculty</option>
            </select>
            <Button className="btn btn-danger w-100" onClick={signup} id="wd-signup-button">Sign up</Button>
        </div>
    );
}