import axios from 'axios'
import React from 'react'


export default class Repositorio extends React.Component{
   

        listaDeRepos = async () => {

            try {
                const url = `https://api.github.com/users/${this.props.stateProps}/repos`
                const response = await axios.get(url)
                this.setState({
                    userData: response.data.repos_url
                })
                console.log((await response))
            
            }   
                catch(err) {
                    this.setState({
                        mensagemErro: 'Sem repositorio disponivel',
                        userData: undefined
                    })
                }
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