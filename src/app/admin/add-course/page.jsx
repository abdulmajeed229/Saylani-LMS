"use client";

import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/app/lib/firebase";

function AddCourse() {
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    try {
      setError(null);
      setSuccess(false);

     
      if (!title || !duration || !image || !description) {
        setError("All fields are required.");
        return;
      }

    
      await addDoc(collection(db, "courses"), {
        title,
        duration,
        image,
        description,
      });

      
      setSuccess(true);
      setTitle("");
      setDuration("");
      setImage("");
      setDescription("");
    } catch (e) {
      setError("Failed to add the course. Please try again.");
      setSuccess(false);
      console.error("Error adding document: ", e);
    }
  };

  return (
    <div className="h-[100vh] w-full flex justify-center items-center p-4">
      <form
        className="space-y-4 font-[sans-serif] max-w-md mx-auto"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <h1 className="font-extrabold text-center text-2xl">Add Course</h1>

        
        <input
          type="text"
          placeholder="Enter Course Name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="px-4 py-3 bg-gray-100 w-full text-sm outline-none border-b-2 border-blue-500 rounded"
        />

      
        <input
          type="text"
          placeholder="Enter Duration in Weeks"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="px-4 py-3 bg-gray-100 w-full text-sm outline-none border-b-2 border-blue-500 rounded"
        />

       
        <input
          type="text"
          placeholder="Enter Image Link"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="px-4 py-3 bg-gray-100 w-full text-sm outline-none border-b-2 border-blue-500 rounded"
        />

        
        <textarea
          placeholder="Enter Course Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="px-4 py-3 bg-gray-100 w-full text-sm outline-none border-b-2 border-blue-500 rounded"
        />

       
        <button
          type="submit"
          className="!mt-8 w-full px-4 py-2.5 mx-auto block text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Submit
        </button>

       
        {success && (
          <p className="text-green-500 text-sm text-center mt-4">
            Course added successfully!
          </p>
        )}
        {error && (
          <p className="text-red-500 text-sm text-center mt-4">{error}</p>
        )}
      </form>
    </div>
  );
}

export default AddCourse;
