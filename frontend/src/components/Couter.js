import React from 'react';
import "./Couter.css"

const Couter = () => {



    return (
        <>
            <div className='counter'>
                <h2 className='heading'>Myriads of students, teachers, and readers use our website.<br /></h2>

                <div className='counterMain'>
                    <div className='counterMain1'>
                        <div className='couterInnerDiv'>
                            <h2>980+</h2>
                            <p>Literature guides</p>
                        </div>
                        <div className='couterInnerDiv'>
                            <h2>1762+</h2>
                            <p>Poetry guides</p>
                        </div>
                    </div>
                    <div className="counterMain2">
                        <div className='couterInnerDiv'>
                            <h2>236+</h2>
                            <p>Terms and Devices guides</p>
                        </div>
                        <div className='couterInnerDiv'>
                            <h2>72+</h2>
                            <p>Grammer guides</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Couter