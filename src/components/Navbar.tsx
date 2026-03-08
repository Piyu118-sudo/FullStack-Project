"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);
    }, []);

    const logout = () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
    };

    // Prevent SSR mismatch
    if (isLoggedIn === null) return null;

    return (
        <nav className="flex items-center justify-between p-4 bg-gray-900 text-white">
            <Link href="/">Home</Link>

            <div className="flex gap-4">
                <Link href="/vehicles">Vehicles</Link>

                {isLoggedIn ? (
                    <button
                        onClick={logout}
                        className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                        Logout
                    </button>
                ) : (
                    <Link
                        href="/login"
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Login
                    </Link>
                )}
            </div>
        </nav>
    );
}