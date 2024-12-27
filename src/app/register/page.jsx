"use client";

import { useState } from "react";
import { auth, db } from "@/app/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    profileImage: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignUp = async () => {
    const { name, profileImage, email, password } = formData;

    if (!name || !profileImage || !email || !password) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "students", user.uid), {
        name,
        profileImage,
        email,
      });

      alert("User registered successfully!");
      setLoading(false);
      router.push("/");
    } catch (err) {
      setLoading(false);
      setError(err.message || "Something went wrong");
    }
  };

  return (
    <div className="bg-white flex items-center justify-center md:h-screen p-4">
      <div className="shadow-[0_2px_16px_-3px_rgba(6,81,237,0.3)] max-w-6xl max-md:max-w-lg rounded-md p-6">
        <div className="grid md:grid-cols-2 items-center gap-8">
          <div className="max-md:order-1 lg:min-w-[450px]">
            <img
              src="https://readymadeui.com/signin-image.webp"
              className="lg:w-11/12 w-full object-cover"
              alt="login-image"
            />
          </div>

          <form
            className="md:max-w-md w-full mx-auto"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="mb-12">
              <h3 className="text-4xl font-extrabold text-blue-600">Register</h3>
            </div>

            <div className="mt-8">
              <input
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full text-sm border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none"
                placeholder="Enter Name"
              />
            </div>

            <div className="mt-8">
              <input
                name="profileImage"
                type="text"
                value={formData.profileImage}
                onChange={handleChange}
                required
                className="w-full text-sm border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none"
                placeholder="Enter Profile Image Link"
              />
            </div>

            <div className="mt-8">
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full text-sm border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none"
                placeholder="Enter Email"
              />
            </div>

            <div className="mt-8">
              <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full text-sm border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none"
                placeholder="Enter Password"
              />
            </div>

            {error && <p className="text-red-500 text-sm mt-4">{error}</p>}

            <div className="mt-12">
              <button
                type="button"
                onClick={handleSignUp}
                disabled={loading}
                className={`w-full shadow-xl py-2.5 px-5 text-sm font-semibold rounded-md text-white ${
                  loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
                } focus:outline-none`}
              >
                {loading ? "Please Wait..." : "Sign Up"}
              </button>

              <p className="text-gray-800 text-sm text-center mt-6">
                Already have an account
                <Link href={"/login"}>
                  <span className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap">
                    Login here
                  </span>
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
