
import React from 'react';
import Navbar from './pages/Navbar';
import Hero from './pages/Hero';
import Home from './pages/Home';
import BlogList from './pages/BlogList';
import Login from './pages/Login';
 import EditBlogPage from './pages/EditBlog'; 
import './App.css'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import BlogDetail from './pages/BlogDetail';
import BlogCreate from './pages/BlogCreate';



function App() {
  return (
    <Router> 
      <Routes>
        <Route path="/" element={<Home />} />    
        <Route path="/login" element={<Login />} />
         
          <Route path="/signup" element={<Signup />} />
          <Route path="/create" element={<BlogCreate />} />
         <Route path="/blogs/:id" element={<BlogDetail />} />
         <Route path="/blogcreate" element={<BlogCreate />} />
        <Route path="/edit/:id" element={<EditBlogPage />} />
       

      </Routes>
    </Router>
  );
}

export default App;
