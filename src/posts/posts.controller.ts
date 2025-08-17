import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dtos/createPost.dto';
import { UpdatePostDto } from './dtos/updatePost.dto';

@Controller('posts')
export class PostsController {
    constructor(
        private readonly postService : PostsService
    ){}

        @Get()
        getAllPosts(){
        return this.postService.getAllPosts();
        }

        @Get(':id')
        getPostById(@Param('id', ParseIntPipe) id:number){
            return  this.postService.getPostById(id);
        }

        @Post()
        async createPost(@Body() post : CreatePostDto){
            return this.postService.createPost(post);
        }

        @Put(':id')
        async replacePost(@Param('id',ParseIntPipe)id:number, @Body() post : UpdatePostDto){
            return  this.postService.replacePost(id,post);
        }

        @Delete(':id')
        async deletePost(@Param('id',ParseIntPipe) id:number){
            return this.postService.deletePost(id);
        }
    }
