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
    const { currentUser } = useSelector((state: any) => state.accountReducer);

    const updateProfile = async () => {
        const updatedProfile = await client.updateUser(profile);
        dispatch(setCurrentUser(updatedProfile));
        console.log(currentUser);
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

    const fetchReviews = async () => {
        const reviews = await reviewClient.findReviewsForUser(profile.username);
        setReviews(reviews);
    }

    useEffect(() => {
        fetchReviews();
    }, [])

    return (
        <div id="wd-my-profile" className="d-flex">
            <div id="wd-my-profile-details">
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

                <Button onClick={updateProfile} id="wd-update-profile-btn" className="btn btn-danger w-100">
                    Update Profile
                </Button>
            </div>

            <div id="wd-my-reviews" className="ps-3">
                <h2>Reviews</h2>
                {reviews.map((review: any) =>
                    <div id="wd-reviews">
                        <Card className="mb-2 text-start user-review-card">
                            <Card.Body className="card-body">
                                <Card.Title className="wd-card-title">{review.course}</Card.Title>
                            </Card.Body>
                            <Card.Text className="wd-card-text p-2">
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
                            </Card.Text>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    );
}