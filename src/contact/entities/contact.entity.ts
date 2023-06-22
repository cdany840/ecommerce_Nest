import { Prop, SchemaFactory } from "@nestjs/mongoose";

export class Contact {
    @Prop({ required: true })
    first_name: string;

    @Prop({ required: true })
    last_name: string;
    
    @Prop({ required: true })
    to: string;

    @Prop({ default: " " })
    company: string;

    @Prop({ required: true })
    phone_number: string;

    @Prop({ required: true })
    text: string;
}

export const ContactSchema = SchemaFactory.createForClass( Contact );