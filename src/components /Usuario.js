import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import UsuarioService from '../services/usuario-service';
import Navbar from './Navbar';


const ProfilePicture = styled.img`
    height: 100% !important;
    object-fit: cover;
`

export default class Usuario extends React.Component {

    constructor(props) {
        super(props)
        this.verificaUsernameUrl()
    }

    state = {
        mensagemErro: "Nenhum usuário para ser exibido.",
        nomeUsuario: ""
    }

    verificaUsernameUrl = async () => {
        if(this.props.match.params.username) {
            this.setState({nomeUsuario: this.props.match.params.username})
            await this.procurandoUsuario(this.props.match.params.username)
        }
    }

    atualizaUrlParam = () => {
        this.props.history.push({
            pathname: `/busca/${this.state.nomeUsuario}`
        })
    }

    procurandoUsuario = async (username) => {
        if (username === undefined) {
            username = this.state.nomeUsuario
        }
        this.setState(await UsuarioService.getUserData(username))
        this.atualizaUrlParam()
    }

    enterProcurarUsuario = (e) => {
        if (e.key === 'Enter') {
            this.procurandoUsuario(this.state.nomeUsuario)
        }
    }

    controlandoInputDeBusca = (e) => {
        this.setState({nomeUsuario: e.target.value})
    }


    renderUsuarioProfile(userData) {
        if (userData) {
            return (
                <div className="card mb-3">
                    <div className="" >
                        <div className="row">
                            <div className="col-md-4">
                                <ProfilePicture className='w-100' src={userData.avatar_url} alt={userData.name}/>
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title">{userData.name}</h5>

                                    <p className="card-text">{userData.bio}</p>
                                    <p className="card-text">
                                        <strong>Seguindo: </strong>
                                        {userData.following}
                                    </p>
                                    <p className="card-text">
                                        <strong>Seguidores: </strong>
                                        {userData.followers}
                                    </p>

                                    <div className='row'>
                                        <div className='col'>
                                            <Link 
                                                to={`/repos/${userData.login}`}
                                                className='btn btn-secondary btn-block'
                                            >Repositórios</Link>
                                        </div>
                                        <div className='col'>
                                        <Link 
                                            to={`/starred/${userData.login}`}
                                            className='btn btn-secondary btn-block'
                                        >Stars</Link>
                                        </div>
                                    </div>                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
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

                <div className='container mt-5'>

                    <div className="input-group mb-3">
                        <input 
                            type="text" 
                            className="form-control" 
                            value={this.state.nomeUsuario} 
                            placeholder="Nome de usuário"
                            onChange={this.controlandoInputDeBusca}
                            onKeyPress={this.enterProcurarUsuario}
                        />
                        <div className="input-group-append">
                            <button 
                                className='btn btn-success'
                                onClick={() => this.procurandoUsuario()}
                            >Pesquisar</button>
                        </div>
                    </div>

                    {this.renderUsuarioProfile(this.state.userData)}
                </div>
            </div>
        )
    }
}