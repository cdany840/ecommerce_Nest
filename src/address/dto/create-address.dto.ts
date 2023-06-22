import { User } from "src/auth/entities/user.entity";

export class CreateAddressDto {
    _id?: string;

    street: string;

    no_ext: string;

    no_int: string;

    zip: string;

    city: string;

    state: string;

    colony: string;

    user: User;
}
