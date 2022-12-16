const path = require('path');
const dotenv = require('dotenv');
let env = process.env.NODE_ENV ? 'production' : 'development';
const filePath = path.join(__dirname, '/' + env + '.env');
const define = dotenv.config({
  path: filePath,
}).parsed;

if (env === 'development') {
  try {
    const filePath = path.join(__dirname, './development.env');
    const data = dotenv.config({
      path: filePath,
    }).parsed;
    Object.assign(define, data);
  } catch (err) {
    console.log('err: ', err);
  }
}

module.exports = define;