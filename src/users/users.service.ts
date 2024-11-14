import { Injectable } from '@nestjs/common';

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
        if (role) {
            return this.users.filter(user => user.role === role);
        }
        if (dept) {
            return this.users.filter(user => user.role === dept);
        }
        return this.users;
    }

    findOne(id: number) {
        return this.users.find(user => user.id === id);
    }

    create(user: {id: number, name: string, email: string, role: "INTERN" | "ENGINEER" | "ADMIN"}) {
        this.users.push(user);
        return user;
    }

    update(user: {id?: number, name?: string, email?: string, role?: "INTERN" | "ENGINEER" | "ADMIN"}, id: number) {
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
