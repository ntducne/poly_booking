import axios from 'axios';
import { decode } from 'js-base64';
import { parseCookies } from 'nookies';
const cookies = parseCookies();
const encodedValue  = cookies._a || ''
const tokens        = decode(encodedValue)

const user = axios.create({
    baseURL: 'http://localhost:8000/admin/',
    headers: {
        'Authorization': `Bearer ${tokens}`,
        'Content-Type': 'application/json',
    },
});

user.interceptors.response.use(
    response => response,
    error => {
        return Promise.reject(error);
    }
);

export { user };