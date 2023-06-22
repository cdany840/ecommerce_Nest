import { IsString } from 'class-validator';

export class UpdateProfileDto {

    @IsString()
    name: string;
    
    @IsString()
    last_name: string;
    
    @IsString()
    phone: string;
    
    @IsString()
    avatar: string;

}