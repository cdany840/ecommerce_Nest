import { IsString } from "class-validator";

export class CreateProfileDto {

    //@IsString()
    readonly name: string;
    
    //@IsString()
    readonly last_name: string;
    
    //@IsString()
    readonly phone: string;
    
    //@IsString()
    readonly avatar: string;


}
