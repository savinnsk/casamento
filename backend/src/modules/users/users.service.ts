import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserCreateDto, UserUpdateDto } from './dto';
import { PrismaService } from 'src/infra/database/prisma/prisma-service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async create(data: UserCreateDto) {

 
    const { id ,name, phone } = await this.prisma.user.create({ data });

    if (!id) {
      throw new InternalServerErrorException('Internal Error');
    }

    return {
      status: 200,
      message: 'user created with success',
      data: {
        name,
        phone
      },
    };
  }



  async getUser({ userToken }: { userToken: string }) {
    try {


      const user = await this.prisma.user.findUnique({
        where: {
          id: userToken,
        },
      });

      return {
        name: user.name,
        photo: user.phone,
        isConfirmed : user.isConfirmed
      };

    } catch (error) {
      console.log(error);
      return new InternalServerErrorException();
    }
  }

  async getAllConfirmed({ userToken }: { userToken: string }) {
    try {


      const users = await this.prisma.user.findMany({
        where: {
          isConfirmed: true,
        },
      });

      return {
        users
      };

    } catch (error) {
      console.log(error);
      return new InternalServerErrorException();
    }
  }


  async update( data: {data: UserUpdateDto;user: string;}) 
  {
    try {
    

      const existingUser = await this.prisma.user.findUnique({
        where: {
          id: data.user
        },
      });

      if (!existingUser) {
        throw new UnauthorizedException('User not found');
      }

      const user = await this.prisma.user.update({
        data,
        where: {
          id: existingUser.id,
        },
      });

      return {
        user,
      };
    } catch (error) {
      console.log(error);
      return new InternalServerErrorException();
    }
  }

  async confirmPresense(data : any) 
  {
    try {
    

      const existingUser = await this.prisma.user.findUnique({
        where: {
          phone: data.phone.phone
        },
      });

      if (!existingUser) {
        throw new UnauthorizedException('User not found');
      }


      let value = existingUser.isConfirmed ? false : true

      const user = await this.prisma.user.update({
        data : {
          isConfirmed : value
        },
        where: {
          id: existingUser.id,
        },
      });

      return {
        user,
      };
    } catch (error) {
      console.log(error);
      return new InternalServerErrorException();
    }
  }

  async login(data: { phone: string }) {
    try {

      const user = await this.prisma.user.findUnique({
        where: {
          phone: data.phone,
        },
      });

      if(!user?.id){
        return new BadRequestException("não foi possivél achar esse cadastro")
      }

      return {
        user
      };

    } catch (error) {
      console.log(error);
      return new InternalServerErrorException();
    }
  }
  
  async getConfirmed({ userToken }: { userToken: string }) {
    try {


      const users = await this.prisma.user.findMany({
        where: {
          isConfirmed: true,
        },
      });

      return {
        data : users
      };

    } catch (error) {
      console.log(error);
      return new InternalServerErrorException();
    }
  }

}
