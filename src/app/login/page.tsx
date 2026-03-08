"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/lib/auth";
import { motion } from "framer-motion";

export default function LoginPage() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const router = useRouter();

    const handleLogin = async () => {
        try {
            const res = loginUser(email, password);

            localStorage.setItem("token", res.token);
            router.push("/dashboard");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <motion.div
            className="flex items-center justify-center h-screen bg-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <motion.div
                className="bg-white p-8 rounded-xl shadow-lg w-80"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
            >
                <h1 className="text-2xl font-bold mb-6 text-center">
                    Login
                </h1>

                <div className="flex flex-col gap-4">

                    <motion.input
                        whileFocus={{ scale: 1.02 }}
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border p-2 rounded outline-none focus:border-blue-500"
                    />

                    <motion.input
                        whileFocus={{ scale: 1.02 }}
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border p-2 rounded outline-none focus:border-blue-500"
                    />

                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={handleLogin}
                        className="bg-black text-white py-2 rounded mt-2"
                    >
                        Login
                    </motion.button>

                </div>
            </motion.div>
        </motion.div>
    );
}