import React, { useState } from 'react';
import Blog from '../components/blogs/Blog';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Helmet } from "react-helmet-async";
const MemoizedFooter = React.memo(Footer);

const AllBlogs = () => {

    const [currentPage, setCurrentPage] = useState(1);

    return (
        <>
            <Helmet>
                <title>All Blogs | Literature Alley </title>
            </Helmet>
            <Header />
            <Blog currentPage={currentPage} setCurrentPage={setCurrentPage} />
            <MemoizedFooter />
        </>
    )
}



export default AllBlogs