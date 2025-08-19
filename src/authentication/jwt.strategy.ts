import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersService } from "src/users/users.service";
import { Request } from 'express';



@Injectable()
export class JWtStrategy extends PassportStrategy(Strategy){
    constructor(
        private readonly configService: ConfigService,
        private readonly userService: UsersService,
      ) {
        super({
          jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
            return request?.cookies?.Authentication;
          }]),
          secretOrKey: configService.get('JWT_SECRET')!
        });
      }

    async validate(){
        
    }
}