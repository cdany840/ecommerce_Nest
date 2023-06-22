import { MinLength } from "class-validator";

export class UpdatePassDto {

    //@MinLength(6)
    newPassword: string;

    //@MinLength(6)
    confirmPassword: string;

    //@MinLength(6)
    oldPassword: string;
}