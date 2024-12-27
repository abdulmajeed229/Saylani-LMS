"use client";
import { useEffect, useState } from "react";
import { getFirestore, collection, getDocs, doc } from "firebase/firestore";
import { db } from "@/app/lib/firebase"; // Ensure the correct path to your firebase config

// Define the types for student and course data
interface Student {
  name: string;
  email: string;
  courseId: string; // Assuming each student has a courseId linking them to a course
}

interface Course {
  id: string;
  name: string;
}

export default function Enrolled() {
  const [students, setStudents] = useState<Student[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch all courses (assuming courses are stored in the "courses" collection)
        const coursesSnapshot = await getDocs(collection(db, "courses"));
        const courseList: Course[] = [];
        coursesSnapshot.forEach((doc) => {
          const courseData = doc.data();
          courseList.push({ id: doc.id, name: courseData.name }); // Storing the course ID to match with students
        });
        setCourses(courseList);

        // Fetch enrolled students (assuming student data is stored under "enrolled" collection for each course)
        const enrolledStudentsSnapshot = await getDocs(collection(db, "enrolled"));
        const studentList: Student[] = [];
        enrolledStudentsSnapshot.forEach((doc) => {
          const studentData = doc.data();
          studentList.push({
            name: studentData.name,
            email: studentData.email,
            courseId: studentData.courseId, // Assuming courseId is stored for each student
          });
        });
        setStudents(studentList);

      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Map courseId to course name
  const getCourseName = (courseId: string) => {
    const course = courses.find(course => course.id === courseId);
    return course ? course.name : "Unknown Course";
  };

  return (
    <div className="container mx-auto p-6">
      {loading ? (
        <div className="text-center py-6">
          <span className="text-xl font-semibold">Loading...</span>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-bold mb-6">Enrolled Students</h2>
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b text-left text-sm font-semibold">Student Name</th>
                <th className="px-6 py-3 border-b text-left text-sm font-semibold">Email</th>
                <th className="px-6 py-3 border-b text-left text-sm font-semibold">Course Name</th>
              </tr>
            </thead>
            <tbody>
              {students.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-center py-4">
                    No enrolled students found.
                  </td>
                </tr>
              ) : (
                students.map((student, index) => (
                  <tr key={index} className="border-t">
                    <td className="px-6 py-3">{student.name}</td>
                    <td className="px-6 py-3">{student.email}</td>
                    <td className="px-6 py-3">{getCourseName(student.courseId)}</td> {/* Map the courseId to course name */}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
