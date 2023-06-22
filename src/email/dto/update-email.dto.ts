import { PartialType } from '@nestjs/mapped-types';
import { CreateEmailDto } from '../../contact/dto/create-email.dto';

export class UpdateEmailDto extends PartialType(CreateEmailDto) {}
