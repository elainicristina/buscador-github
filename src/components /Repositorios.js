import axios from 'axios'
import React from 'react'


export default class Repositorio extends React.Component{
   

        listaDeRepos = () => {
            const url = `https://api.github.com/users/${this.props.mudarParaRepositorio}/repos`
            axios.get(url)
             .then((res) => {
                 console.log(res.id.repos_url)
                this.setState({
                    userData: res.data.repos_url
                })
             }).catch((err) => {
                console.log(err.message)
             })
        }

    render() {
        return (
            <div>
                <button onClick={this.props.mudarParaUsuarios} >Inicio</button>
               {this.listaDeRepos}
            </div>
        )
    }
}