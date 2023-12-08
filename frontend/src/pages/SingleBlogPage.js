import React from 'react';
import SingleBlog from '../components/blogs/SingleBlog';
import Header from '../components/Header';
import Footer from '../components/Footer';
const MemoizedFooter = React.memo(Footer);

const SingleBlogPage = () => {
    return (
        <>
            <Header />
            <SingleBlog />
            <MemoizedFooter />
        </>
    )
}

export default SingleBlogPage