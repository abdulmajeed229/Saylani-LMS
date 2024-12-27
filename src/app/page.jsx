import Image from "next/image";
import Header from "./components/header";
import { ArrowRight } from 'lucide-react';
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
     
      <main className="container mx-auto px-4 py-16">

        <div className="flex flex-col items-center justify-center space-y-12">
          <div className="animate-fade-in-up">
            <Image
              src="/logo.png"
              alt="SMIT Logo"
              width={300}
              height={150}
              className="mb-8"
            />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-800 animate-fade-in-up animation-delay-200">
            Welcome to Saylani Mass IT Training (SMIT)
          </h1>
          <p className="text-xl text-center text-gray-600 max-w-2xl animate-fade-in-up animation-delay-400">
            Empowering individuals with cutting-edge IT skills to shape the future of technology.
          </p>
          <div className="flex space-x-4 animate-fade-in-up animation-delay-600">

            <Link href={'/courses'}>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out flex items-center">
              Explore Courses
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
            </Link>

            <Link href={'/about'}>
            <button className="bg-white hover:bg-gray-100 text-blue-600 font-bold py-2 px-4 rounded-lg border border-blue-600 transition duration-300 ease-in-out">
              About Us
            </button>
            </Link>
          </div>
        </div>
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </main>
    </div>
  );
}

const features = [
  {
    title: "Comprehensive Curriculum",
    description: "Our courses cover a wide range of IT disciplines, from web development to artificial intelligence.",
    icon: "📚",
  },
  {
    title: "Expert Instructors",
    description: "Learn from industry professionals with years of experience in their respective fields.",
    icon: "👨‍🏫",
  },
  {
    title: "Hands-on Projects",
    description: "Apply your skills to real-world projects and build an impressive portfolio.",
    icon: "💻",
  },
];

function FeatureCard({ title, description, icon }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 animate-fade-in-up">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
