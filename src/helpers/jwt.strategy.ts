import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from 'src/modules/auth/interfaces/jwtpayload.interface';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private jwtService: JwtService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWTSECRET,
    });
  }

  async validate(payload: JwtPayload) {
    return { email: payload.id, role: payload.role };
  }

  decodeJwt(jwtToken: string) {
    const decoded = this.jwtService.decode(jwtToken);
    return decoded;
  }
}
