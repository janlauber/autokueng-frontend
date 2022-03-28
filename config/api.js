import Axios from 'axios';
import Cookies from 'js-cookie';

let version = 'v1';

let urls = {
    test: 'https://api.autokueng.ch/test/api/' + version, // test
    development: 'http://localhost:8000/api/' + version, // local development
    production: 'https://api.autokueng.ch/api/' + version, // production
}

let Api = Axios.create({
    baseURL: urls[process.env.NODE_ENV],
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

const token = Cookies.get('token');
if(token) {
    Api = Axios.create({
         baseURL: urls[process.env.NODE_ENV],
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
    });
}

export default Api;