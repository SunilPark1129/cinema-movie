/*
This page is navigating to another page or searching for a movie.
*/

import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import logo from '../../assets/main_logo.png';
import './navbar.css';
import NavSearch from './NavSearch';

const Home = () => <p>Home</p>;
const Movie = () => <p>Movie</p>;
const links = [
    {
        path: '/cinema-movie/',
        label: Home,
        exact: 'true',
    },
    {
        path: '/cinema-movie/movie',
        label: Movie,
        exact: 'false',
    }
]

const Navbar = () => {
    return (
        <nav>
            <div className="wrapper">
                <Link to='/cinema-movie'><img src={logo} alt='logo'></img></Link>
                <ul>
                    {links.map(({ path, label, exact }) => (
                        <li key={label} >
                            <NavLink to={path} exact={exact} className={({ isActive }) => isActive ? 'active' : ''}>
                                {label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
                <NavSearch />
            </div>
        </nav>
    )
}

export default Navbar