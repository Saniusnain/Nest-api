import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
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
        let users = [];
        if (role) {
            users = this.users.filter(user => user.role === role);
            if (users.length === 0) throw new NotFoundException('No users found');
            return users;
        }
        if (dept) {
            users = this.users.filter(user => user.role === dept);
            if (users.length === 0) throw new NotFoundException('No users found');
            return users;
        }
        return this.users;
    }

    findOne(id: number) {
        const user = this.users.find(user => user.id === id);
        if (!user) throw new NotFoundException(`User #${id} not found`);
        return user;
    }

    create(user: CreateUserDto) {
        this.users.push(user);
        return user;
    }

    update(user: UpdateUserDto, id: number) {
        this.users = this.users.map(u => {
            if (u.id === id) {
                return {...u, ...user};
            }
            return u;
        })

        return this.findOne(id);
    }

    delete(id: number) {
        this.users = this.users.filter(u => u.id !== id);
    }
}
