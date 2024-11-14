import { IsEmail, IsEnum, IsString, IsInt } from "class-validator";

export class CreateUserDto {
    @IsInt()
    id: number;

    @IsString()
    name: string;

    @IsEmail()
    email: string;
    
    @IsEnum(["INTERN", "ENGINEER", "ADMIN"], {
        message: 'Valid role required'
    })
    role: "INTERN" | "ENGINEER" | "ADMIN";
}
