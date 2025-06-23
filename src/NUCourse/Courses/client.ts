import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });
export const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
export const COURSES_API = `${REMOTE_SERVER}/api/courses`;

export const findCoursesByTitle = async (title: String) => {
    const response = await axios.get(`${COURSES_API}/?title=${title}`);
    return response.data;
}

export const findAllCourses = async () => {
    const response = await axios.get(`${COURSES_API}`);
    return response.data;
}

export const createCourse = async (course: any) => {
    const response = await axios.post(`${COURSES_API}`, course);
    return response.data;
}

export const findCourseByNumber = async (courseNum: String) => {
    const response = await axiosWithCredentials.get(`${COURSES_API}/${courseNum}`);
    return response.data;
}

export const updateCourse = async (course: any) => {
    const response = await axiosWithCredentials.put(`${COURSES_API}/${course.number}`, course);
    return response.data;
}

export const deleteCourse = async (courseId: String) => {
    const response = await axiosWithCredentials.delete(`${COURSES_API}/${courseId}`);
    return response.data;
}