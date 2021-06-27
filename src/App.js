import React from 'react'
import Usuario from './components /Usuario'
import Repositorio from './components /Repositorios'
import 'bootstrap/dist/css/bootstrap.min.css';

export default class App extends React.Component {

  state = {
    telaAtual: 'usuario',
    idUsuario: null
  }

  mudancaDeTela = () => {
    switch(this.state.telaAtual){
      case 'usuario':
        return <Usuario mudarParaRepositorio={this.mudarParaRepositorio} />
      case 'repositorios':
        return <Repositorio mudarParaUsuarios={this.mudarParaUsuarios} />
        default:
          return <div>ERRO</div>
    }
  }

  mudarParaUsuarios = () => {
    this.setState({telaAtual: 'usuario'})
  }

  mudarParaRepositorio = () => {
    this.setState({telaAtual: 'repositorios' })
  }

  render() {
    return(
      <div>
        {this.mudancaDeTela()}
      </div>
    )
  }
}