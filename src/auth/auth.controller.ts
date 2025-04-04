import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthDTO } from './dto/auth.dto';
import {
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { TokenDTO } from './dto/token.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'create a user' })
  @ApiBody({ type: AuthDTO })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async login(@Body() body: AuthDTO): Promise<TokenDTO> {
    return await this.authService.login(body);
  }

  @Post('refresh')
  async refresh(@Body('refresh_token') refresh_token: string) {
    return await this.authService.refreshToken(refresh_token);
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(): Promise<void> {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthCallback(@Req() req: Request & { user }): Promise<TokenDTO> {
    return await this.authService.googleOAuth(req.user);
  }
}
