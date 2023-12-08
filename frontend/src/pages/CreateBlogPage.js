import React from 'react';
import CreateBlog from '../components/blogs/CreateBlog';
import Header from '../components/Header';
import Footer from '../components/Footer';
const MemoizedFooter = React.memo(Footer);

const CreateBlogPage = () => {
    return (
        <>
            <Header />
            <CreateBlog />
            <MemoizedFooter />
        </>
    )
}

export default CreateBlogPage