import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserCreateDto, UserUpdateDto } from './dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('')
  @ApiOperation({ summary: 'Create new user' })
  @ApiCreatedResponse({
    status: 200,
    description: 'New user created successfully',
  })
  @ApiBadRequestResponse({ status: 409, description: 'User Already exist' })
  async create(@Body() data: UserCreateDto, @Res() res) {
    try {
      const response = await this.usersService.create(data);
      return res.status(201).json(response);
    } catch (e) {
      return res.status(e.status).json(e.response);
    }
  }


  @Put()
  @ApiOperation({ summary: 'update user' })
  @ApiCreatedResponse({
    status: 200,
    description: 'user updated successfully',
  })
  @ApiUnauthorizedResponse({ status: 401, description: 'Not Authorized' })
  async update(@Body() data: UserUpdateDto, @Query() user) {
    return await this.usersService.update({ data, user });
  }

 
  @Get()
  @ApiOperation({ summary: 'get user logged' })
  @ApiCreatedResponse({
    status: 200,
    description: 'get user successfully',
  })
  @ApiUnauthorizedResponse({ status: 401, description: 'Not Authorized' })
  async get(@Query() user) {
    return await this.usersService.getUser(user);
  }


  @Get("all")
  @ApiOperation({ summary: 'get user logged' })
  @ApiCreatedResponse({
    status: 200,
    description: 'get user successfully',
  })
  @ApiUnauthorizedResponse({ status: 401, description: 'Not Authorized' })
  async getAll(@Query() user) {
    return await this.usersService.getAll();
  }




  @Post("login")
  @ApiOperation({ summary: 'login' })
  @ApiCreatedResponse({
    status: 200,
    description: 'login',
  })
  @ApiUnauthorizedResponse({ status: 401, description: 'Not Authorized' })
    async login(@Body() data : {phone : string }) {
    return await this.usersService.login(data);
  }

  
  @Put("confirm")
  @ApiOperation({ summary: 'update user' })
  @ApiCreatedResponse({
    status: 200,
    description: 'confirm presense',
  })
  @ApiUnauthorizedResponse({ status: 401, description: 'Not Authorized' })
  async confirm(@Query() phone) {

    return await this.usersService.confirmPresense({phone});
  }

  
  @Get("getConfirmed")
  @ApiOperation({ summary: 'get user logged' })
  @ApiCreatedResponse({
    status: 200,
    description: 'get user successfully',
  })
  @ApiUnauthorizedResponse({ status: 401, description: 'Not Authorized' })
  async getConfirmed(@Query() user) {
    return await this.usersService.getConfirmed(user);
  }


}
