import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {User} from '../schemas/user.schema';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}
    
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
