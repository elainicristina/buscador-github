import React from "react"
import { Link } from "react-router-dom"

export default class Navbar extends React.Component {

    state = {
        currentPath: this.props.location.pathname,
        username: this.props.location.pathname.split('/')[2]
    }

    getActiveRouteClassName = (route) => {
        if (this.state.currentPath.startsWith(route)) {
            return 'navbar-item active'
        }
        else {
            return 'navbar-item'
        }
    }


    getNavLinkClassName = (route) => {
        if ((this.state.currentPath === '/busca')) {
            switch (route) {
                case '/busca':
                    return 'nav-link'

                default:
                    return 'nav-link disabled'
            }
        }
        else {
            return 'nav-link'
        }
    }

    getNavLink = (route) => {
        return `${route}/${this.state.username}`
    }

    getPageDescription = () => {
        if (this.state.currentPath.startsWith('/busca')) {
            return 'Buscador de perfis do GitHub'
        }
        else if (this.state.currentPath.startsWith('/repos')) {
            return <span>Exibindo repositórios de <strong>{this.state.username}</strong></span>
        }
        else if (this.state.currentPath.startsWith('/starred')) {
            return <span>Exibindo reposiórios que <strong>{this.state.username}</strong> marcou com star.</span>
        }
    }


    render() {
        return (
            <div>
                <nav className="navbar navbar-expand bg-dark navbar-dark">
                    <span className="navbar-brand">GitHub Search</span>

                    <ul className="navbar-nav ml-auto">
                        <li className={this.getActiveRouteClassName('/busca')}>
                            <Link className={this.getNavLinkClassName('/busca')} to={this.getNavLink('/busca')}>Busca</Link>
                        </li>
                        <li className={this.getActiveRouteClassName('/repos')}>
                            <Link className={this.getNavLinkClassName('/repos')} to={this.getNavLink('/repos')}>Repositórios</Link>
                        </li>
                        <li className={this.getActiveRouteClassName('/starred')}>
                            <Link className={this.getNavLinkClassName('/starred')} to={this.getNavLink('/starred')}>Stars</Link>
                        </li>
                    </ul>
                </nav>

                <div className='text-center py-3 bg-light'>{this.getPageDescription()}</div>
            </div>
        )
    }
}