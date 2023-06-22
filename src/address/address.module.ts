import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Address, AddressSchema } from './entities/address.entity';
import { User, UserSchema } from 'src/profile/entities/user.schema';
import { ProfileModule } from 'src/profile/profile.module';

@Module({
  imports: [
    MongooseModule.forFeature([
        {    
            name: Address.name,
            schema: AddressSchema
        }
    ]),
    ProfileModule
  ],
  controllers: [AddressController],
  providers: [AddressService]
})
export class AddressModule {}
