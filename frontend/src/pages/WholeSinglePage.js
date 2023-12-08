import React, { useState } from 'react';
import WholeSingle from '../components/blogs/WholeSingle';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useParams } from "react-router-dom"
import { Helmet } from 'react-helmet-async';
const MemoizedFooter = React.memo(Footer);
// const MemoizedWholeSingle = React.memo(WholeSingle);



const WholeSinglePage = () => {
    const [title, setTitle] = useState("")
    const { slug } = useParams();

    const handleTitleUpdate = (newTitle) => {
        setTitle(newTitle);
    };
    return (
        <>
            <Helmet>
                <title>{`${title}   | Literature Alley`} </title>
            </Helmet>
            <Header />
            <WholeSingle slug={slug} title={title} onTitleUpdate={handleTitleUpdate} />
            <MemoizedFooter />
        </>
    )
}

export default WholeSinglePage