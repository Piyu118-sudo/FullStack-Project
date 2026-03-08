export interface CreateVehicleDto {
    title: string;
    brand: string;
    price: number; 
    image?: string;
    description: string;
}
export interface Vehicle extends CreateVehicleDto {
    id: string;
    userId: string; 
    createdAt: string;
}