import { IsString } from "class-validator";
import { Address } from "src/address/entities/address.entity";

export class CreateProfileDto {

    //@IsString()
    readonly name: string;
    
    //@IsString()
    readonly last_name: string;
    
    //@IsString()
    readonly phone: string;
    
    //@IsString()
    readonly avatar: string;

    readonly address: Address[];

}
