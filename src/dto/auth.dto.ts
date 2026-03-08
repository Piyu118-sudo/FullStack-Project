import { IsEmail, IsString, MinLength, IsNotEmpty, IsNumber, IsPositive, IsUrl } from 'class-validator';
import { Type } from 'class-transformer';

export class AuthDto {
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    password: string;

}
export class CreateVehicleDto {
    @IsString({ message: 'Title must be a string' })
    @IsNotEmpty({message: 'Title is required'})
    title: string;

    @Type(() => Number)
    @IsNumber() 
    @IsPositive()
    price: number;

    @IsString()
    @IsUrl()
    image: string;

          
}