import { useEffect, useState } from "react";
import { FormControl, Card, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import * as client from "./Courses/client";

export default function NUCourse() {
    const [courses, setCourses] = useState<any>([]);
    const [showForm, setShowForm] = useState(false);
    const [course, setCourse] = useState<any>({});
    const { currentUser } = useSelector((state: any) => state.accountReducer);

    const renderStars = (rating: number) => {
        const fullStars = Math.floor(rating);
        const emptyStars = 5 - fullStars;

        return (
            <>
                {"★".repeat(fullStars)}
                {"☆".repeat(emptyStars)}
            </>
        );
    };

    const deleteCourse = async (courseId: string) => {
        await client.deleteCourse(courseId);
    };

    const filterCoursesByTitle = async (title: string) => {
        if (title) {
            const courses = await client.findCoursesByTitle(title);
            setCourses(courses);
            console.log(courses);
        } else {
            fetchCourses();
        }
    };

    const createCourse = async () => {
        if (!course.title || !course.department || !course.subject || !course.number) {
            alert("Please complete all fields before submitting");
            return;
        }

        try {
            const newCourse = await client.createCourse(course);
            setCourses([...courses, newCourse]);
            setCourse(newCourse);
            setShowForm(false);
        } catch (err) {
            console.error("Failed to add course ", err);
        }
    };

    const fetchCourses = async () => {
        const courses = await client.findAllCourses();
        setCourses(courses);
    };

    useEffect(() => {
        fetchCourses();
    }, [courses]);

    return (
        <div id="wd-nucourse">

            <div className="d-flex align-items-center">
                <h1 className="p-3">NUCourse</h1>

                {currentUser && currentUser.role === "ADMIN" && (
                    <Button onClick={() => setShowForm(true)} className="btn btn-danger">
                        Add New Course
                    </Button>
                )}

            </div>

            {!currentUser &&
                <div className="ms-3 align-items-center">
                    <span>Please sign in to review:{" "}</span>
                    <Link to="/NUCourse/Account/Signin" className="btn btn-primary ms-3">
                        Signin
                    </Link>
                </div>
            }

            <div className="p-3 d-flex">
                <div>
                    <FormControl className="mb-2" placeholder="Search" id="wd-search"
                        onChange={(e) => filterCoursesByTitle(e.target.value)} />

                    {courses.map((course: any) =>
                        <Card className="mb-2">
                            <Link to={`/NUCourse/Courses/${course.number}`}
                                className="wd-dashboard-course-link text-decoration-none text-dark" >
                            <Card.Body>
                                    <Card.Title className="card-body">{course.title} ({course.number})</Card.Title>
                                    <Card.Text className="wd-card-text p-2">
                                        <div>
                                            <strong>Average Overall Rating:</strong> {course.ovr_rating} {" "}
                                            <span className="text-warning">{renderStars(course.ovr_rating)}</span>
                                        </div>
                                        <div>
                                            <strong>Average Course Difficulty:</strong> {course.difficulty} {" "}
                                            <span className="text-warning">{renderStars(course.difficulty)}</span>
                                        </div>
                                        <div>
                                            <strong>Average Learning Score:</strong> {course.learning_score} {" "}
                                            <span className="text-warning">{renderStars(course.learning_score)}</span>
                                        </div>
                                    </Card.Text>
                                    {currentUser && currentUser.role === "ADMIN" &&
                                        <Button onClick={(e) => {
                                            e.preventDefault()
                                            deleteCourse(course._id)
                                        }} className="btn btn-danger">
                                            Delete Course
                                        </Button>
                                    }
                                </Card.Body>
                            </Link>
                        </Card>
                    )}
                </div>

                <div className="ps-3">
                    <Card className="mb-2">
                        <Card.Body>
                            <Card.Title>Created By Scott Brinkley</Card.Title>
                            <Card.Text className="p-2">
                                <a href="https://github.com/scomitchell/nucourse-react-web-app">
                                    React Project Github
                                </a> <br />
                                <a href="https://github.com/scomitchell/nucourse-node-server-app">
                                    Node Project Github
                                </a>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Body>
                            <Card.Title>Methodology</Card.Title>
                            <Card.Text className="p-2">
                                <p>Overall rating: 1 to 5 where 5 is the best <br />
                                    Course Difficulty: 1 to 5 where 5 is the most difficult <br />
                                    Learning Score: 1 to 5 where 5 has the most educational value
                                </p>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>

                <Modal show={showForm} onHide={() => setShowForm(false)} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Add New Course</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormControl
                            placeholder="Title"
                            className="mb-2"
                            onChange={(e) => setCourse({ ...course, title: e.target.value })}
                        />
                        <FormControl
                            placeholder="Department"
                            className="mb-2"
                            onChange={(e) => setCourse({ ...course, department: e.target.value })}
                        />
                        <FormControl
                            placeholder="Subject"
                            className="mb-2"
                            onChange={(e) => setCourse({ ...course, subject: e.target.value })}
                        />
                        <FormControl
                            placeholder="Course Number"
                            className="mb-2"
                            onChange={(e) => setCourse({ ...course, number: e.target.value })}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowForm(false)}>
                            Cancel
                        </Button>
                        <Button onClick={createCourse} className="btn btn-danger">Add Course</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
}