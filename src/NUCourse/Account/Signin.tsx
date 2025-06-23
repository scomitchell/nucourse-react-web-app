import { FormControl, Button } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";
import * as client from "./client";

export default function Signin() {
    const [credentials, setCredentials] = useState<any>({});
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const signin = async () => {
        const user = await client.signin(credentials);
        if (!user) return;

        dispatch(setCurrentUser(user));
        navigate("/NUCourse", { replace: true });
    };

    return (
        <div id="wd-signin-screen">
            <h1>Sign in</h1>
            <FormControl defaultValue={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                className="mb-2" placeholder="username" id="wd-username" />
            <FormControl defaultValue={credentials.password} type="password"
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                className="mb-2" placeholder="password" id="wd-password" />
            <Button onClick={signin} id="wd-signin-button" className="btn btn-danger w-100"> Sign in </Button>
        </div>
    );
}