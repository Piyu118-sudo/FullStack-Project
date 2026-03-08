"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import api from "@/lib/api";

type Vehicle = {
    title: string;
    brand: string;
    price: number;
    description: string;
};

export default function VehiclesDetails() {
    const params = useParams();
    const id = params.id as string;

    const [vehicle, setVehicle] = useState<Vehicle | null>(null);
    const router = useRouter();

    const handleDelete = async () => {
        await api.delete(`/vehicles/${id}`);

        alert("Vehicle deleted");

        router.push("/vehicles");
    };

    useEffect(() => {
        axios
            .get(`http://localhost:4000/vehicles/${id}`)
            .then((res) => setVehicle(res.data));
    }, [id]);

    if (!vehicle) {
        return (
            <motion.p
                className="p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                Loading...
            </motion.p>
        );
    }

    return (
        <motion.div
            className="flex justify-center items-center min-h-screen bg-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <motion.div
                className="bg-white p-8 rounded-xl shadow-lg w-105"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
            >
                <h1 className="text-2xl font-bold mb-2">
                    {vehicle.title}
                </h1>

                <p className="text-gray-500 mb-2">
                    Brand: {vehicle.brand}
                </p>

                <p className="text-xl font-bold text-blue-600 mb-4">
                    Price: ₹{vehicle.price}
                </p>

                <p className="text-gray-700 mb-6">
                    {vehicle.description}
                </p>

                <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={handleDelete}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                >
                    Delete
                </motion.button>
            </motion.div>
        </motion.div>
    );
}