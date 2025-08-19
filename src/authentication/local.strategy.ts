import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthenticationService } from "./authentication.service";
import { User } from "src/users/user.entity";



@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private authticationService: AuthenticationService){
        super({
            usernameField : 'email'
        })
    }
    async validate(email : string,password:string): Promise<User>{
        return this.authticationService.getAuthenticatedUser(email,password);
    }


} 