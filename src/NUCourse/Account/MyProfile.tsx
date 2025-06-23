import { Row, Col, Card, FormLabel, FormGroup, FormControl, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import { useSelector } from "react-redux";
import * as client from "./client";
import * as reviewClient from "../Reviews/client"

export default function MyProfile({ profile, setProfile }:
    { profile: any, setProfile: (profile: any) => void }) {
    const dispatch = useDispatch();
    const [reviews, setReviews] = useState<any>([]);
    const [review, setReview] = useState<any>({});
    const [editing, setEditing] = useState(false);
    const { currentUser } = useSelector((state: any) => state.accountReducer);

    const updateProfile = async () => {
        const updatedProfile = await client.updateUser(profile);
        dispatch(setCurrentUser(updatedProfile));
        console.log(currentUser);
    };

    const updateReview = async () => {
        await reviewClient.updateReview(review);
        setEditing(false);
        await fetchReviews();
    }

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

    const fetchReviews = async () => {
        const reviews = await reviewClient.findReviewsForUser(profile.username);
        setReviews(reviews);
    }

    useEffect(() => {
        fetchReviews();
    }, [profile])

    return (
        <div id="wd-my-profile" className="d-flex row">
            <div id="wd-my-profile-details" className="col-sm-8 col-md-4">
                <h1>{profile.username}</h1>
                <FormGroup as={Row} className="mb-3 align-items-center">
                    <FormLabel column sm={4}>First name</FormLabel>
                    <Col sm={8}>
                        <FormControl
                            placeholder="first name"
                            id="wd-first-name"
                            defaultValue={profile.firstName}
                            onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                        />
                    </Col>
                </FormGroup>

                <FormGroup as={Row} className="mb-3 align-items-center">
                    <FormLabel column sm={4}>Last name</FormLabel>
                    <Col sm={8}>
                        <FormControl
                            placeholder="last name"
                            id="wd-last-name"
                            defaultValue={profile.lastName}
                            onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                        />
                    </Col>
                </FormGroup>

                <FormGroup as={Row} className="mb-3 align-items-center">
                    <FormLabel column sm={4}>Username</FormLabel>
                    <Col sm={8}>
                        <FormControl
                            placeholder="username"
                            id="wd-username"
                            defaultValue={profile.username}
                            onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                        />
                    </Col>
                </FormGroup>

                <FormGroup as={Row} className="mb-3 align-items-center">
                    <FormLabel column sm={4}>Password</FormLabel>
                    <Col sm={8}>
                        <FormControl
                            placeholder="password"
                            id="wd-password"
                            type="password"
                            defaultValue={profile.password}
                            onChange={(e) => setProfile({ ...profile, password: e.target.value })}
                        />
                    </Col>
                </FormGroup>

                <FormGroup as={Row} className="mb-3 align-items-center">
                    <FormLabel column sm={4}>Password</FormLabel>
                    <Col sm={8}>
                        <select onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                            className="form-control mb-2" id="wd-role" value={profile.role}>
                            <option value="USER">User</option>
                            <option value="FACULTY">School Faculty</option>
                        </select>
                    </Col>
                </FormGroup>

                <Button onClick={updateProfile} id="wd-update-profile-btn" className="btn btn-danger w-100">
                    Update Profile
                </Button>

                <hr />
            </div>

            <div id="wd-my-reviews" className="ps-3 col-sm-8 col-md-8">
                <h2>Reviews</h2>
                {reviews.length === 0 ?
                    <span>No Reviews Posted</span>
                :
                reviews.map((review: any) =>
                    <div id="wd-reviews">
                        <Card className="mb-2 text-start user-review-card">
                            <Card.Body className="card-body">
                                <Card.Title className="wd-card-title">{review.course}</Card.Title>
                            </Card.Body>
                            <Card.Text className="wd-card-text p-2">
                                {!editing ?
                                    <>
                                        <div>
                                            <strong>Overall Rating:</strong> {review.ovr_rating} {" "}
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
                                        <Button onClick={() => setEditing(true)} className="mb-2 btn btn-danger">
                                            Edit
                                        </Button>
                                    </>
                                    :
                                    <>
                                        <div style={{ minWidth: "300px" }}>
                                            <FormGroup as={Row} className="mb-3 align-items-center">
                                                <FormLabel column sm={4}>Overall rating (1 to 5)</FormLabel>
                                                <Col sm={8}>
                                                    <FormControl
                                                        placeholder="Overall rating"
                                                        id="wd-ovr-rating"
                                                        type="number"
                                                        defaultValue={review.ovr_rating}
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
                                                        defaultValue={review.difficulty}
                                                        onChange={(e) => setReview({ ...review, difficulty: parseFloat(e.target.value) })}
                                                    />
                                                </Col>
                                            </FormGroup>

                                            <FormGroup as={Row} className="mb-3 align-items-center">
                                                <FormLabel column sm={4}>Educational Value (1 to 5)</FormLabel>
                                                <Col sm={8}>
                                                    <FormControl
                                                        placeholder="educational value"
                                                        id="wd-education"
                                                        type="number"
                                                        defaultValue={review.learning_score}
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
                                                        value={review.notes}
                                                        type="text"
                                                        onChange={(e) => setReview({ ...review, notes: e.target.value })}
                                                    />
                                                </Col>
                                            </FormGroup>

                                            <Button onClick={updateReview} id="wd-add-review-btn" className="w-100 btn btn-danger">
                                                Update Review
                                            </Button>
                                        </div>
                                    </>
                                }
                                
                            </Card.Text>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    );
}