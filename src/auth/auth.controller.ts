import {
    Controller,
    Post,
    Body,
    Get,
    UseGuards,
    Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthDto } from 'src/dto/auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    async register(@Body() dto:AuthDto) {
        return this.authService.register(dto.email, dto.password);
    }

    @Post('login')
    async login(@Body() body: any) {
        return this.authService.login(body.email, body.password);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('profile')
    getProfile(@Request() req: any) {
        return req.user;
    }
}