import Axios from 'axios';

let urls = {
    test: 'https://api.autokueng.ch/test', // test
    development: 'http://localhost:8000', // local development
    production: 'https://api.autokueng.ch', // production
}

const Api = Axios.create({
    baseURL: urls[process.env.NODE_ENV],
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

export default Api;