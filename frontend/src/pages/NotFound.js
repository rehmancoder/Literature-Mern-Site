import React from 'react';
import "../components/NotFound.css";
import { NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';


const NotFound = () => {
    return (
        <>
            <Helmet>
                <title>{`Error 404 page not fount  | Literature Alley`} </title>
            </Helmet>
            <div className="notFound">
                <h2>404</h2>
                <p>Oops, Page Not Found</p>
                <NavLink to="/"><button>Go Back To HomePage</button></NavLink>
            </div>
        </>
    )
}

export default NotFound