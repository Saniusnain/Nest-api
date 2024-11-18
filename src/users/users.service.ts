import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {User} from '../schemas/user.schema';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    private users = [
        {
            "id": 1,
            "name": "John Doe",
            "email": "jdoe@me.com",
            "role": "INTERN"
        },
        {
            "id": 2,
            "name": "Jane Smith",
            "email": "jsmith@company.com",
            "role": "ENGINEER"
        },
        {
            "id": 3,
            "name": "Alice Johnson",
            "email": "alice.j@company.com",
            "role": "ADMIN"
        },
        {
            "id": 4,
            "name": "Robert Brown",
            "email": "rbrown@company.com",
            "role": "INTERN"
        },
        {
            "id": 5,
            "name": "Emily Davis",
            "email": "edavis@company.com",
            "role": "ENGINEER"
        },
        {
            "id": 6,
            "name": "Michael Wilson",
            "email": "mwilson@company.com",
            "role": "ADMIN"
        }
    ];
    
    findAll(role?: string, dept?: string) { 
        if (role) {
            return this.userModel.find({role: role});
        }
        if (dept) {
            return this.userModel.find({dept: dept});
        }
        return this.userModel.find();
    }

    findOne(id: number) {
        const user = this.userModel.find({id: id});
        if (!user) throw new NotFoundException(`User #${id} not found`);
        return user;
    }

    async create(user: CreateUserDto): Promise<User> {
        const createdUser = new this.userModel(user);
        return createdUser.save();
    }

    update(user: UpdateUserDto, id: number) {
        return this.userModel.findOneAndUpdate({id: id}, user);
    }

    delete(id: number) {
        return this.userModel.findOneAndDelete({id: id});
    }
}
