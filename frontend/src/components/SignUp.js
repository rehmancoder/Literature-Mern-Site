import React, { useState } from 'react';
import "./SignUp.css";
import { NavLink } from "react-router-dom"
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
    // const navigate = useNavigate()
    const [input, setInput] = useState({
        name: "",
        email: "",
        password: ""
    })
    const [isSignUp, setIsSignUp] = useState(false)
    const handleSignup = (e) => {
        setInput((preState) => ({
            ...preState,
            [e.target.name]: e.target.value

        }))

    }

    // const showToastMessage = () => {
    //     toast.success('Success Notification !', {
    //         position: toast.POSITION.TOP_RIGHT
    //     });
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const res = await axios.post("https://mern-backend-pi.vercel.app/api/user/signup", {
                name: input.name,
                email: input.email,
                password: input.password,
            })
            const data = await res.data
            if (data.success === true) {
                toast.success(data.message, {
                    position: toast.POSITION.TOP_CENTER
                });

                setIsSignUp(true)
            }
            // navigate('/signin')
            setInput({
                name: "",
                email: "",
                password: ""
            })
            console.log(data)
            return data;

        } catch (error) {
            console.log(error.response.data.message);
            toast.error(error.response.data.message, {
                position: toast.POSITION.TOP_CENTER
            })

        }
    }

    return (
        <>
            <ToastContainer />
            <section className='contactt'>
                <div className='formDiv'>
                    <h2>SIGN UP</h2>
                    <form className='signUpForm' onSubmit={handleSubmit}>
                        <input type="text" name='name' value={input.name} placeholder='Enter Your Name' onChange={handleSignup} autoComplete='off' />
                        <input type="email" name='email' value={input.email} placeholder='Enter Your Email' onChange={handleSignup} autoComplete='off' />
                        <input type="password" name="password" value={input.password} placeholder='Enter Your Password' onChange={handleSignup} autoComplete='off' />
                        <button type='submit'>Submit</button>
                    </form>
                    <NavLink to="/signin">Already have account? <span className='logInSpan'>Sign In</span></NavLink>
                </div>


                {isSignUp &&
                    <>
                        <NavLink to="/" className='signUpBack'>
                            <i className="fa-solid fa-arrow-left"></i>
                            <p> Back To HomePage </p>
                        </NavLink>
                    </>
                }


            </section>

        </>
    )
}

export default SignUp