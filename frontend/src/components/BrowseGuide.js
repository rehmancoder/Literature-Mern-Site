import React, { useState } from 'react';
import "./BrowseGuide.css";
import CatPart from './CatPart';
import { NavLink } from "react-router-dom"


const BrowseGuide = () => {
    const [state, Setstate] = useState(CatPart)
    return (
        <>
            <section className='browse'>
                <h2 className='heading'>Explore our Alley</h2>

                <div className='catParent'>
                    {
                        state.map((ele, index) => {
                            return (
                                <div key={ele.id}>
                                    <NavLink to={ele.link}>
                                        <div className='catpart' key={ele.id}>
                                            <img src={ele.img} alt="Category_image" />
                                            <h2> {ele.heading}</h2>
                                            <p>{ele.para}</p>
                                        </div>
                                    </NavLink>
                                </div>
                            )

                        })
                    }
                </div>

            </section>
        </>
    )
}

export default BrowseGuide