import React from 'react';
import "./Main.css";

const Main = () => {


    const goUp = () => {
        window.scrollTo(0, 0)
    }



    return (
        <>
            <main className='main'>
                <img src="./images/Banner-1.png" alt="main section" />
                <div className='mainDis'>
                    <h1>We will be your guides in the world of literature</h1>
                    <p>Rely on us to embark on a literary journey of learning everything about literature.</p>
                </div>

                <div className='upArrow' onClick={goUp}>
                    <i className="fa-sharp fa-solid fa-arrow-up"></i>
                </div>
            </main>
        </>
    )
}

export default Main