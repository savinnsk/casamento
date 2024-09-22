import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { giftsModule } from './modules/gifts/gifts.module';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
 
    }),
    ConfigModule.forRoot({
      isGlobal: true
    }),
    UsersModule,
    giftsModule,
  ],
  controllers: [],
})
export class AppModule {}
