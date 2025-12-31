// app/not-found.js
import Link from "next/link";
import { IoArrowBackOutline } from "react-icons/io5";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-200">404</h1>
          <h2 className="text-3xl font-semibold text-gray-100 mt-4 mb-2">
            Page Not Found
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved.
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center px-4 py-2 bg-gray-700 text-gray-100 font-semibold rounded-lg hover:bg-gray-600 transition-colors duration-300"
        >
          <IoArrowBackOutline className="w-5 h-5 mr-2" />
          Return Home
        </Link>
      </div>
    </div>
  );
}
