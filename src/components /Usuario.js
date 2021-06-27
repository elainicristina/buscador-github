import React from 'react';
import axios from 'axios';

export default class Usuario extends React.Component{

    state = {
        mensagemErro: "Nenhum usuário para ser exibido.",
        nomeUsuario: ""
    }

    
    procurandoUsuario = async () => {

        try {
            const url = `https://api.github.com/users/${this.state.nomeUsuario}`
            const response = await axios.get(url)
            
            this.setState({
                userData: response.data
            })
        
        }   
        catch(err) {
            this.setState({
                mensagemErro: 'Usuario não encontrado!',
                userData: undefined
            })
        }
    }


    enterProcurarUsuario = (e) => {
        if (e.key === 'Enter') {
            this.procurandoUsuario()
        }
    }


    digitar = (e) => {
        this.setState({nomeUsuario: e.target.value})
    }

    
    render() {

        const usuarioDiv = (props) => {
            if (props) {
                return (
                    <div className="card mb-3">
                        <button className="btn btn-primary-outline" onClick={this.props.mudarParaRepositorio}  >
                            <div className="row">
                                <div className="col-md-4">
                                    <img className='w-100' src={props.avatar_url} alt={props.name}/>
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h5 className="card-title">{props.name}</h5>
                                        <p className="card-text">{props.bio}</p>
                                    </div>
                                </div>
                            </div>
                        </button>
                     </div>
                )
            }
            else {
                return <div className="alert alert-light" role="alert">
                    {this.state.mensagemErro}
                </div>
            }
        }

        return(
            <div className='container mt-5'>

                <div className='text-center mb-4'>
                    <h2 className='font-weight-bold'>GitHub Search</h2>
                    <h5 className='mt-0'>Buscador de perfis do GitHub</h5>
                </div>

                <div className="input-group mb-3">
                    <input 
                        type="text" 
                        className="form-control" 
                        value={this.state.nomeUsuario} 
                        placeholder="Nome de usuário"
                        onChange={this.digitar}
                        onKeyPress={this.enterProcurarUsuario}
                    />
                    <div className="input-group-append">
                        <button 
                            className='btn btn-success'
                            onClick={this.procurandoUsuario}
                        >Pesquisar</button>
                    </div>
                </div>

                {usuarioDiv(this.state.userData)}
            </div>
        )
    }
}