"use client";

import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/app/lib/firebase';

export default function Students() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'students'));
                const studentsData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setStudents(studentsData);
            } catch (error) {
                console.error('Error fetching students:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStudents();
    }, []);

    if (loading) {
        return <h1 className="text-center text-lg font-semibold mt-4">Loading...</h1>;
    }

    return (

        <div className="p-6">

            <h1 className="text-2xl font-bold text-center mb-6">Students</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-300 shadow-lg">
                    <thead>
                        <tr className="bg-blue-500 text-white">

                            <th className="px-6 py-3 border border-gray-300 text-left">Name</th>
                            <th className="px-6 py-3 border border-gray-300 text-left">Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        
                        students.map((student) => (
                            <tr key={student.id} className="odd:bg-white even:bg-gray-100 hover:bg-gray-200">

                                <td className="px-6 py-3 border border-gray-300">{student.name}</td>
                                <td className="px-6 py-3 border border-gray-300">{student.email}</td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
