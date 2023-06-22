import { Injectable } from '@nestjs/common';
import { CreateEmailDto } from '../contact/dto/create-email.dto';
import { UpdateEmailDto } from './dto/update-email.dto';

import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter

  constructor() {
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

  async sendMail(createEmailDto: CreateEmailDto) {
    const { to, subject, text } = createEmailDto;
    
    const mailOptions: nodemailer.SendMailOptions = {
      from: 'danymiranda840@gmail.com',
      to,
      subject,
      text,
    };

    await this.transporter.sendMail(mailOptions);

    return "Send Email";
  }

  findAll() {
    return `This action returns all email`;
  }

  findOne(id: number) {
    return `This action returns a #${id} email`;
  }

  update(id: number, updateEmailDto: UpdateEmailDto) {
    return `This action updates a #${id} email`;
  }

  remove(id: number) {
    return `This action removes a #${id} email`;
  }
}
