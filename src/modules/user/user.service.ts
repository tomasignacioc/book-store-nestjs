import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection } from 'typeorm';

import { Role } from '../role/role.entity';
import { UserDto } from './dto/user.dto';
import { UserDetails } from './user.details.entity';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepository)
        private readonly _userRepository: UserRepository,
    ) { }

    async get(id: number): Promise<User> {
        if (!id) {
            throw new BadRequestException('id must be sent');
        }

        const user: User = await this._userRepository.findOne(id, {
            where: { status: 'ACTIVE' },
        });

        if (!user) {
            throw new NotFoundException();
        }

        return user;
    }

    async getAll(): Promise<User[]> {
        const users: User[] = await this._userRepository.find();

        return users;
    }

    async create(user: User): Promise<User> {
        const details = new UserDetails();
        user.details = details;

        const repo = getConnection().getRepository(Role);
        const defaultRole = await repo.findOne({ where: { name: 'GENERAL' } });
        user.roles = [defaultRole];

        const savedUser: User = await this._userRepository.save(user);
        return savedUser;
    }

    async update(id: number, user: User): Promise<void> {
        await this._userRepository.update(id, user);
    }

    async delete(id: number): Promise<void> {
        const userExists = await this._userRepository.findOne(id, { where: { status: 'ACTIVE' }, });

        if (!userExists) {
            throw new NotFoundException();
        }

        await this._userRepository.update(id, { status: 'INACTIVE' });
    }
}
