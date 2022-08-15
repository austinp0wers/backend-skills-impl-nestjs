import { JwtService } from '@nestjs/jwt';
export const getDecodedJwt = (jwtToken: string) => {
  const jwtService = new JwtService();
  const decodedToken = jwtService.decode(
    jwtToken.split(' ')[1],
  ) as JwtPayloadType;
  return decodedToken;
};
