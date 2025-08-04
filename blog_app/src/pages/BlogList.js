
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BlogCard from './BlogCard';
import '../App.css';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://campusshala.com:8688/api/blogs')
      .then((res) => {
        setBlogs(res.data); // assuming res.data is an array of blog objects
      })
      .catch((err) => {
        console.error('Error fetching blogs:', err);
        setError('Failed to fetch blog data');
      });
  }, []);

  return (
    <section className="blog-list">
      <h2>Latest Articles</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <p>Showing {blogs.length} articles</p>
      <div className="cards-wrapper">
        {blogs.map((blog) => (
          <BlogCard
            key={blog.id}
            id={blog.id}
            title={blog.title}
            desc={blog.content.substring(0, 120) + '...'}
            
            author={blog.name}
           
            date={new Date(blog.created_at).toLocaleDateString()}
          />
        ))}
      </div>
    </section>
  );
};

export default BlogList;
