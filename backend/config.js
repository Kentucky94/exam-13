const path = require('path');

const rootPath = __dirname;

module.exports = {
  rootPath,
  port: 8080,
  uploadPath: path.join(rootPath, 'public', 'uploads'),
  database: 'mongodb://localhost/exam13',
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