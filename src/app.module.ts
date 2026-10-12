import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { ReviewsModule } from './reviews/reviews.module';

import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [ ConfigModule.forRoot({ isGlobal: true }),
    ProductsModule, UsersModule, ReviewsModule, PrismaModule],
})
export class AppModule {}
