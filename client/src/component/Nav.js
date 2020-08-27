import React from 'react';
import { Link } from 'react-router-dom';
import '../stylesheets/style.css';

function Nav() {
    return (
        <section id="nav-section">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand" href="#">BLOG</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                        <Link to="/">
                            <li className="nav-item">
                                <a href="#" className="nav-link">Home</a>
                            </li>
                        </Link>
                        <Link to="/about">
                            <li className="nav-item">
                                <a href="#" className="nav-link">About</a> 
                            </li>
                        </Link>
                        <Link to="/contact">
                            <li className="nav-item">
                                <a href="#" className="nav-link">Contact</a>
                            </li>
                        </Link>
                    </ul>
                </div>
            </nav>

        </section>
       
    )
}

export default Nav
