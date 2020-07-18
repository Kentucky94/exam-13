const path = require('path');

const env = process.env.NODE_ENV;

const rootPath = __dirname;

let database = 'mongodb://localhost/exam13';
let port = 8080;

if(env === 'test'){
  database = 'mongodb://localhost/exam13-test';
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
};