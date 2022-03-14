import axios from 'axios';

class AuthService {
    constructor() {
        this.baseUrl = 'http://localhost:8080';
    }

    async userLogin(email, password) {
        const json = JSON.stringify({email: email, password: password});
        return axios({
            method: 'post',
            url: this.baseUrl + '/login',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            mode: 'no-cors',
            data: json,
        });
    }

    async userRegister(email, password, name) {
        const json = JSON.stringify({email: email, password: password, name: name});
        return axios({
            method: 'post',
            url: this.baseUrl + '/register',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            data: json,
            mode: 'no-cors'
        });
    }
}

export default new AuthService();