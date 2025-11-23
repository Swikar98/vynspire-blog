"use client";

import Link from "next/link";

export default function Notfound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
            <p className="text-2xl mb-8">Page Not Found</p>
            <Link href="/" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Go to Home
            </Link>
        </div>
    )
}