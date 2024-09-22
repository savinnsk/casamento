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
  ApiBearerAuth,
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

  @ApiBearerAuth()
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

  @ApiBearerAuth()
  @Get()
  @ApiOperation({ summary: 'get all gifts' })
  @ApiCreatedResponse({
    status: 201,
    description: 'get all gift successfully',
  })
  @ApiUnauthorizedResponse({ status: 401, description: 'Not Authorized' })
  async getAll(@Request() req: any) {
    const userToken = req.headers['authorization'].split(' ')[1];
    return await this.giftsService.listAllgifts({
      userToken: userToken,
    });
  }

  @ApiBearerAuth()
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
}
