import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });
export const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
export const REVIEWS_API = `${REMOTE_SERVER}/api/reviews`;

export const findReviewsForUser = async (userId: String) => {
    const response = await axiosWithCredentials.get(`${REVIEWS_API}/user/${userId}`);
    return response.data;
}

export const findReviewsForCourse = async (courseNum: String) => {
    const response = await axiosWithCredentials.get(`${REVIEWS_API}/course/${courseNum}`);
    return response.data;
}

export const createReview = async (review: any) => {
    const response = await axiosWithCredentials.post(`${REVIEWS_API}`, review);
    return response.data;
}

export const updateReview = async (review: any) => {
    const response = await axiosWithCredentials.put(`${REVIEWS_API}/${review._id}`, review);
    return response.data;
}