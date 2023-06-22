import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { ProfileModule } from './profile/profile.module';
import { CategoryModule } from './category/category.module';
import { SubcategoryModule } from './subcategory/subcategory.module';
import { ProductModule } from './product/product.module';
import { ProviderModule } from './provider/provider.module';
import { AddressModule } from './address/address.module';
import { AuthModule } from './auth/auth.module';
import { SaleModule } from './sale/sale.module';
import { WishModule } from './wish/wish.module';
import { EmailModule } from './email/email.module';
import { ContactModule } from './contact/contact.module';

@Module({
  imports: [
    ConfigModule.forRoot(),

    MongooseModule.forRoot( process.env.MONGO_URI ),

    ProfileModule,

    AuthModule,

    CategoryModule,

    SubcategoryModule,

    ProductModule,

    ProviderModule,

    AddressModule,

    SaleModule,

    WishModule,

    EmailModule,

    ContactModule

  ],
  controllers: [],
  providers: [],
})
export class AppModule {

}

/*
Para usar funciones de un módulo externo se tienen que exportar sus
servicios, después importar el módulo en el otro módulo.
(Dynamic Modules - NestJS)
*/
