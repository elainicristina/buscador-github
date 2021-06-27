import React from 'react'
import Navbar from './Navbar'
import UsuarioService from '../services/usuario-service'


export default class Starred extends React.Component{

    state = {
        mensagemErro: "Nenhum usuário para ser exibido.",
        nomeUsuario: this.props.history.location.pathname.split('/')[2],
        userStarred: []
    }

    getStarredList = async (username) => {
        this.setState(await UsuarioService.getUserStarred(username))
    }

    renderStarredList() {
        if (this.state.userStarred){
            if (this.state.userStarred.length === 0) {
                this.getStarredList(this.state.nomeUsuario)
            }
    
            let listaStarred = []
    
            for (let star of this.state.userStarred) {
                listaStarred.push(
                    <div class="card mb-3">
                        <div className='card-header'>
                            {star.full_name}
                        </div>
                        <div class="card-body">
                            {star.description || 'Repositório sem descrição.'}
                        </div>
                    </div>
                )
            }
    
            return listaStarred
        }
        else {
            return <div className="alert alert-light" role="alert">
                {this.state.mensagemErro}
            </div>
        }
    }
   

    render() {
        return(
            <div>

                <Navbar location={this.props.history.location}/>

                <div className='container mt-3'>
                    {this.renderStarredList()}
                </div>
            </div>
        )
    }
}