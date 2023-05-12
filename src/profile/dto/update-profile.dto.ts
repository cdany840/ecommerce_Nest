import { PartialType } from '@nestjs/mapped-types';
import { CreateProfileDto } from './create-profile.dto';
import { IsString } from 'class-validator';

export class UpdateProfileDto {

    @IsString()
    readonly name: string;
    
    @IsString()
    readonly last_name: string;
    
    @IsString()
    readonly phone: string;
    
    @IsString()
    readonly avatar: string;

}