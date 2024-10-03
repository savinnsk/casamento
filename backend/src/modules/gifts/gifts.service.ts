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


  async listAllgiftsAvailable() {
    try {

      const gifts = await this.prismaService.gift.findMany({
        where : {
          isAvaliable : true
        }
      });

      return gifts;
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

  
  async send(data: {user : any ,gifts : any}) {
    try {
    

      data.gifts.forEach(async (gift) => {
      
      await this.prismaService.gift.update({ data : {userId : data.user.id , isAvaliable : false},
           where: { 
            id: gift.id,
           },
          });

      });

      const userGifts = await this.prismaService.gift.findMany({
        where : {
          userId : data.user.id
        }
      })


      const user = await this.prismaService.user.update({data : {userGifts : userGifts.length},
        where: {
          id: data.user.id,
        },
      });

      console.log(user)
      return  {
      user : user,
      gifts : await this.listAllgiftsAvailable()
    
    }

    } catch (error) {
      return new InternalServerErrorException();
    }
  }

  async cancelUserGifts(data: {user : any ,gifts : any}) {
    try {
    

      data.gifts.forEach(async (gift) => {
      
      await this.prismaService.gift.update({ data : {userId : null , isAvaliable : true},
           where: { 
            id: gift.id,
           },
          });

      });

      const userGifts = await this.prismaService.gift.findMany({
        where : {
          userId : data.user.id
        }
      })


      const user = await this.prismaService.user.update({data : {userGifts : userGifts.length},
        where: {
          id: data.user.id,
        },
      });

      return  {
      user : user,
      gifts : await this.listAllgiftsAvailable()
    
    }

    } catch (error) {
      return new InternalServerErrorException();
    }
  }

  async getUserGifts(data: {user : any}) {
    try {
  
      const userGifts = await this.prismaService.gift.findMany({
        where : {
          userId : data.user.id
        }
      })
  
      return  {
      userGifts : userGifts
    
    }

    } catch (error) {
      return new InternalServerErrorException();
    }
  }


  async  getGiftOwner(data) {
    try {
  
      const userGifts = await this.prismaService.gift.findMany({
        where : {
          userId : data
        }
      })


      const user = await this.prismaService.gift.findUnique({
        where : {
          id : data
        }
      })
      console.log(userGifts)
  
      return  {
        user ,
      userGifts : userGifts
    
    }

    } catch (error) {
      return new InternalServerErrorException();
    }
  }

  
}
