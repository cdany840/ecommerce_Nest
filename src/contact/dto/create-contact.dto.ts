import { IsEmail } from 'class-validator';

export class CreateContactDto {
    
    first_name: string;

    last_name: string;
    
    @IsEmail()
    to: string;
    
    company: string;
    
    phone_number: string;
    
    text: string;
}
