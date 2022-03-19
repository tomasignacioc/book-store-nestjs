import { Injectable } from "@nestjs/common";
import { TypeMapper } from "ts-mapper";

import { UserDto } from "src/modules/user/dto/user.dto";
import { User } from "src/modules/user/user.entity";

@Injectable()
export class MapperService extends TypeMapper{

    constructor(){
        super(); // con super estamos llamando explícitamente al constructor de la clase TypeMapper
        this.config();
    }

    private config(): void{
        this.createMap<User, UserDto>()
        .map(entity => entity.id, dto => dto.id)
        .map(entity => entity.username, dto => dto.username)
        .map(entity => entity.email, dto => dto.email)
        .map(entity => entity.details, dto => dto.details)
        .map(entity => entity.roles, dto => dto.roles)
    }
}