import React, { useState } from 'react'
import FilterBlogs from '../components/blogs/FilterBlogs'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Helmet } from 'react-helmet-async';
// import { AppState } from '../App';
const MemoizedFooter = React.memo(Footer);
const FilterBlogsPage = () => {
    // const { query } = useContext(AppState)
    const [currentPage, setCurrentPage] = useState(1);
    return (
        <>
            <Helmet>
                <title>{`Search blogs  | Literature Alley`} </title>
            </Helmet>
            <Header />
            <FilterBlogs currentPage={currentPage} setCurrentPage={setCurrentPage} />
            <MemoizedFooter />
        </>
    )
}

export default FilterBlogsPage;