import { useEffect, useState } from "react";
import { Table, Button, FormControl } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { Link } from "react-router-dom";
import * as client from "./client"

export default function Users() {
    const [users, setUsers] = useState<any>([]);
    const [user, setUser] = useState<any>({});
    const [editing, setEditing] = useState(false);

    const deleteUser = async (userId: string) => {
        await client.deleteUser(userId);
    };

    const updateUser = async () => {
        await client.updateUser(user);
        setEditing(false);
    }

    const fetchAllUsers = async () => {
        const users = await client.findAllUsers();
        setUsers(users);
    }

    useEffect(() => {
        fetchAllUsers();
    }, []);

    return (
        <div id="wd-manage-users">
            <Table striped>
                <thead>
                    <tr><th>Name</th><th>Username</th><th>Role</th></tr>
                </thead>
                <tbody>
                    {users.map((user: any) => (
                        <tr key={user._id}>
                            {!editing ?
                                <>
                                    <td className="wd-full-name text-nowrap">
                                        <Link to={`/NUCourse/Account/Profile/${user.username}`} className="text-decoration-none">
                                            <FaUserCircle className="me-2 fs-1 text-secondary" />
                                            <span className="wd-first-name">{user.firstName}</span>{" "}
                                            <span className="wd-last-name">{user.lastName}</span>
                                        </Link>
                                    </td>
                                    <td className="wd-username">{user.username}</td>
                                    <td className="wd-role">{user.role}</td>
                                </>
                                :
                                <>
                                    <td className="wd-editing text-nowrap">
                                        <FormControl className="wd-first-name mb-2" value={user.firstName}
                                            onChange={(e) => setUser({...user, firstName: e.target.value})}/>
                                        <FormControl className="wd-last-name mb-2" value={user.lastName}
                                            onChange={(e) => setUser({ ...user, lastName: e.target.value })} />
                                    </td>
                                    <td>
                                        <FormControl className="wd-username mb-2" defaultValue={user.username}
                                            onChange={(e) => setUser({ ...user, username: e.target.value })} />
                                    </td>
                                    <td>
                                        <select onChange={(e) => setUser({ ...user, role: e.target.value })}
                                            className="form-control mb-2" id="wd-role" value={user.role}>
                                            <option value="USER">User</option>
                                            <option value="ADMIN">Admin</option>
                                        </select>
                                    </td>
                                    <Button onClick={updateUser} className="bg-primary text-white border-0 ms-2">
                                        Save
                                    </Button>
                                    <Button onClick={() => setEditing(false)} className="bg-secondary text-white border-0 ms-2">
                                        Cancel
                                    </Button>
                                    <Button onClick={() => {
                                            if (window.confirm("Are you sure you want to delete this user?")) {
                                                deleteUser(user._id);
                                            }
                                            }}
                                            className="border-0 ms-2 bg-danger text-white">
                                        Delete User
                                    </Button>
                                </>
                            }
                            <Button onClick={() => setEditing(!editing)} className="ms-2">
                                <FaPencil className="text-danger" />
                            </Button>

                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}