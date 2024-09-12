import _ from 'lodash';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HandleErrors } from '../decorators/handleErrors.decorator';
// import { HandleErrors } from '../';

@Injectable()
export class AppService {
  getHello(): object {
    const randomNum = _.random(1, 1e12).toString(); // Generate a random number
    console.log(`Random number: ${randomNum}`);
    return { message: 'Mumbai start vibing!', jwt: process.env.PORT, name: 'aniket' };
  }

  @HandleErrors()
  getError(body: any) {
    if (body.name === 'hello') {
      throw new HttpException('Invalid Decorator works!!', HttpStatus.UNAUTHORIZED);
    }
    return { name: 'Aniket', ...body };
  }
}
