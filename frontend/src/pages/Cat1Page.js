import React from 'react';
import Category1 from '../components/categories/Category1';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useParams } from "react-router-dom"
import { Helmet } from 'react-helmet-async';
const MemoizedFooter = React.memo(Footer);

const Cat1Page = () => {
    const { data } = useParams();
    return (
        <>
            <Helmet>
                <title>{` ${data} blogs categories | Literature Alley`} </title>
            </Helmet>
            <Header />
            <Category1 data={data} />
            <MemoizedFooter />
        </>
    )
}

export default Cat1Page