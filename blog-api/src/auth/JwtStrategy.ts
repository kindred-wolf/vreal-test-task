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
      secretOrKey: process.env.JWT_SIGN_SECRET,
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
