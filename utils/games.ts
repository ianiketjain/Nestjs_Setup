import _ from 'lodash';
import crypto from 'crypto';

const randomString = (length: number) => {
  return crypto.randomBytes(length).toString('base64').slice(0, length);
};
