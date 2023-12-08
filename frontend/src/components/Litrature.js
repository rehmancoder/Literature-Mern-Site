import React, { useState } from 'react';
import "./Litrature.css";
import litArr from './Litpart';

const Litrature = () => {
    const [state, Setstate] = useState(litArr)




    return (
        <>
            <div className="litrature">
                <h2 className='heading'>Explore new horizons of literature</h2>
                <div className='litratureMain'>
                    {
                        state.map((ele, index) => {
                            return (
                                <div key={ele.id}>
                                    <div className='litratureCh' >
                                        <img src={ele.img} alt="" />
                                        <h3>{ele.head}</h3>
                                        <p>{ele.para}</p>
                                    </div>

                                </div>
                            )
                        })
                    }

                </div>

            </div>
        </>
    )
}
export default Litrature