import React, { useContext, useState } from 'react';
import "./SignIn.css";
import { NavLink } from "react-router-dom";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { AppState } from '../App';

const SignIn = () => {
    const { state, dispatch } = useContext(AppState)
    const [input, setInput] = useState({
        email: "",
        password: ""
    })

    const localData = localStorage.getItem("user")

    const handleSignin = (e) => {
        setInput((preState) => ({
            ...preState,
            [e.target.name]: e.target.value

        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("https://mern-backend-pi.vercel.app/api/user/login", {
                name: input.name,
                email: input.email,
                password: input.password,
            })

            const data = res.data;

            if (data.success === true) {
                toast.success(data.message, {
                    position: toast.POSITION.TOP_CENTER
                });
                localStorage.setItem("user", JSON.stringify(data.user))
                localStorage.setItem("userid", (data.user._id))
                // const isLocal = !!localStorage.getItem("user");
                // const isLocal = localStorage.getItem("user");
                // if (isLocal) {
                //     dispatch({ type: "SET_TRUE" })
                //     console.log("Hole State Is .......", state)
                // }


            }

            setInput({
                email: "",
                password: ""
            })

            return data
        } catch (error) {
            console.log(error.response.data.message)
            toast.error(error.response.data.message, {
                position: toast.POSITION.TOP_CENTER
            });

        }
    }

    return (
        <>
            <ToastContainer />
            <section className='contact'>
                <div className='formDiv'>
                    <h2>SIGN IN</h2>
                    <form className='loginForm' onSubmit={handleSubmit}>
                        <input type="email" name='email' value={input.email} placeholder='Enter Your Email' onChange={handleSignin} autoComplete='off' />
                        <input type="password" name="password" value={input.password} placeholder='Enter Your Password' onChange={handleSignin} autoComplete='off' />
                        <button type='submit'>Submit</button>
                    </form>
                    <NavLink to="/signup">New here? Please <span className='signUpSpan'>Sign Up</span></NavLink>
                </div>

                {localData &&
                    <>
                        <NavLink to="/" className='signInBack'>
                            <i className="fa-solid fa-arrow-left"></i>
                            <p> Back To HomePage </p>
                        </NavLink>
                    </>
                }
            </section>

        </>
    )
}

export default SignIn