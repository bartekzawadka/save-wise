let apiUrl  = 'http://localhost:5000/api';
if(process.env.REACT_APP_API_URL){
  apiUrl = process.env.REACT_APP_API_URL;
}

const Config = {
  apiUrl: apiUrl
};

export default Config;
