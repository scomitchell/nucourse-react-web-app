import * as client from "../Reviews/client";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
export default function SocialProfile({ profile, setProfile }:
    { profile: any, setProfile: (profile: any) => void }) {
    const [reviews, setReviews] = useState<any>([]);

    const fetchReviews = async () => {
        const reviews = await client.findReviewsForUser(profile.username);
        setReviews(reviews);
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

    useEffect(() => {
        fetchReviews();
    }, []);

    return (
        <div id="wd-social-profile">
            <h1>{profile.username}</h1>
            <h2>Reviews</h2>
            <hr />
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
    );
}