"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { db, auth } from '@/app/lib/firebase';

const Profile = () => {

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {

    if (!auth.currentUser) {

      router.push('/login'); 

      return;

    }

    const fetchUserProfile = async () => {

      const userDocRef = doc(db, 'students', auth.currentUser.uid);

      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {

        setProfile(userDoc.data());

      } else {

        console.log('No such document!');

      }

      setLoading(false);

    };

    fetchUserProfile();

  }, [router]);

  if (loading) {

    return (


      <div className="flex justify-center items-center min-h-screen">

        <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>

      </div>
      
    );
  }

  if (!auth.currentUser) {

    return <div>Please login</div>;

  }

  return (

    <div className="p-4">

      {profile ? (

        <div className="text-center flex justify-center items-center flex-col h-[80vh]">
          <img
            src={profile.profileImage || '/default-profile.png'}
            alt="Profile Picture"
            className="rounded-full w-36 h-36 mx-auto object-cover"
          />
          <h1 className="text-xl font-semibold">{profile.name}</h1>
          <p className="text-gray-600">Email: {profile.email}</p>
        </div>
      ) : (
        <div>Profile not found</div>
      )}
    </div>
  );
};

export default Profile;
