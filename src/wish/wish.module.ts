import { Module } from '@nestjs/common';
import { WishService } from './wish.service';
import { WishController } from './wish.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Wish, WishSchema } from './entities/wish.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Wish.name,
        schema: WishSchema
      }
    ]),
  ],
  controllers: [WishController],
  providers: [WishService]
})
export class WishModule {}
