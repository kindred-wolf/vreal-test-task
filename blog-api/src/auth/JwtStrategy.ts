// src/auth/jwt.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { JwtPayload } from './JwtPayloadInterface'
import { AuthService } from './AuthService'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey:
        '1439ab2ad807950ea914ebf13b973f84bb00be7e1606cb65ce02cc0f4b93feb9',
    })
  }

  async validate(payload: JwtPayload) {
    const user = await this.authService.authenticateUser(payload)
    if (!user) {
      throw new UnauthorizedException()
    }
    return user
  }
}
