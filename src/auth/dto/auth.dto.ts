import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AuthDTO {
  @IsString()
  @ApiProperty({ example: 'abcde' })
  readonly id: string;

  @IsString()
  @ApiProperty({ example: 'abcde' })
  readonly password: string;
}
