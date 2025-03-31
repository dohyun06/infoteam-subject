import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AuthDTO {
  @IsString()
  @ApiProperty({ example: 'abc' })
  readonly id: string;

  @IsString()
  @ApiProperty({ example: 'abc' })
  readonly password: string;
}
