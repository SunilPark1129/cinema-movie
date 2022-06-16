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
        path: '/',
        label: Home,
        exact: 'true',
    },
    {
        path: '/movie',
        label: Movie,
        exact: 'false',
    }
]

const Navbar = () => {
    return (
        <nav>
            <div className="wrapper">
                <Link to='/'><img src={logo} alt='logo'></img></Link>
                <ul>
                    {links.map(({ path, label, exact }) => (
                        <li key={label} >
                            <NavLink to={path} exact={exact}>
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