import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly configService: ConfigService) {
    super({
      clientID: configService.getOrThrow('GOOGLE_OAUTH_ID'),
      clientSecret: configService.getOrThrow('GOOGLE_OAUTH_SECRET'),
      callbackURL: configService.get<string>('GOOGLE_OAUTH_CALLBACK'),
      scope: ['email', 'profile'],
    });
  }

  validate(accessToken: string, refreshToken: string, profile: Profile) {
    return {
      id: profile.emails?.[0].value,
      password: profile.id,
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }
}
