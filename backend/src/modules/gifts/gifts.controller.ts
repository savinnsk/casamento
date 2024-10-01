import {
  Controller,
  Post,
  Request,
  Body,
  Get,
  Delete,
  Param,
} from '@nestjs/common';
import { giftsService } from './gifts.service';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CreategiftDto } from './dto';

@ApiTags('gifts')
@Controller('gifts')
export class giftsController {
  constructor(private readonly giftsService: giftsService) {}


  @Post()
  @ApiOperation({ summary: 'create a new gift' })
  @ApiCreatedResponse({
    status: 201,
    description: 'New gift created successfully',
  })
  @ApiBadRequestResponse({ status: 400, description: 'Invalid parameters' })
  @ApiUnauthorizedResponse({ status: 401, description: 'Not Authorized' })
  async create(@Request() req: any, @Body() creategiftDto: CreategiftDto) {
    const userToken = req.headers['authorization'].split(' ')[1];
    return await this.giftsService.create({
      userToken: userToken,
      data: creategiftDto,
    });
  }


  @Get()
  @ApiOperation({ summary: 'get all gifts' })
  @ApiCreatedResponse({
    status: 201,
    description: 'get all gift successfully',
  })
  async getAllAvailable(@Request() req: any) {

    return await this.giftsService.listAllgiftsAvailable();
  }


  @Delete(':id')
  @ApiParam({ name: 'id', type: 'string' } as any)
  @ApiOperation({ summary: 'delete a gift' })
  @ApiCreatedResponse({
    status: 201,
    description: 'gift deleted gift successfully',
  })
  @ApiUnauthorizedResponse({ status: 401, description: 'Not Authorized' })
  async delete(@Request() req: any, @Param('id') id: string) {
    const userToken = req.headers['authorization'].split(' ')[1];
    return await this.giftsService.deletegift({
      id
    });
  }



  @Post("send")
  @ApiOperation({ summary: 'create a new gift' })
  @ApiCreatedResponse({
    status: 201,
    description: 'New gift created successfully',
  })
  @ApiBadRequestResponse({ status: 400, description: 'Invalid parameters' })
  @ApiUnauthorizedResponse({ status: 401, description: 'Not Authorized' })
  async send(@Request() req: any, @Body() data: any) {

    return await this.giftsService.send({
      user: data.user,
      gifts: data.gifts,
    });
  }

  
  @Post("cancel")
  @ApiOperation({ summary: 'create a new gift' })
  @ApiCreatedResponse({
    status: 201,
    description: 'New gift created successfully',
  })
  @ApiBadRequestResponse({ status: 400, description: 'Invalid parameters' })
  @ApiUnauthorizedResponse({ status: 401, description: 'Not Authorized' })
  async cancel(@Request() req: any, @Body() data: any) {

    return await this.giftsService.cancelUserGifts({
      user: data.user,
      gifts: data.gifts,
    });
  }


  
  @Post("user")
  @ApiOperation({ summary: 'create a new gift' })
  @ApiCreatedResponse({
    status: 201,
    description: 'New gift created successfully',
  })
  @ApiBadRequestResponse({ status: 400, description: 'Invalid parameters' })
  @ApiUnauthorizedResponse({ status: 401, description: 'Not Authorized' })
  async getUser(@Request() req: any, @Body() data: any) {

    console.log("kk",data)
    return await this.giftsService.getUserGifts({
      user: data
    });
  }




}
