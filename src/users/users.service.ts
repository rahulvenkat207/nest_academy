import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/createUser.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository : Repository<User>
    ){}

    async getByEmail(email: string){
        const user = await this.userRepository.findOne({where:{email}});
        if(user){
            return user;
        }
        throw new HttpException('User with this email does not exist',HttpStatus.NOT_FOUND)
    }

    async createUser(userData : CreateUserDto){
        const newUser = await this.userRepository.create(userData);
        await this.userRepository.save(newUser);
        return newUser;
    }
}
