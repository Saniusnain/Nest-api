import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';

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
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(+id);
    }

    @Post()
    create(@Body() user: {id: number, name: string, email: string, role: "INTERN" | "ENGINEER" | "ADMIN"}) {
        return this.usersService.create(user);
    }

    @Patch(':id')
    update(@Body() user: {id: number, name: string, email: string, role: "INTERN" | "ENGINEER" | "ADMIN"}, @Param('id') id: string) {
        return this.usersService.update(user, +id);
    }

    @Delete(':id')
    deleteUser(@Param('id') id: string) {
        return this.usersService.delete(+id);
    }
}
