import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Address } from 'src/address/entities/address.entity';

@Schema()
export class User {

    _id?: string;

    @Prop({ unique: true, required: true })
    email: string;

    @Prop({ minlength: 6, required: true })
    password?: string;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true, default: " " })
    last_name: string;

    @Prop({ required: true, default: " " })
    phone: string;

    @Prop({ required: true, default: " " })
    avatar: string;    

    @Prop({ default: true })
    isActive: boolean;

    @Prop({ type: [String], default: ['user'] })
    roles: string[];

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Address' }] })
    address: Address[];

}

export const UserSchema = SchemaFactory.createForClass( User );

