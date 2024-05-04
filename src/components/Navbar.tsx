import { useContext } from "react"
import { Button, Container, Nav, Navbar as ReactNavbar } from "react-bootstrap"
import { Link } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import firebaseService from "../services/firebase"

export default function Navbar() {
    const {currentUser, isLoaded} = useContext(AuthContext)
    return(
        <ReactNavbar>
            <Container>
                <ReactNavbar.Brand href="/">Simple Transfer</ReactNavbar.Brand>

                <Nav className="me-auto">
                    <Link to='/' className="nav-link">Acceuil</Link>
                    <Link to='/files' className="nav-link">Fichiers</Link>
                    {currentUser && <Link to='/sent' className="nav-link">Fichiers envoyes</Link>}
                </Nav>

                <div className={isLoaded ? '' : ''}>
                    {currentUser
                        ?
                        <Button variant="outline-danger" onClick={async () => await firebaseService.signOut()}>Se deconnecter</Button>
                        :
                        <Button variant="primary" onClick={async () => await firebaseService.singInWithGoogle()}>Se connecter</Button>
                    }
                </div>
            </Container>
        </ReactNavbar>
    )
}