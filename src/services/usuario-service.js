import axios from 'axios';


const URLS = {
    'getUser': 'https://api.github.com/users/{{username}}',
    'getRepos': 'https://api.github.com/users/{{username}}/repos',
    'getStarred': 'https://api.github.com/users/{{username}}/starred'
}


export default class UsuarioService {

    static getUrl(urlName, username) {
        const url = URLS[urlName]
        return url.replace('{{username}}', username)
    }


    static async getUserData(username) {
        try {
            const url = this.getUrl('getUser', username)
            const response = await axios.get(url)
            
            return { 
                nomeUsuario: username,
                userData: response.data
            }
        }   
        catch(err) {
            return {
                mensagemErro: 'Usuario não encontrado!',
                userData: undefined
            }
        }
    }

    static async getUserRepos(username) {
        try {
            const url = this.getUrl('getRepos', username)
            const response = await axios.get(url)
            
            return { userRepos: response.data }
        }   
        catch(err) {
            return {
                mensagemErro: 'Usuario não encontrado!',
                userRepos: undefined
            }
        }
    }

    static async getUserStarred(username) {
        try {
            const url = this.getUrl('getStarred', username)
            const response = await axios.get(url)
            
            return { userStarred: response.data }
        }   
        catch(err) {
            return {
                mensagemErro: 'Usuario não encontrado!',
                userStarred: undefined
            }
        }
    }

}