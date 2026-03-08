import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Body,
    Param,
    Query,
    UseGuards,
    Req,
} from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateVehicleDto } from '../dto/auth.dto';

@Controller('vehicles')
export class VehiclesController {
    constructor(private readonly vehiclesService: VehiclesService) { }

    
    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() dto: CreateVehicleDto, @Req() req) {
        return this.vehiclesService.create(dto, req.user.userId);
    }

    
    @Get()
    findAll(@Query() query) {
        return this.vehiclesService.findAll(query);
    }

    
    @UseGuards(JwtAuthGuard)
    @Get('me')
    findMy(@Req() req) {
        return this.vehiclesService.findMyVehicles(req.user.userId);
    }

    
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.vehiclesService.findOne(id);
    }

    
    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() dto: CreateVehicleDto,
        @Req() req,
    ) {
        return this.vehiclesService.update(id, dto, req.user.userId);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string, @Req() req) {
        return this.vehiclesService.remove(id, req.user.userId);
    }
}