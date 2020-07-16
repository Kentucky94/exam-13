const env = process.env.REACT_APP_ENV;

let apiURL = 'http://localhost:8080';

if(env === 'test'){
  apiURL = 'http://localhost:8090';
}

const config = {
  apiURL,
};

export default config;