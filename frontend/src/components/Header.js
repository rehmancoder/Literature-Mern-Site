import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import "./Header.css";
import { AppState } from '../App';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Header = () => {
    const [none, setNone] = useState("none")



    const { state, dispatch, query, setQuery, handleFilterBlogs, setCurrentPage } = useContext(AppState)
    const navigate = useNavigate();
    const loginController = () => {
        const islocal = localStorage.getItem("user");
        if (islocal) {
            dispatch({ type: "SET_TRUE" })

        }
    }
    const handleLogout = () => {
        dispatch({ type: "SET_FALSE" })
        localStorage.removeItem("user");
        window.location.reload();
        toast.success("Logout Successfully", {
            position: toast.POSITION.TOP_CENTER
        });


    }

    useEffect(() => {
        loginController()

    }, [])






    const handleSearch = () => {
        navigate("/filterblogs")
        handleFilterBlogs();
        setCurrentPage(1);
        // setQuery('')
    }



    const handleQuery = (e) => {
        setQuery(e.target.value)
    }
    // useEffect(() => {
    //     console.log(query)
    // }, [query])
    const localData = JSON.parse(localStorage.getItem("user"))
    let myLink;
    if (localData && localData.isadmin === "true") {
        myLink = <NavLink className="firstLink" to="/createblog">CREAT BLOG</NavLink>

    }

    const show = () => {
        setNone("")
    }
    const hide = () => {
        setNone("none")
    }

    return (
        <>
            <ToastContainer />
            <header>
                <NavLink to="/">
                    <div className="logo">
                        <img src="/images/book2.png" alt="Logo" />
                        <div className='logoPara'>
                            <p className='logoP1'> Literature</p>
                            <p className='logoP2'>Alley</p>

                        </div>
                    </div>
                </NavLink>

                <div className={`headerParent ${none}`}>
                    <div className='headerParentLeft'>

                        <nav>
                            <i className="fa-solid fa-xmark cross" onClick={hide}></i>
                            <NavLink className="firstLink" to="/">HOME</NavLink>
                            <NavLink className="firstLink" to="/allblogs">ALL BLOGS</NavLink>
                            {/* <NavLink className="firstLink" to="/createblog">CREAT BLOG</NavLink> */}
                            {myLink}
                            {/* <NavLink className="firstLink cat" to=""> */}

                            <div className='firstLink cat'>
                                <span>
                                    CATEGORIES
                                </span>
                                <div className='dropDown'>
                                    <NavLink to="/category/literature-guides">Litrature Guides</NavLink>
                                    <NavLink to="/category/poetry-guides">Poetry Guides</NavLink>
                                    <NavLink to="/category/plays">Plays</NavLink>
                                    <NavLink to="/category/literary-terms">Literary Terms</NavLink>
                                    <NavLink to="/category/thesaurus">Thesaurus</NavLink>
                                    <NavLink to="/category/grammer">Grammer</NavLink>
                                    <NavLink to="/category/quizzes">Quizzes</NavLink>
                                    <NavLink to="/category/quotations">Quotations</NavLink>
                                    <NavLink to="/category/series-reviews">Series Reviews</NavLink>
                                    <NavLink to="/category/movie-reviews">Movie Reviews</NavLink>

                                </div>

                            </div>


                            {/* </NavLink> */}
                        </nav>
                        <div className='searchBar'>
                            <input type="text" value={query} placeholder='Search' onChange={handleQuery} />
                            <i onClick={handleSearch} className="fa-solid fa-magnifying-glass"></i>

                        </div>
                    </div>
                    <div className="headerParentRight">


                        {
                            state.isStateTrue ? <>
                                <NavLink to='' onClick={handleLogout}> <button >LOG OUT</button></NavLink>

                            </> : <>
                                <NavLink to='/signin'>
                                    <button>SIGN IN</button>
                                </NavLink>
                                <NavLink to="/signup">
                                    <button>SIGN UP</button>
                                </NavLink>



                            </>
                        }

                    </div>
                </div>


            </header>
            <div className='menu'>
                <i className="fa-solid fa-bars" onClick={show}></i>
            </div>
        </>
    )
}

export default Header