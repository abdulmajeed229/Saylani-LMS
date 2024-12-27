"use client";
import { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import Link from "next/link";

interface Course {
  id: string;
  title?: string;
  image?: string;
  duration?: string;
}

export default function CourseCards() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const coursesCollection = collection(db, "courses");
        const courseSnapshot = await getDocs(coursesCollection);
        const courseList = courseSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Course[];
        setCourses(courseList);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="flex flex-wrap gap-4">
      {courses.map((course) => (
        <div
          key={course.id}
          className="h-[350px] w-[250px] rounded-xl border border-blue-300 shadow-md p-3"
        >
          <img
            src={course.image || "/img.jpg"}
            alt={course.title || "Course Image"}
            className="rounded h-[150px] w-full object-cover"
          />
          <h1 className="font-bold mt-5 text-[17px]">{course.title}</h1>
          <span className="mt-5 text-[12px]">
            <strong>Duration :</strong> <strong>{course.duration || "N/A"}</strong>
          </span>
          <br />
          {user ? (
            <Link href={`/${course.id}`}>
              <button className="mt-5 px-4 py-2 text-sm rounded-full font-bold text-white border-2 border-[#007bff] bg-[#007bff] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#007bff]">
                Apply Now
              </button>
            </Link>
          ) : (
            <button
              className="mt-5 px-4 py-2 text-sm rounded-full font-bold text-white border-2 border-gray-400 bg-gray-400 cursor-not-allowed"
              disabled
            >
              Apply Now
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
