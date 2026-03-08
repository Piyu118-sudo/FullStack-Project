"use client";

import { useState } from 'react';
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import axios from "axios";

export default function RegisterPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async () => {
        try {
            await axios.post("http://localhost:4000/auth/register", {

                email,
                password,
            });
            alert("Account created!");
            router.push("/otp?email=" + email);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <motion.div className="flex justify-center items-center min-h-screen bg-green-100
         " initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <motion.div className='bg-white p-6 rounded-xl shadow-lg-w-105 space-y-4'
                initial={{ scale: 0.9 }}
                animate={{scale:0.1}}
            >
                <h1 className="font-xl  font-bold text-center">
                    Create Account
                </h1>
                <motion.input whileFocus={{ scale: 1.02 }} placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} className="border p-2 w-full rounded" />
                <motion.input whileFocus={{scale:1.02}}  placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                <motion.button whileTap={{ scale: 0.95 }} onClick={handleRegister} className="bg-green-400 text-white p-2 rounded w-full">
                    Register

                </motion.button>

            </motion.div>


        </motion.div>
    )
}