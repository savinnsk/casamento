import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma/prisma-service';
import { CreategiftDto, UpdategiftDto } from './dto';


@Injectable()
export class giftsService {
  constructor(
    private prismaService: PrismaService,
  ) {}

  async create({
    data
  }: {
    data: CreategiftDto;
    userToken: string;
  }) {
    try {

      return this.prismaService.gift.create({ data });

    } catch (error) {
      return new InternalServerErrorException();
    }
  }


  async update({
    data
  }: {
    data: UpdategiftDto;}) {
    try {

      return this.prismaService.gift.update({
        data,
         where: { 
          id: data.id,
         },
        });

    } catch (error) {
      return new InternalServerErrorException();
    }
  }


  async listAllgifts({ userToken }: { userToken: string }) {
    try {


      const gifts = await this.prismaService.gift.findMany();

      const giftsWithOwnership = gifts.map((gift) => ({
        id: gift.id,
        name: gift.name,
      }));

      return giftsWithOwnership;
    } catch (error) {
      return new InternalServerErrorException();
    }
  }

  async deletegift({ id}: { id: string; }) {
    try {
 
      const gift = await this.prismaService.gift.findUnique({ where: { id } });

      return this.prismaService.gift.delete({ where: { id: gift.id } });
    } catch (error) {
      return new InternalServerErrorException();
    }
  }
}
