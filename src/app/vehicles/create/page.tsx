"use client";

import { useState } from "react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function CreateVehiclePage() {
    const router = useRouter();

    const [title, setTitle] = useState("");
    const [brand, setBrand] = useState("");
    const [price, setPrice] = useState<number>(0);
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");

    const handleCreate = async () => {
        try {
            await api.post("/vehicles", {
                title,
                brand,
                price,
                image,
                description,
            });

            alert("Vehicle listed successfully 🚗");

            router.push("/vehicles");
        } catch (error) {
            console.error(error);
        }
    };

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
                    Sell Your Car
                </h1>

                <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="text"
                    placeholder="Car Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border p-2 w-full rounded"
                />

                <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="text"
                    placeholder="Brand"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="border p-2 w-full rounded"
                />

                <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="border p-2 w-full rounded"
                />

                <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="text"
                    placeholder="Image URL"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    className="border p-2 w-full rounded"
                />

                <motion.textarea
                    whileFocus={{ scale: 1.02 }}
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="border p-2 w-full rounded"
                />

                <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCreate}
                    className="bg-black text-white px-4 py-2 rounded w-full"
                >
                    List Car
                </motion.button>
            </motion.div>
        </motion.div>
    );
}