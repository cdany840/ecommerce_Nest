import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';


import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [
    ConfigModule.forRoot(),

    MongooseModule.forRoot( process.env.MONGO_URI ),

    AuthModule,

    ProfileModule,

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
