import api from "./api";
import { CreateVehicleDto } from "@/types/vehicle";

export const getVehicles = async () => {
    const res = await api.get("/vehicles");
    return res.data;
};

export const createVehicle = async (
    data: CreateVehicleDto,
    
) => {
    const res = await api.post("/vehicles", data, {
        
    });

    return res.data;
};