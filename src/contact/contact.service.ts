import { Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Contact } from './entities/contact.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import * as nodemailer from 'nodemailer';
import { CreateEmailDto } from 'src/contact/dto/create-email.dto';

@Injectable()
export class ContactService {

  private transporter: nodemailer.Transporter

  constructor(
    @InjectModel( Contact.name ) 
    private contactModel: Model<Contact>,
  ) {
    this.transporter = nodemailer.createTransport({
      // Configuración del servidor de correo saliente (SMTP)
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true para SSL/TLS
      auth: {
        user: 'danymiranda840@gmail.com',
        pass: 'mwuftdmqgziwpezx',
      },
    });
  }

  create(createContactDto: CreateContactDto) {
    try {

      const contact = new this.contactModel(createContactDto);
      const newContact = contact.save();
      this.sendMail(createContactDto);
      return newContact;

    } catch (error) {

      return error;

    }
  }

  async sendMail(createContactDto: CreateContactDto) {
    const { to, text } = createContactDto;
    
    const mailOptions: nodemailer.SendMailOptions = {
      from: to,
      to: 'luism1p3@hotmail.com',
      subject: 'Compras',
      text,
    };

    await this.transporter.sendMail(mailOptions);

    return "Send Email";
  }

  async findAll() {
    
    try {

      const contact = await this.contactModel.find();
      return contact;

    } catch (err) {

      return err;

    }

  }

  findOne(id: number) {
    return `This action returns a #${id} contact`;
  }

  update(id: number, updateContactDto: UpdateContactDto) {
    return `This action updates a #${id} contact`;
  }

  async remove(_id: string) {
    const removeContact = await this.contactModel.deleteOne({_id});
    return "Deleted";
  }
}
