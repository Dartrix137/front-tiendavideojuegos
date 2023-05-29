import React from "react";
import "./style/navbar.css"
import logo from "./img/logo.png"
import { NavLink } from "react-router-dom";
const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark border-bottom border-white">
            <div className="container-fluid">
                <a className="navbar-brand">
                    <img id="Logo" className="d-inline-block" src={logo} alt="Logo" />
                    videogames
                </a>
                <button
                    className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <i class="fa fas fa-bars"></i>
                </button>
                <div className="collapse navbar-collapse justify-content-center"
                    id="navbarNav">
                    <ul className="navbar-nav mb-2 mb-lg-0">
                        <li className="nav-item" >
                            <NavLink to="/" className="nav-link">Videojuegos</NavLink>
                        </li>
                        <li className="nav-item" >
                            <NavLink to="/alquileres" className="nav-link">Alquileres</NavLink>
                        </li>
                        <li className="nav-item" >
                            <NavLink to="/usuarios" className="nav-link">Usuarios</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;