import { Module } from '@nestjs/common';
import { giftsService } from './gifts.service';
import { giftsController } from './gifts.controller';
import { PrismaService } from 'src/infra/database/prisma/prisma-service';


@Module({
  controllers: [giftsController],
  providers: [giftsService, PrismaService],
})
export class giftsModule {}
