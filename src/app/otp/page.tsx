"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import { motion } from "framer-motion";

export default function OTPPage() {
    const searchParams = useSearchParams();
    const email = searchParams.get("email");

    const router = useRouter();

    const [otp, setOtp] = useState("");

    const verifyOtp = async () => {
        try {
            await axios.post("http://localhost:4000/auth/verify-otp", {
                email,
                otp,
            });

            alert("Email verified ✅");

            router.push("/login");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <motion.div
            className="flex justify-center items-center min-h-screen bg-gray-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <motion.div
                className="bg-white p-8 rounded-xl shadow-lg w-105 space-y-4"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
            >
                <h1 className="text-xl font-bold text-center">
                    Verify OTP
                </h1>

                <input
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="border p-2 w-full rounded"
                />

                <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={verifyOtp}
                    className="bg-black text-white py-2 rounded w-full"
                >
                    Verify
                </motion.button>
            </motion.div>
        </motion.div>
    );
}