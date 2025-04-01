import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthDTO } from './dto/auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { TokenDTO } from './dto/token.dto';
import { UserService } from 'src/user/user.service';
import { PayloadDTO } from './dto/payload.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  async login(body: AuthDTO): Promise<TokenDTO> {
    const user = await this.prisma.user
      .findUnique({ where: { id: body.id } })
      .then((user) => {
        if (!user) throw new NotFoundException('ID is failed');
        return user;
      });

    if (!(await bcrypt.compare(body.password, user.password)))
      throw new UnauthorizedException('Password is failed');

    const payload: PayloadDTO = { id: user.id };
    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: '15m',
    });
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: '1d',
    });

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async refreshToken(refreshToken: string) {
    try {
      const payload: PayloadDTO & { iat } & { exp } = this.jwtService.verify(
        refreshToken,
        {
          secret: this.configService.get<string>('JWT_SECRET'),
        },
      );

      delete payload.iat;
      delete payload.exp;

      const user = await this.userService.getUser(payload.id);

      if (!user) throw new NotFoundException();

      const accessToken = this.jwtService.sign(payload, {
        secret: this.configService.get<string>('JWT_SECRET'),
        expiresIn: '15m',
      });

      return { access_token: accessToken };
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
