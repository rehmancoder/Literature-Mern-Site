import React from 'react';
import "./Footer.css";
import { NavLink } from 'react-router-dom';

const Footer = () => {



    return (
        <>
            <footer className='footer'>
                <div className='footerParent'>

                    <div className='footerCh1'>
                        <NavLink to="" target='_blank'><div className='FiconDiv'><img src="/images/Gmail.png" alt="Social Icon" /></div> </NavLink>
                        <NavLink to="" target='_blank'> <div className='FiconDiv'><img src="/images/Whatsapp.png" alt="Social Icon" /></div></NavLink>
                        <NavLink to=""><div className='FiconDiv'><img src="/images/Facebbok.png" alt="Social Icon" /></div></NavLink>
                        {/* <NavLink to=""><div className='FiconDiv'><img src="/images/Skype.png" alt="Social Icon" /></div></NavLink> */}
                        {/* <NavLink to=""><div className='FiconDiv'><img src="/images/Youtube.png" alt="Social Icon" /></div></NavLink> */}
                        {/* <NavLink to=""><div className='FiconDiv'><img src="/images/Linkedin.png" alt="Social Icon" /></div></NavLink> */}
                        <NavLink to=""><div className='FiconDiv'><img src="/images/Pinterest.png" alt="Social Icon" /></div></NavLink>
                        <NavLink to=""><div className='FiconDiv'><img src="/images/Instagram.png" alt="Social Icon" /></div></NavLink>
                    </div>
                    <div className='footerCh2'>
                        <NavLink to="" target='_blank'> Blogs</NavLink>
                        <NavLink to="" target='_blank'> Grammer</NavLink>
                        <NavLink to="" target='_blank'> Literature Guides</NavLink>
                        <NavLink to="" target='_blank'> Poetry Guides</NavLink>
                        <NavLink to="" target='_blank'> About</NavLink>






                    </div>

                </div>

                <div className='footerBottom'>
                    <span >This Website Is Made By Muzammil Hussain. All Rights Are Reserved © 2023</span>

                </div>
            </footer>
        </>
    )
}

export default Footer