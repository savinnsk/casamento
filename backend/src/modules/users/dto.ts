import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsString } from 'class-validator';

export abstract class UserCreateDto {
  id?: string;

  @IsEmail()
  @ApiProperty({
    example: 'savio',
    required: true,
  })
  name: string;

  @IsString({ message: 'name should be a string' })
  @ApiProperty({
    example: '22996043721',
    required: true,
  })
  phone: string;

  @IsString({ message: 'name should be a string' })
  @ApiProperty({
    required: false,
  })
  isConfirmed: true;

}

export abstract class LoginUserDto {
  @IsString()
  @ApiProperty({
    example: '22996043721',
  })
  phone: string;
}

export abstract class UserUpdateDto {
  @IsBoolean()
  @ApiProperty({})
  status: boolean;

}
