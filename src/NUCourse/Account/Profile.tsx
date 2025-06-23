import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, FormControl } from "react-bootstrap";
import { useSelector } from "react-redux";
import { setCurrentUser } from "./reducer";
import * as client from "./client";
import MyProfile from "./MyProfile";
import SocialProfile from "./SocialProfile";

export default function Profile() {
    const [profile, setProfile] = useState<any>({});
    const { username } = useParams();
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const [current, setCurrent] = useState(false);
    const [loading, setLoading] = useState(true);

    const fetchProfile = async () => {
        if (!username) return;

        if (currentUser && currentUser.username === username) {
            setCurrent(true);
        }

        const user = await client.findUserByUsername(username);
        setProfile(user);
        setLoading(false);
    }

    useEffect(() => {
        setLoading(true);
        fetchProfile();
    }, [username]);

    if (loading) {
        return (
            <p> Loading ... </p>
        );
    }

    return (
        <div className="wd-profile-screen">
            {current ?
                <MyProfile profile={profile} setProfile={setProfile} /> :
                <SocialProfile profile={profile} setProfile={setProfile} />
             }
        </div>
    );
}