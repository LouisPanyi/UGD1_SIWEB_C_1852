'use client';
import { FaceFrownIcon } from '@heroicons/react/24/outline';

export default function Error() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="bg-white p-6 rounded-md shadow-md">
                <FaceFrownIcon className="w-10 text-gray-400" />
                <h2 className="text-2xl font-semibold mb-4">404 Page Not Found</h2>
                <p className="text-gray-600 mb-6">Sorry, the page you are looking for could not be found.</p>
                <a href="/" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
                    Go Back to Home
                </a>
            </div>
        </div>
    );
}