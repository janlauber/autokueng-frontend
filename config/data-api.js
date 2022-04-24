import Axios from 'axios';
import Cookies from 'js-cookie';

let urls = {
    test: 'https://data.autokueng.ch:9000', // test
    development: 'http://localhost:9000', // local development
    production: 'https://data.autokueng.ch', // production
}

let DataApi = Axios.create({
    baseURL: urls[process.env.NEXT_PUBLIC_BACKEND_URL],
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

const token = Cookies.get('token');
if(token) {
    DataApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default DataApi;