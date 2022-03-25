import Axios from 'axios';

let urls = {
    test: 'https://data.autokueng.ch/test', // test
    development: 'http://localhost:9000', // local development
    production: 'https://data.autokueng.ch', // production
}

const DataApi = Axios.create({
    baseURL: urls[process.env.NODE_ENV],
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

export default DataApi;