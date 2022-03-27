import Axios from 'axios';

let version = 'v1';

let urls = {
    test: 'https://api.autokueng.ch/test/api/' + version, // test
    development: 'http://localhost:8000/api/' + version, // local development
    production: 'https://api.autokueng.ch/api/' + version, // production
}

const Api = Axios.create({
    baseURL: urls[process.env.NODE_ENV],
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

export default Api;