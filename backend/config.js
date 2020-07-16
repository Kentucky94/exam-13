const path = require('path');

const env = process.env.NODE_ENV;

const rootPath = __dirname;

let database = 'mongodb://localhost/exam13lab';
let port = 8080;

if(env === 'test'){
  database = 'mongodb://localhost/exam13lab-test';
  port = 8090;
}

module.exports = {
  rootPath,
  port,
  uploadPath: path.join(rootPath, 'public', 'uploads'),
  database,
  databaseOptions: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  facebook: {
    appId: '237001530836786',
    appSecret: 'e562695461ce358cdf9905a5e5db6126'
  }
};