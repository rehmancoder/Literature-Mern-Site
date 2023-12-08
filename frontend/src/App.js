import React, { createContext, useReducer, useState, lazy, Suspense, } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SignupPage from "./pages/SignupPage";
import SigninPage from './pages/SigninPage';
// import Cat1Page from './pages/Cat1Page';
// import AllBlogs from './pages/AllBlogs';
import CreateBlogPage from './pages/CreateBlogPage';
import SingleBlogPage from './pages/SingleBlogPage';
import WholeSinglePage from './pages/WholeSinglePage';
import { initialState, reducer } from './reducer/Usereducer'
// import FilterBlogsPage from './pages/FilterBlogsPage';
import axios from 'axios';
import "./App.css"
import NotFound from './pages/NotFound';
import { HelmetProvider } from "react-helmet-async"
const AllBlogs = lazy(() => import('./pages/AllBlogs'))
const Cat1Page = lazy(() => import('./pages/Cat1Page'))
const FilterBlogsPage = lazy(() => import('./pages/FilterBlogsPage'))






export const AppState = createContext();

const App = () => {



  const [state, dispatch] = useReducer(reducer, initialState)
  const [query, setQuery] = useState('')
  const [searchResults, SetsearchResults] = useState('')
  const [errorr, setErrorr] = useState("")
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const handleFilterBlogs = async () => {
    if (query.length > 2) {
      try {
        setLoading(true)
        const trimQuery = query.trim()
        await axios.get(`https://mern-backend-pi.vercel.app/api/blog/search?q=${trimQuery}&page=${currentPage}&limit=20`).then((response) => {
          SetsearchResults(response.data.searchResults);
          setTotalPage(response.data.totalPages)
          setLoading(false)

        }).catch((error) => {
          setErrorr(error.response.data.message)
          SetsearchResults("");
          setLoading(false)



        })

      } catch (error) {
        console.log(error)


      }
    }
  }

  const localData = JSON.parse(localStorage.getItem("user"))
  let route1;
  let route2;
  if (localData && localData.isadmin === "true") {
    route1 = <Route exact path='/createblog' element={<CreateBlogPage />} />
    route2 = <Route exact path='/createblog/:slug' element={<SingleBlogPage />} ></Route>


  }

  return (
    <>
      <HelmetProvider>
        <AppState.Provider value={{ state, dispatch, query, setQuery, searchResults, SetsearchResults, handleFilterBlogs, errorr, setErrorr, loading, currentPage, totalPage, setCurrentPage }}>
          <Routes>
            <Route exact path='/' element={<Home />} ></Route>
            <Route exact path='/signup' element={<SignupPage />} />
            <Route exact path='/signin' element={<SigninPage />} />
            <Route exact path='/allblogs' element={
              <Suspense fallback={<h2 className='lazyHeading'>LOADING...</h2>}>
                <AllBlogs />
              </Suspense>
            } />
            {route1}
            {route2}
            <Route exact path='/blog/:slug' element={<WholeSinglePage />} />
            <Route exact path='/filterblogs' element={
              <Suspense fallback={<h2 className='lazyHeading'>LOADING...</h2>} >
                <FilterBlogsPage />
              </Suspense>
            } />
            <Route exact path='/category/:data' element={
              <Suspense fallback={<h2 className='lazyHeading'>LOADING...</h2>}>
                <Cat1Page />
              </Suspense>
            } />

            <Route path='*' element={<NotFound />} />

          </Routes>
        </AppState.Provider>
      </HelmetProvider>
    </>
  )
}

export default App