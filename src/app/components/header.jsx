"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { auth, db } from "@/app/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export default function Header() {
  const [user, setUser] = useState(null);
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {

      if (currentUser) {

        setUser({

          displayName: currentUser.displayName,

          uid: currentUser.uid,

        });

        const userDocRef = doc(db, "students", currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          setProfileImage(userData.profileImage || "/path/to/default-image.png"); 
        }
      } else {
        setUser(null);
        setProfileImage(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <header className="flex shadow-md py-4 px-4 sm:px-10 bg-white min-h-[70px] tracking-wide relative sticky top-0 z-50">
      <div className="flex flex-wrap items-center justify-between gap-5 w-full">
        <Link href={"/"}>
          <span className="max-sm:hidden">
            <img
              src="/logo.png"
              alt="logo"
              className="w-[100px]"
            />
          </span>
        </Link>

        <div
          id="collapseMenu"
          className="max-lg:hidden lg:!block max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-50 max-lg:before:inset-0 max-lg:before:z-50"
        >
          <button
            id="toggleClose"
            className="lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white w-9 h-9 flex items-center justify-center border"
          >
            <FaTimes className="text-black w-4 h-4" />
          </button>

          <ul className="lg:flex gap-x-5 max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50">
            {["Home", "Courses", "Quizzes", "About", "Contact"].map(
              (item, index) => (
                <Link
                  href={`/${item.toLowerCase()}`}
                  key={index}
                  className="max-lg:border-b border-gray-300 max-lg:py-3 px-3"
                >
                  <li>
                    <span
                      className={`hover:text-[#007bff] ${
                        item === "Home" ? "text-[#007bff]" : "text-gray-500"
                      } block font-semibold text-[15px]`}
                    >
                      {item}
                    </span>
                  </li>
                </Link>
              )
            )}
          </ul>
        </div>

        <div className="flex max-lg:ml-auto space-x-4">
          {user ? (
            <Link href={"/profile"}>
              <img
                src={profileImage || "/path/to/default-image.png"}
                alt="User Profile"
                className="w-10 h-10 rounded-full object-cover"
              />
            </Link>
          ) : (
            <Link href={"/login"}>
              <button className="px-4 py-2 text-sm rounded-full font-bold text-white border-2 border-[#007bff] bg-[#007bff] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#007bff]">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
