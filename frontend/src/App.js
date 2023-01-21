import React from "react";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from 'react';
import './App.css';

// Imports for components and pages
import Home from './pages/Home/home';
import Main from './pages/Main/main';
import Forum from './pages/Forum/forum';
import Nav from './components/Nav/nav';
import Login from './components/Login/login';
import Signup from './components/Signup/signup';
import Search from "./components/Search/search";
import SearchResults from "./components/SearchResults/searchResults";
import AboutHero from "./pages/AboutHero/aboutHero";
import AboutComic from "./pages/AboutComic/aboutComic";
import MyReviews from "./pages/MyReviews/myReviews";
import EditReview from "./pages/EditReview/editReview";
import PageNotFound from "./pages/PageNotFound/pageNotFound";



function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    if (localStorage.token) {
      setIsLoggedIn(true)
    }
  }, [])


  return (
    <>
      <header>
        <Nav isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/main' element={<Main />} />
        <Route path='/forum' element={<Forum />} />
        <Route path="/login" element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/signup" element={<Signup isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
        <Route path='/searchbar' element={<Search />} />
        <Route path='/search-results' element={<SearchResults />} />
        <Route path='/:id' element={<AboutHero />} />
        <Route path='/comic/:id' element={<AboutComic />} />
        <Route path='/MyReviews' element={<MyReviews />} />
        <Route path='/EditReview' element={<EditReview />} />
        <Route path='/*' element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
