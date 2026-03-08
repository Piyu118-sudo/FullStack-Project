import {
    Injectable,
    UnauthorizedException,
    ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
    ) { }

    async register(email: string, password: string) {
        const existing = await this.prisma.user.findUnique({
            where: { email },
        });

        // ✅ Correct condition
        if (existing) {
            throw new ConflictException('User already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await this.prisma.user.create({
            data: {
                email,
                password: hashedPassword,
            },
        });

        return { message: 'User registered successfully' };
    }

    async login(email: string, password: string) {
        const user = await this.prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = {
            sub: user.id,
            email: user.email,
        };

        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}