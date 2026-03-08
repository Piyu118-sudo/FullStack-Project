"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

type Vehicle = {
    id: string;
    title: string;
    brand: string;
    price: number;
};

export default function Dashboard() {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);

    const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;

    useEffect(() => {
        axios
            .get("http://localhost:4000/vehicles/me", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => setVehicles(res.data));
    }, [token]);

    const deleteVehicle = async (id: string) => {
        await axios.delete(`http://localhost:4000/vehicles/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        setVehicles(vehicles.filter((v) => v.id !== id));
    };

    return (
        <motion.div
            className="p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <h1 className="text-2xl font-bold mb-6">
                My Listed Cars
            </h1>

            <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: { opacity: 0 },
                    visible: {
                        opacity: 1,
                        transition: { staggerChildren: 0.15 },
                    },
                }}
            >
                {vehicles.map((v) => (
                    <motion.div
                        key={v.id}
                        variants={{
                            hidden: { opacity: 0, y: 15 },
                            visible: { opacity: 1, y: 0 },
                        }}
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 200 }}
                        className="border p-4 mb-4 rounded flex justify-between shadow hover:shadow-lg"
                    >
                        <div>
                            <h2 className="font-semibold text-lg">{v.title}</h2>
                            <p className="text-gray-500">{v.brand}</p>
                            <p className="font-bold text-blue-600">₹{v.price}</p>
                        </div>

                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => deleteVehicle(v.id)}
                            className="bg-red-500 text-white px-4 py-2 rounded"
                        >
                            Delete
                        </motion.button>
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    );
}