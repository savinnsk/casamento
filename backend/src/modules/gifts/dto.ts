import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export abstract class CreategiftDto {
  id?: string;

  userId: string;

  @IsString({ message: 'the name should be a string' })
  @ApiProperty({
    example: 'Copa do mundo',
    required: true,
  })
  name: string;

  @ApiProperty({
    example: 'Copa do mundo',
    required: false,
  })
  description?: string;
}

export abstract class UpdategiftDto {
  id?: string;

  userId: string;

  @IsString({ message: 'the name should be a string' })
  @ApiProperty({
    example: 'Copa do mundo',
    required: true,
  })
  name: string;

  @ApiProperty({
    example: 'Copa do mundo',
    required: false,
  })
  description?: string;
}
