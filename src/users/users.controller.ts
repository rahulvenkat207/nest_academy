import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/createUser.dto';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService
    ){}

    @Get(':email')
    getByEmail(@Param('email') email : string){
        return this.usersService.getByEmail(email);
    }

    @Post()
    createUser(@Body() user : CreateUserDto){
        return this.usersService.createUser(user);

    }
}
