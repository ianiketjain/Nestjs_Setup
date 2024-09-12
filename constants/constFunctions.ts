import _ from 'lodash';

export const utils = {
  generateUniqueNumberCodeByDigit(digit) {
    const timestamp = new Date().getTime().toString();
    const randomNum = _.random(1e12).toString();
    const combined = timestamp + randomNum;
    return _.padStart(combined.slice(-digit), digit, '0');
  },

  getIpAddress(req) {
    let ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    if (ipAddress.substr(0, 7) == '::ffff:') {
      ipAddress = ipAddress.substr(7);
    }
    return ipAddress;
  },
};
