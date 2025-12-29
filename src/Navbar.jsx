// src/pages/RecipeApp/RecipeAppNavbar.jsx

import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import './Navbar.css';

export default function Navbar() {
    const { loginWithRedirect, logout, isAuthenticated } = useAuth0();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogin = () => loginWithRedirect();
    const handleLogout = () => logout({ returnTo: window.location.origin });

    const handleSubmit = (e) => {
        e.preventDefault();
        const trimmed = searchQuery.trim();
        if (!trimmed) return;
        navigate("/projects/recipe/recipelist?search=" + encodeURIComponent(trimmed));
        setSearchQuery("");
        setIsMobileMenuOpen(false);
    };

    const handleRecettesClick = () => {
        if (!isAuthenticated) {
            loginWithRedirect();
        } else {
            navigate("/recipes");
        }
        setIsMobileMenuOpen(false);
    };

    const closeMobileMenu = () => setIsMobileMenuOpen(false);

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
                    C.I.Y
                </Link>

                <div className="menu-icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                    {isMobileMenuOpen ? '✕' : '☰'}
                </div>

                <div className={`navbar-menu ${isMobileMenuOpen ? 'active' : ''}`}>
                    <form className="search-form" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Chercher une recette..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button type="submit">🔍</button>
                    </form>

                    <ul className="nav-links">
                        <li>
                            <Link to="/" className="nav-link" onClick={closeMobileMenu}>
                                Découvrir
                            </Link>
                        </li>
                        <li>
                            <button className="nav-link btn-text" onClick={handleRecettesClick}>
                                Recettes
                            </button>
                        </li>
                        <li>
                            {!isAuthenticated ? (
                                <button className="nav-link btn-auth" onClick={handleLogin}>
                                    Se Connecter
                                </button>
                            ) : (
                                <button className="nav-link btn-auth" onClick={handleLogout}>
                                    Se déconnecter
                                </button>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
