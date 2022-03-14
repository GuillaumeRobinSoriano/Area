import axios from 'axios';

class ActionService {
    constructor() {
        this.baseUrl = 'http://localhost:8080';
    }

    async getAllActions(token) {
        return axios({
            method: 'get',
            url: this.baseUrl + '/getActions?word=',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'jwt': `${token}`
            },
            mode: 'no-cors',
        });
    }

    async getAllReactions(token) {
        return axios({
            method: 'get',
            url: this.baseUrl + '/getReactions?word=',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'jwt': `${token}`
            },
            mode: 'no-cors'
        });
    }

    async setActReact(token, actionName, reactionName, actionParams, reactionParams, trigger) {
        const triggerParam = actionParams.pop();
        const json = JSON.stringify({
            action: actionName,
            reaction: reactionName,
            actionParams: actionParams.join(','),
            reactionParams: reactionParams.join(','),
            trigger: trigger,
            triggerParam: triggerParam
        });
        return axios({
            method: 'post',
            url: this.baseUrl + '/setServices',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'jwt': `${token}`
            },
            mode: 'no-cors',
            data: json
        });
    }

    async getAllActReact(token) {
        return axios({
            method: 'get',
            url: this.baseUrl + '/getServicesByMail',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'jwt': `${token}`
            },
            mode: 'no-cors'
        });
    }

    async deleteActReact(token, id) {
        const json = JSON.stringify({id: id});
        return axios({
            method: 'delete',
            url: this.baseUrl + '/deleteService',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'jwt': `${token}`
            },
            mode: 'no-cors',
            data: json,
        });
    }

}

export default new ActionService();