import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import md5 from 'md5';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { HandleErrors } from '../../decorators/handleErrors.decorator';

const saltRounds = parseInt(process.env.SALT_ROUNDS || '10');

@Injectable()
export class AccountService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  @HandleErrors()
  async registerUser(body: any, req: any) {
    const { mobile, password } = body;

    const user = await this.userRepository.findOne({ where: { mobile } });
    if (user) {
      if (user.mobile === mobile) {
        throw new HttpException({ message: 'Phone number already registered' }, HttpStatus.BAD_REQUEST);
      }
    }

    const access_token = jwt.sign({ user: { mobile }, timeNow: Date.now() }, process.env.JWT_ACCESS_TOKEN_SECRET, {
      expiresIn: '1d',
    });
    const hashedToken = md5(access_token);
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const userData: Partial<User> = {
      mobile,
      password: hashedPassword,
      username: mobile,
      access_token: access_token,
    };

    const createUser = this.userRepository.create(userData);
    await this.userRepository.save(createUser);

    return { message: 'User registered successfully', result: { token: access_token, value: hashedToken } };
  }

  @HandleErrors()
  async forgetPassword(body: any) {
    const { mobile, password, otp } = body;

    const user = await this.userRepository.findOne({
      select: ['otp'],
      where: { mobile },
    });
    if (!user) {
      throw new HttpException({ message: 'Account does not exist' }, HttpStatus.BAD_REQUEST);
    }

    const currentTime = Date.now();
    const currentAttempts = user.otp_attempts ?? 10;
    const otpExpirationTime = new Date(user.otp_expiration_time).getTime();

    if (otpExpirationTime <= currentTime) {
      throw new HttpException({ message: 'OTP code has expired' }, HttpStatus.BAD_REQUEST);
    }
    if (currentAttempts >= 5) {
      throw new HttpException({ message: 'Maximum OTP attempts reached' }, HttpStatus.BAD_REQUEST);
    }
    if (user.otp !== otp) {
      await this.userRepository.update({ mobile }, { otp_attempts: currentAttempts + 1 });
      throw new HttpException({ message: 'OTP code is incorrect' }, HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    await this.userRepository.update(
      { mobile },
      {
        otp: '',
        otp_attempts: 0,
        password: hashedPassword,
      },
    );
    return { message: 'Change password successfully', timeStamp: currentTime };
  }

  @HandleErrors()
  async login(body: any): Promise<any> {
    const { username, password: loginPass } = body;

    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) {
      throw new HttpException({ message: 'Incorrect Username or Password' }, HttpStatus.UNAUTHORIZED);
    }

    const isValidPassword = await bcrypt.compare(loginPass, user.password);
    if (!isValidPassword) {
      throw new HttpException({ message: 'Incorrect Username or Password' }, HttpStatus.UNAUTHORIZED);
    }

    const access_token = jwt.sign(
      {
        user: {
          id: user.id,
          username: user.username,
        },
        timeNow: Date.now(),
      },
      process.env.JWT_ACCESS_TOKEN_SECRET,
      { expiresIn: '1d' },
    );

    user.access_token = access_token;
    await this.userRepository.save(user);

    return { message: 'Login successful !', result: { token: access_token, value: md5(access_token) } };
  }

  // server logout api implementation
  @HandleErrors()
  async logout(req: any): Promise<object> {
    const auth = req.cookies.auth;
    const user = await this.userRepository.findOne({ where: { access_token: auth } });
    if (!user) {
      throw new HttpException({ message: 'Invalid token or user not found' }, HttpStatus.UNAUTHORIZED);
    }

    // Remove or invalidate the access token
    user.access_token = null;
    await this.userRepository.save(user);

    return { message: 'Logged out successfully' };
  }
}
