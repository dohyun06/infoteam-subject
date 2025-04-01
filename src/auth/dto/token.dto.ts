import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class TokenDTO {
  @IsString()
  @ApiProperty({ example: 'abc' })
  readonly access_token: string;

  @IsString()
  @ApiProperty({ example: 'abc' })
  readonly refresh_token: string;
}
