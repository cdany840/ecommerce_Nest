import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/profile/entities/user.schema';

export type AddressDocument = HydratedDocument<Address>;

@Schema()
export class Address {
    _id?: string;

    @Prop({ required: true })
    street: string;

    @Prop({ required: true })
    no_ext: string;

    @Prop({ default: " " })
    no_int: string;

    @Prop({ required: true })
    zip: string;

    @Prop({ required: true })
    city: string;

    @Prop({ required: true })
    state: string;

    @Prop({ required: true })
    colony: string;

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
    user: User;
}

export const AddressSchema = SchemaFactory.createForClass(Address);