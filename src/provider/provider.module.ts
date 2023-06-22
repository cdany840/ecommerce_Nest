import { Module } from '@nestjs/common';
import { ProviderService } from './provider.service';
import { ProviderController } from './provider.controller';
import { Provider, ProviderSchema } from './entities/provider.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Provider.name,
        schema: ProviderSchema
      }
    ]),
  ],
  controllers: [ProviderController],
  providers: [ProviderService]
})
export class ProviderModule {}
