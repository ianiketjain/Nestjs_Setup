import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import _ from 'lodash';
import { HandleErrors } from '../../decorators/handleErrors.decorator';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  @HandleErrors()
  async updateUser(body: any, req: any) {
    const auth = req.cookies.auth;

    const user = await this.userRepository.findOne({ where: { access_token: auth } });
    if (!user) {
      throw new HttpException({ code: '400', message: 'User not found' }, HttpStatus.BAD_REQUEST);
    }

    // Update details of user
    Object.assign(user, body);
    await this.userRepository.save(user);

    return { message: 'User details updated successfully' };
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }
}
