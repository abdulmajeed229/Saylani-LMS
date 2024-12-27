"use client";

import { doc, getDoc, DocumentData, addDoc, collection } from "firebase/firestore";
import { db } from "@/app/lib/firebase";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

interface CourseProps {
  params: { id: string };
}

interface Course {
  id: string;
  title?: string;
  image?: string;
  duration?: string;
  description?: string;
}

interface Student {
  name: string;
  email: string;
  age: number;
  dob: string;
  gender: string;
  education: string;
}

export default function CourseDetails({ params }: CourseProps) {
  const { id } = params;
  const [course, setCourse] = useState<Course | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formStatus, setFormStatus] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<Student>();

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const docRef = doc(db, "courses", id);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          console.log("Course not found");
        } else {
          const courseData = docSnap.data() as DocumentData;
          setCourse({
            id,
            title: courseData.title || "Untitled Course",
            image: courseData.image || "/placeholder.svg?height=400&width=600",
            duration: courseData.duration || "N/A",
            description: courseData.description || "No description available.",
          });
        }
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };

    fetchCourseData();
  }, [id]);

  const handleEnroll = () => {
    setShowForm(true);
  };

  const onSubmit = async (data: Student) => {
    setIsLoading(true);
    try {
      const courseRef = doc(db, "courses", id); 
      const enrolledCollection = collection(courseRef, "enrolled"); 

      console.log("Submitting student data:", data); 

     
      await addDoc(enrolledCollection, data); 

      setFormStatus("Enrollment Successful!");
      setShowForm(false);
      reset(); 
    } catch (error) {
      console.error("Error enrolling student:", error);
      setFormStatus("Error enrolling. Please try again later.");
    } finally {
      setIsLoading(false); 
    }
  };

  if (!course) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-64 object-cover object-center"
        />
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{course.title}</h1>
          <p className="text-lg text-gray-600 mb-4">
            <span className="font-semibold">Duration:</span> {course.duration}
          </p>
          <p className="text-gray-700 mb-6">{course.description}</p>
          <button
            className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold 
                       hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
            onClick={handleEnroll}
          >
            Enroll Now
          </button>
        </div>
      </div>

      {showForm && (
        <div className="mt-8 bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Enrollment Form</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                {...register("name", { required: "Name is required" })}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                {...register("email", { 
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
            </div>
            <div>
              <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                Age
              </label>
              <input
                type="number"
                id="age"
                {...register("age", { 
                  required: "Age is required",
                  min: { value: 18, message: "Must be at least 18 years old" },
                  max: { value: 100, message: "Must be 100 years old or younger" }
                })}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.age && <p className="mt-1 text-sm text-red-600">{errors.age.message}</p>}
            </div>
            <div>
              <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-1">
                Date of Birth
              </label>
              <input
                type="date"
                id="dob"
                {...register("dob", { required: "Date of Birth is required" })}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.dob && <p className="mt-1 text-sm text-red-600">{errors.dob.message}</p>}
            </div>
            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                Gender
              </label>
              <select
                id="gender"
                {...register("gender", { required: "Gender is required" })}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && <p className="mt-1 text-sm text-red-600">{errors.gender.message}</p>}
            </div>
            <div>
              <label htmlFor="education" className="block text-sm font-medium text-gray-700 mb-1">
                Education
              </label>
              <input
                type="text"
                id="education"
                {...register("education", { required: "Education is required" })}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
              {
              errors.education && <p className="mt-1 text-sm text-red-600">{errors.education.message}</p>}
            </div>
            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full px-6 py-3 bg-green-600 text-white rounded-lg font-semibold 
                           hover:bg-green-700 transition duration-300 ease-in-out transform hover:scale-105
                           ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isLoading ? 'Submitting...' : 'Submit Enrollment'}
              </button>

            </div>

          </form>

          {
          formStatus && (
            <div className={`mt-4 p-4 rounded-md ${formStatus.includes('Successful') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {formStatus}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
