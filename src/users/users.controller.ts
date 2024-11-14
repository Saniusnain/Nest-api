import { Body, Controller, Delete, Get, Param, Patch, Post, Query, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get() // /users or /users?role=value&dept=value
    findAll(@Query('role') role?: string, @Query('dept') dept?: string) {
        return this.usersService.findAll(role, dept); 
    }
    
    // This needs to go before /:id 
    @Get('interns') // users/interns
    findAllInterns() {
        return [];
    }

    @Get(':id') // users/1
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.findOne(id);
    }

    @Post()
    create(@Body(ValidationPipe) user: CreateUserDto) {
        return this.usersService.create(user);
    }

    @Patch(':id')
    update(@Body(ValidationPipe) user: UpdateUserDto, @Param('id', ParseIntPipe) id: number) {
        return this.usersService.update(user, id);
    }

    @Delete(':id')
    deleteUser(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.delete(id);
    }
}
