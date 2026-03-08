import { PrismaService } from './../prisma/prisma.service';
import {
    Injectable,
    NotFoundException,
    ForbiddenException,
} from '@nestjs/common';
import { CreateVehicleDto } from 'src/dto/auth.dto';

@Injectable()
export class VehiclesService {
    constructor(private prisma: PrismaService) { }

    async create(dto: CreateVehicleDto, userId: string) {
        return this.prisma.vehicle.create({
            data: {
                ...dto,
                userId,
            },
        });
    }

    async findAll(query: any) {
        const {
            page = 1,
            limit = 5,
            brand,
            minPrice,
            maxPrice,
            search,
            sort,
        } = query;

        const skip = (Number(page) - 1) * Number(limit);

        const where: any = {};

        if (brand) {
            where.brand = {
                contains: brand,
                mode: 'insensitive',
            };
        }

        if (minPrice || maxPrice) {
            where.price = {
                ...(minPrice && { gte: Number(minPrice) }),
                ...(maxPrice && { lte: Number(maxPrice) }),
            };
        }

        if (search) {
            where.OR = [
                { title: { contains: search, mode: 'insensitive' } },
                { brand: { contains: search, mode: 'insensitive' } },
            ];
        }

        const orderBy: any = {};

        if (sort === 'price_asc') orderBy.price = 'asc';
        if (sort === 'price_desc') orderBy.price = 'desc';
        if (sort === 'newest') orderBy.createdAt = 'desc';

        const [data, total] = await Promise.all([
            this.prisma.vehicle.findMany({
                where,
                skip,
                take: Number(limit),
                orderBy,
            }),
            this.prisma.vehicle.count({ where }),
        ]);

        return {
            data,
            total,
            page: Number(page),
            lastPage: Math.ceil(total / Number(limit)),
        };
    }

    async findMyVehicles(userId: string) {
        return this.prisma.vehicle.findMany({
            where: { userId },
        });
    }

    async findOne(id: string) {
        const vehicle = await this.prisma.vehicle.findUnique({
            where: { id },
            include: { user: true },
        });

        if (!vehicle) {
            throw new NotFoundException('Vehicle not found');
        }

        return vehicle;
    }

    async update(id: string, dto: CreateVehicleDto, userId: string) {
        const vehicle = await this.prisma.vehicle.findUnique({
            where: { id },
        });

        if (!vehicle) {
            throw new NotFoundException('Vehicle not found');
        }

        if (vehicle.userId !== userId) {
            throw new ForbiddenException('Not allowed');
        }

        return this.prisma.vehicle.update({
            where: { id },
            data: dto,
        });
    }

    async remove(id: string, userId: string) {
        const vehicle = await this.prisma.vehicle.findUnique({
            where: { id },
        });

        if (!vehicle) {
            throw new NotFoundException('Vehicle not found');
        }

        if (vehicle.userId !== userId) {
            throw new ForbiddenException('Not allowed');
        }

        return this.prisma.vehicle.delete({
            where: { id },
        });
    }

    async search(query: string) {
        return this.prisma.vehicle.findMany({
            where: {
                OR: [
                    { title: { contains: query, mode: 'insensitive' } },
                    { brand: { contains: query, mode: 'insensitive' } },
                ],
            },
        });
    }
}