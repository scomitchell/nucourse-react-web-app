import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Card, FormGroup, FormControl, FormLabel, Button, Row, Col } from "react-bootstrap";
import * as client from "./client"; 
import * as reviewClient from "../Reviews/client";

export default function CoursePage() {
    const { courseNum } = useParams();
    const [course, setCourse] = useState<any>({});
    const [reviews, setReviews] = useState<any>([]);
    const [review, setReview] = useState<any>({});
    const [editing, setEditing] = useState(false);
    
    const { currentUser } = useSelector((state: any) => state.accountReducer);

    const updateCourse = async () => {
        await client.updateCourse(course);
        setEditing(false);
    };

    const fetchCourse = async () => {
        if (!courseNum) {
            return;
        }

        const course = await client.findCourseByNumber(courseNum);
        setCourse(course);

        const reviews = await reviewClient.findReviewsForCourse(course.number);
        setReviews(reviews);
        setReview({ ...review, course: course.number, user: currentUser.username });
    };

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

    const addReview = async () => {
        if (!review.ovr_rating || !review.difficulty || !review.learning_score) {
            alert("Please complete all rating fields before submitting.");
            return;
        }

        try {
            const newReview = await reviewClient.createReview(review);
            setReviews([...reviews, newReview]);
            setReview({ ...review, notes: "" });
        } catch (err) {
            console.error("Failed to add review:", err);
        }
    };


    useEffect(() => {
        fetchCourse();
    }, [courseNum])

    return (
        <div id="wd-course-page">

            {!editing ?
                <>
                    <div className="d-flex align-items-center">
                        <h1>{course.title}</h1>
                        {currentUser && (currentUser.role === "ADMIN" || currentUser.role === "FACULTY") &&
                            <Button onClick={(e) => {
                                e.preventDefault()
                                setEditing(true)
                            }} className="btn btn-warning ms-2">
                                Edit Course
                            </Button>
                        }
                    </div>
                    <h2>Course Number: {course.number}</h2>
                    <span>Department: {course.department}</span> <br />
                    <span>Subject: {course.subject}</span>
                    <hr />
                </>
                :
                <>
                    <FormControl placeholder="Course Title" className="mb-2" value={course.title}
                        onChange={(e) => setCourse({ ...course, title: e.target.value })} />
                    <FormControl placeholder="Course Number" className="mb-2" value={course.number}
                        onChange={(e) => setCourse({ ...course, number: e.target.value })} />
                    <FormControl placeholder="Course Department" className="mb-2" value={course.department}
                        onChange={(e) => setCourse({ ...course, department: e.target.value })} />
                    <FormControl placeholder="Course Subject" className="mb-2" value={course.subject}
                        onChange={(e) => setCourse({ ...course, subject: e.target.value })} />
                    <Button onClick={updateCourse} className="btn btn-primary">
                        Save Course
                    </Button>
                </>
            }
            <h2>Reviews</h2>
            {!currentUser &&
                <div className="mb-3 align-items-center">
                    <span>Please sign in to add a review:{" "}</span>
                    <Link to="/NUCourse/Account/Signin" className="btn btn-primary ms-3">
                        Signin
                    </Link>
                </div>
            }
            <div id="wd-course-reviews" className="d-flex gap-4 align-items-start">
                <div className="flex-grow-1">
                    {reviews.map((review: any) =>
                        <Card className="wd-reviews-card mb-2">
                            <Card.Body className="card-body">
                                <Card.Title className="wd-card-title">
                                    Reviewer:{" "}
                                    <Link to={`/NUCourse/Account/Profile/${review.user}`}
                                        className="wd-dashboard-course-link" >
                                        {review.user}
                                    </Link>
                                </Card.Title>
                                <div>
                                    <strong>Average Overall Rating:</strong> {review.ovr_rating} {" "}
                                    <span className="text-warning">{renderStars(review.ovr_rating)}</span>
                                </div>
                                <div>
                                    <strong>Course Difficulty:</strong> {review.difficulty} {" "}
                                    <span className="text-warning">{renderStars(review.difficulty)}</span>
                                </div>
                                <div>
                                    <strong>Learning Score:</strong> {review.learning_score} {" "}
                                    <span className="text-warning">{renderStars(review.learning_score)}</span>
                                </div>
                                <div>
                                    <strong>Notes:</strong> {review.notes}
                                </div>
                            </Card.Body>
                        </Card>
                    )}
                </div>

                {currentUser &&
                    <div style={{ minWidth: "300px" }}>
                        <FormGroup as={Row} className="mb-3 align-items-center">
                            <FormLabel column sm={4}>Overall rating (1 to 5)</FormLabel>
                            <Col sm={8}>
                                <FormControl
                                    placeholder="Overall rating"
                                    id="wd-ovr-rating"
                                    type="number"
                                    defaultValue={5}
                                    onChange={(e) => setReview({ ...review, ovr_rating: parseFloat(e.target.value) })}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup as={Row} className="mb-3 align-items-center">
                            <FormLabel column sm={4}>Difficulty Rating (1 to 5)</FormLabel>
                            <Col sm={8}>
                                <FormControl
                                    placeholder="difficulty"
                                    id="wd-difficulty"
                                    type="number"
                                    defaultValue={5}
                                    onChange={(e) => setReview({ ...review, difficulty: parseFloat(e.target.value) })}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup as={Row} className="mb-3 align-items-center">
                            <FormLabel column sm={4}>Educational Value (1 to 5)</FormLabel>
                            <Col sm={8}>
                                <FormControl
                                    placeholder="password"
                                    id="wd-password"
                                    type="number"
                                    defaultValue={5}
                                    onChange={(e) => setReview({ ...review, learning_score: parseFloat(e.target.value) })}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup as={Row} className="mb-3 align-items-center">
                            <FormLabel column sm={4}>Comments</FormLabel>
                            <Col sm={8}>
                                <FormControl
                                    placeholder="Add comments"
                                    id="wd-comments"
                                    type="text"
                                    onChange={(e) => setReview({ ...review, notes: e.target.value })}
                                />
                            </Col>
                        </FormGroup>

                        <Button onClick={addReview} id="wd-add-review-btn" className="w-100 btn btn-danger"> Add Review </Button>
                    </div>
                }
            </div>
        </div>
    );
}