import { Body, Controller, Get } from '@nestjs/common';
import { AuthDTO } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  @Get('login')
  login(@Body() auth: AuthDTO) {}
}
