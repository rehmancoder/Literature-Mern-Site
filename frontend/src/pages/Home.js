import React from 'react';
import Header from '../components/Header';
import Main from '../components/Main';
import BrowseGuide from '../components/BrowseGuide';
import Litrature from '../components/Litrature';
import Couter from '../components/Couter';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet-async';

const MemoizedMain = React.memo(Main);
const MemoizedBrowseGuide = React.memo(BrowseGuide);
const MemoizedLitrature = React.memo(Litrature);
const MemoizedCouter = React.memo(Couter);
const MemoizedFooter = React.memo(Footer);

const Home = () => {
    return (
        <>
            <Helmet>
                <title>{` Literature Alley where you find everything`} </title>
            </Helmet>
            <Header />
            <MemoizedMain />
            <MemoizedBrowseGuide />
            <MemoizedLitrature />
            <MemoizedCouter />
            <MemoizedFooter />




            {/* <Main />
            <BrowseGuide />
            <Litrature />
            <Couter />
            <Footer /> */}
        </>
    )
}

export default Home