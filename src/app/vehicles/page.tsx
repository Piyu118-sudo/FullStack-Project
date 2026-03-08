"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import Image from "next/image";
import { motion } from "framer-motion";

type Vehicle = {
    id: number;
    title: string;
    brand: string;
    price: number;
    image: string;
    description: string;
};

export default function VehiclePage() {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [search, setSearch] = useState("");
    const [brand, setBrand] = useState("");
    const [minPrice, setMinPrice] = useState("");

    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);

    const fetchVehicles = async (currentPage: number) => {
        const res =  axios.get(
            `http://localhost:4000/vehicles?page=${currentPage}&limit=9`
        );

        setVehicles(res.data.data);
        setLastPage(res.data.lastPage);
        fetchVehicles(page);
    };

    useEffect(() => {
        
    }, [page]);

    const searchCars = async () => {
        const res = await axios.get(
            `http://localhost:4000/vehicles/search?q=${search}`
        );

        setVehicles(res.data);
    };

    const applyFilters = async () => {
        const res = await axios.get(
            `http://localhost:4000/vehicles?brand=${brand}&minPrice=${minPrice}`
        );

        setVehicles(res.data.data ?? res.data);
    };

    return (
        <motion.div
            className="p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            
            <div className="flex gap-3 mb-4">
                <input
                    placeholder="Search cars..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border p-2 rounded"
                />

                <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={searchCars}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Search
                </motion.button>

                <Link href="/vehicles/create">
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        className="bg-green-500 text-white px-4 py-2 rounded"
                    >
                        Sell Your Car
                    </motion.button>
                </Link>
            </div>

           
            <div className="flex gap-3 mb-6">
                <select
                    onChange={(e) => setBrand(e.target.value)}
                    className="border p-2 rounded"
                >
                    <option value="">All</option>
                    <option value="BMW">BMW</option>
                    <option value="Audi">Audi</option>
                </select>

                <input
                    type="number"
                    placeholder="Min Price"
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="border p-2 rounded"
                />

                <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={applyFilters}
                    className="bg-black text-white px-4 py-2 rounded"
                >
                    Apply
                </motion.button>
            </div>

            
            <motion.div
                className="grid grid-cols-3 gap-6"
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: { opacity: 0 },
                    visible: {
                        opacity: 1,
                        transition: { staggerChildren: 0.1 },
                    },
                }}
            >
                {vehicles.map((v) => (
                    <Link key={v.id} href={`/vehicles/${v.id}`}>
                        <motion.div
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0 },
                            }}
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 200 }}
                            className="border rounded-xl overflow-hidden shadow hover:shadow-xl transition cursor-pointer"
                        >
                            <Image
                                src={v.image}
                                alt={v.title}
                                width={400}
                                height={250}
                                className="w-full h-48 object-cover"
                            />

                            <div className="p-4">
                                <h2 className="text-lg font-semibold">{v.title}</h2>

                                <p className="text-gray-500">{v.brand}</p>

                                <p className="text-xl font-bold text-blue-600 mt-2">
                                    ₹{v.price}
                                </p>

                                <motion.button
                                    whileTap={{ scale: 0.95 }}
                                    className="mt-3 w-full bg-black text-white py-2 rounded"
                                >
                                    View Details
                                </motion.button>
                            </div>
                        </motion.div>
                    </Link>
                ))}
            </motion.div>

            
            <div className="flex justify-center gap-4 mt-10">
                <motion.button
                    whileTap={{ scale: 0.9 }}
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                    className="px-4 py-2 bg-gray-200 rounded"
                >
                    Prev
                </motion.button>

                <span className="px-4 py-2">
                    Page {page} of {lastPage}
                </span>

                <motion.button
                    whileTap={{ scale: 0.9 }}
                    disabled={page === lastPage}
                    onClick={() => setPage(page + 1)}
                    className="px-4 py-2 bg-gray-200 rounded"
                >
                    Next
                </motion.button>
            </div>
        </motion.div>
    );
}