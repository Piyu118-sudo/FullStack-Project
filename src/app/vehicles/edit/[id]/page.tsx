"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/api";
import { motion } from "framer-motion";

type Vehicle = {
    id: number;
    title: string;
    brand: string;
    price: number;
    image: string;
    description: string;
};

export default function EditVehiclePage() {
    const { id } = useParams();
    const router = useRouter();

    const [vehicle, setVehicle] = useState<Vehicle | null>(null);

    useEffect(() => {
        api.get(`/vehicles/${id}`).then((res) => {
            setVehicle(res.data);
        });
    }, [id]);

    const handleUpdate = async () => {
        await api.patch(`/vehicles/${id}`, vehicle);
        alert("Vehicle updated 🚗");
        router.push("/vehicles");
    };

    if (!vehicle)
        return (
            <motion.p
                className="p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                Loading...
            </motion.p>
        );

    return (
        <motion.div
            className="flex justify-center items-center min-h-screen bg-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <motion.div
                className="bg-white p-8 rounded-xl shadow-lg w-105 space-y-4"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
            >
                <h1 className="text-2xl font-bold text-center">
                    Edit Vehicle
                </h1>

                <motion.input
                    whileFocus={{ scale: 1.02 }}
                    value={vehicle.title}
                    onChange={(e) =>
                        setVehicle({ ...vehicle, title: e.target.value })
                    }
                    className="border p-2 w-full rounded"
                />

                <motion.input
                    whileFocus={{ scale: 1.02 }}
                    value={vehicle.brand}
                    onChange={(e) =>
                        setVehicle({ ...vehicle, brand: e.target.value })
                    }
                    className="border p-2 w-full rounded"
                />

                <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="number"
                    value={vehicle.price}
                    onChange={(e) =>
                        setVehicle({ ...vehicle, price: Number(e.target.value) })
                    }
                    className="border p-2 w-full rounded"
                />

                <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={handleUpdate}
                    className="bg-black text-white px-4 py-2 rounded w-full"
                >
                    Update Vehicle
                </motion.button>
            </motion.div>
        </motion.div>
    );
}

